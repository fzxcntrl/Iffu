import Product from '../models/Product.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const products = await Product.find({ ...keyword });
  res.json(products);
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  const { name, price, description, image, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

import { GoogleGenAI } from '@google/genai';

// @desc    Get AI-based Recommendations (Gemini Implementation)
// @route   POST /api/products/recommend
// @access  Public
export const getRecommendations = async (req, res) => {
  const { viewIds } = req.body;
  
  if (!process.env.GEMINI_API_KEY) {
    // Graceful fallback if no API key is provided
    try {
      const viewedProducts = await Product.find({ _id: { $in: viewIds || [] } });
      const categories = [...new Set(viewedProducts.map(p => p.category))];
      let recommendations = await Product.find({ category: { $in: categories }, _id: { $nin: viewIds || [] } }).limit(4);
      if (recommendations.length < 4) {
        const moreRecs = await Product.find({ _id: { $nin: viewIds || [] } }).limit(4 - recommendations.length);
        recommendations = [...recommendations, ...moreRecs];
      }
      return res.json(recommendations);
    } catch (error) {
      return res.status(500).json({ message: 'Fallback failed' });
    }
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    const allProducts = await Product.find({});
    const viewedProducts = allProducts.filter(p => (viewIds || []).includes(p._id.toString()));
    const remainingProducts = allProducts.filter(p => !(viewIds || []).includes(p._id.toString()));
    
    // Construct Prompt
    const catalogData = remainingProducts.map(p => ({ id: p._id, name: p.name, category: p.category }));
    const viewedData = viewedProducts.map(p => ({ name: p.name, category: p.category }));
    
    const prompt = `
      You are an expert streetwear fashion assistant.
      A user has recently viewed these styles: ${JSON.stringify(viewedData)}.
      Here is the available catalog: ${JSON.stringify(catalogData)}.
      Based on the user's taste, choose exactly 4 product IDs that best match their style from the catalog.
      Return ONLY a raw JSON array of 4 strings representing the IDs, exactly like this: ["id1", "id2", "id3", "id4"]. No other text.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    
    let rawText = response.text || '';
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let recommendedIds = [];
    try {
      recommendedIds = JSON.parse(rawText);
    } catch (e) {
      console.error('Failed to parse Gemini response:', rawText);
      recommendedIds = [];
    }
    
    let recommendations = remainingProducts.filter(p => recommendedIds.includes(p._id.toString()));
    
    // Fallback fill if Gemini failed or returned fewer than 4
    if (recommendations.length < 4) {
      const moreRecs = remainingProducts.filter(p => !recommendedIds.includes(p._id.toString())).slice(0, 4 - recommendations.length);
      recommendations = [...recommendations, ...moreRecs];
    }
    
    res.json(recommendations);

  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ message: 'Failed to generate recommendations with AI' });
  }
};
