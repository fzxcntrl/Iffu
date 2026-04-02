import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, type = 'website', image }) => {
  return (
    <Helmet>
      {/* Standard Meta tags */}
      <title>{title ? `${title} | Iffu` : 'Iffu | Premium Streetwear'}</title>
      <meta name="description" content={description || 'Iffu offers the best premium streetwear, oversized tees, hoodies, and caps. Define your identity.'} />
      <meta name="keywords" content={keywords || 'streetwear, fashion, hoodies, oversized, iffu'} />

      {/* Open Graph Meta tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || 'Iffu | Premium Streetwear'} />
      <meta property="og:description" content={description || 'Iffu offers the best premium streetwear.'} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter Meta tags */}
      <meta name="twitter:creator" content="@iffu_apparel" />
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title || 'Iffu | Premium Streetwear'} />
      <meta name="twitter:description" content={description || 'Iffu offers the best premium streetwear.'} />
    </Helmet>
  );
};

export default SEO;
