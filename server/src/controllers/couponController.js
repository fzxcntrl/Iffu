import Coupon from '../models/Coupon.js';

// @desc    Validate a promo code
// @route   GET /api/coupons/:code
// @access  Public
export const validateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });

    if (coupon && coupon.isActive) {
      res.json({
        code: coupon.code,
        discountPercentage: coupon.discountPercentage,
      });
    } else {
      res.status(404).json({ message: 'Invalid or expired coupon' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error validating coupon' });
  }
};

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Private/Admin
export const createCoupon = async (req, res) => {
  try {
    const { code, discountPercentage } = req.body;
    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });

    if (couponExists) {
      return res.status(400).json({ message: 'Coupon already exists' });
    }

    const coupon = await Coupon.create({
      code: code.toUpperCase(),
      discountPercentage,
    });

    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Error creating coupon' });
  }
};
