const productData = {
  'virgin-coconut-oil': {
    name: 'Virgin Coconut Oil',
    category: 'Coconut Oil Category',
    description: 'Extracted from the freshest coconuts through a natural cold-press process, Vepuri Coconut Oil retains all its nutrients and natural aroma. A multi-purpose oil perfect for cooking, skincare, and haircare. Experience coconut in its purest form.',
    image: 'assets/products/oil.jpeg',
    imageAlt: 'Virgin coconut oil product image',
    useCases: [
      '100% Cold-Pressed & Unrefined – No heat, no chemicals.',
      'Supports energy & metabolism.',
      'Multipurpose Use – Ideal for cooking, skincare & haircare.'
    ]
  },
  'coconut-neera': {
    name: 'Coconut Neera',
    category: 'Natural Coconut Sap Category',
    description: 'Vepuri  Neera is a naturally refreshing drink tapped from the sweet sap of palm trees. Collected fresh every morning, Neera is packed with essential nutrients, making it a perfect daily detox and hydration booster. No preservatives, no added sugar – just pure wellness in a bottle.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut neera beverage image',
    useCases: [
      '100% Natural & Fresh – No additives, no processing. Just raw palm nectar.',
      'Rich in Electrolytes – Naturally hydrating and energizing.',
      'Detox-Friendly – Supports digestion and flushes out toxins.',
      'Cooling & Refreshing – A perfect summer drink for body balance.'
    ]
  },
  'coconut-honey': {
    name: 'Coconut Honey',
    category: 'Natural Sweetener Category',
    description: 'Coco Munzz Coconut Honey is nature’s sweet gift – made from pure coconut nectar slowly simmered into a thick, golden syrup. With no added sugar or artificial ingredients, it’s a wholesome, plant-based alternative to refined sweeteners. Drizzle, dip, or stir – pure coconut sweetness in every drop.',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut honey syrup image',
    useCases: [
      '100% Natural & Plant-Based – Made from pure coconut nectar with no additives.',
      'Rich in Minerals – Contains potassium, iron, and magnesium.',
      'Low Glycemic Index – A healthier alternative to regular sugar or honey.',
      'Versatile Sweetener – Perfect for tea, toast, pancakes, or baking.'
    ]
  },
  'coconut-caned-milk': {
    name: 'Coconut Caned Milk',
    category: 'Coconut Milk Category',
    description: 'Vepuri Coconut Milk Powder is a creamy, dairy-free alternative made from pure coconut extract. Just mix with warm water to enjoy rich, aromatic coconut milk anytime, anywhere. Ideal for cooking, baking, or beverages – it’s coconut convenience without compromise.',
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut milk product image',
    useCases: [
      '100% Dairy-Free – Perfect for vegans and lactose-intolerant diets.',
      'Rich & Creamy – Delivers authentic coconut flavor in every spoon.',
      'Long Shelf Life – Convenient and easy to store.',
      'Versatile Use – Great for curries, smoothies, desserts, and more.'
    ]
  },
  'coconut-blossom-sugar': {
    name: 'Coconut Blossom Sugar',
    category: 'Coconut Blossom Sweetener Category',
    description: "Vepuri Coconut Sugar is a natural sweetener crafted from the pure nectar of coconut blossoms. With a delicious caramel-like flavor, it's the perfect healthier alternative to refined sugar for cooking, baking, or beverages.",
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut blossom sugar image',
    useCases: [
      '100% Natural & Unrefined – No artificial additives.',
      'Low Glycemic Index – Better blood sugar management.',
      'Rich in Nutrients – Contains minerals like iron, potassium, and zinc.'
    ]
  },
  'frozen-grated-coconut': {
    name: 'Frozen Grated Coconut',
    category: 'Frozen Coconut Category',
    description: 'Vepuri Frozen Grated Coconut is produced from carefully selected mature coconuts, processed under hygienic conditions and frozen immediately to preserve natural freshness, aroma, and texture. It delivers consistent quality and ready-to-use convenience for large-scale food preparation and product applications. Designed for efficiency and reliability, it ensures uniform performance across batches while reducing preparation time and wastage.',
    image: 'assets/products/oil.jpg',
    imageAlt: 'Frozen grated coconut',
    useCases: [
      'Freshness Preserved – Frozen immediately to retain natural taste and texture.',
      'Consistent Quality – Uniform moisture and texture for reliable usage.',
      'Ready-to-Use Convenience - Eliminates the need for manual grating and preparation.',
      'Versatile Application - Suitable for cooking, baking, and food processing.'
    ]
  },
  'frozen-tender-coconut': {
    name: 'Frozen Tender Coconut',
    category: 'Frozen Coconut Category',
    description: 'Vepuri Frozen Tender Coconut is made from fresh tender coconut pulp, carefully extracted and preserved to maintain its natural softness, taste, and nutritional profile. It ensures year-round availability without the challenges of sourcing fresh tender coconuts. Engineered for consistency and ease of use, it supports a wide range of product and preparation needs.',
    image: 'assets/products/oil.jpg',
    imageAlt: 'Frozen tender coconut',
    useCases: [
      'Natural Taste Retained - Preserves the authentic flavor and softness of tender coconut.',
      'Year-Round Availability - Ensures uninterrupted supply across seasons.',
      'Reduced Handling Effort - Eliminates sourcing and preparation challenges.',
      'Versatile Application - Ideal for desserts, beverages, and food products.'
    ]
  },
  'tender-coconut-water': {
    name: 'Tender Coconut Water',
    category: 'Beverage Category',
    description: 'Vepuri Tender Coconut Water is sourced from high-quality coconuts and processed to maintain its natural taste, clarity, and hydration properties. It serves as a clean and reliable base for beverage applications and direct consumption. Designed for consistency and scalability, it meets the requirements of both retail and bulk supply.',
    image: 'assets/products/water.png',
    imageAlt: 'Tender coconut water',
    useCases: [
      'Naturally Refreshing - Retains original taste and hydration properties.',
      'Consistent Quality - Standardized processing ensures uniform output.',
      'Scalable Supply - Suitable for bulk distribution and product development.',
      'Flexible Usage - Ideal for beverages and functional drink formulations.'
    ]
  },
  'coconut-milk-tin': {
    name: 'Coconut Milk (Canned)',
    category: 'Canned Coconut Category',
    description: 'Vepuri Coconut Milk is extracted from high-quality coconut kernel and processed to deliver a smooth, rich, and consistent texture. Designed for both culinary and industrial use, it offers reliable performance across a wide range of applications while maintaining authentic coconut flavor. Engineered for convenience and scalability, it ensures ease of use, longer shelf stability, and consistent output in every batch.',
    image: 'assets/products/milk.png',
    imageAlt: 'Canned coconut milk',
    useCases: [
      '100% Plant-Based - Naturally dairy-free and suitable for vegan and lactose-free requirements.',
      'Rich & Consistent Texture - Delivers a smooth, creamy profile with uniform quality.',
      'Shelf-Stable Packaging - Canned format ensures longer shelf life and easy storage.',
      'Versatile Application - Suitable for curries, beverages, desserts, and food processing.'
    ]
  },
  'coconut-cream-tin': {
    name: 'Coconut Cream (Canned)',
    category: 'Canned Coconut Category',
    description: 'Vepuri Coconut Cream is a concentrated product with higher fat content, offering a thicker texture and richer taste. It is designed for applications that require enhanced creaminess and depth of flavor. Processed under controlled conditions, it ensures consistent quality and performance across premium food preparations and industrial usage.',
    image: 'assets/products/Coconut-Cream.jpg',
    imageAlt: 'Canned coconut cream',
    useCases: [
      'High Fat Content - Delivers thickness and richness in every use.',
      'Smooth & Stable Texture - Ensures consistent performance across applications.',
      'Shelf-Stable Format - Convenient for storage, transport, and bulk usage.',
      'Wide Application Range - Ideal for desserts, gravies, and specialty preparations.'
    ]
  },
  'coconut-yogurt': {
    name: 'Coconut Yogurt',
    category: 'Plant-Based Dairy Category',
    description: 'Vepuri Coconut Yogurt is a plant-based alternative developed from coconut, offering a smooth texture and balanced flavor profile. It is designed to meet the growing demand for dairy-free and functional food options. Suitable for both direct consumption and product integration, it aligns with modern dietary preferences and evolving market needs.',
    image: 'assets/products/oil.jpg',
    imageAlt: 'Coconut yogurt',
    useCases: [
      'Dairy-Free Alternative - Suitable for vegan and lactose-intolerant diets.',
      'Smooth Texture - Delivers a consistent and enjoyable mouthfeel.',
      'Modern Food Application - Aligned with plant-based product trends.',
      'Flexible Usage - Suitable for direct consumption and product development.'
    ]
  },
  'coconut-chips': {
    name: 'Coconut Chips',
    category: 'Snack Category',
    description: 'Vepuri Coconut Chips are produced from sliced coconut kernel, processed to achieve a crisp texture while retaining natural flavor. Designed for consistency and shelf stability, they are suitable for both standalone consumption and ingredient use. They support a wide range of applications across snack and food product segments.',
    image: 'assets/products/chips.png',
    imageAlt: 'Coconut chips',
    useCases: [
      'Crisp Texture - Consistent crunch and natural taste.',
      'Shelf-Stable Product - Longer usability with minimal storage challenges.',
      'Versatile Usage - Suitable for snacks, toppings, and food products.',
      'Ready-to-Use - Convenient for both retail and bulk applications.'
    ]
  }
};

function getProductKey() {
  const params = new URLSearchParams(window.location.search);
  return params.get('item') || 'virgin-coconut-oil';
}

function getProductImage(key, fallbackSrc, fallbackAlt) {
  const imageMap = window.PRODUCT_IMAGE_MAP || {};
  const image = imageMap[key];
  if (!image) {
    return {
      src: fallbackSrc,
      alt: fallbackAlt,
      fit: 'cover',
      position: 'center center'
    };
  }
  return {
    src: image.src || fallbackSrc,
    alt: image.alt || fallbackAlt,
    fit: image.fit || 'cover',
    position: image.position || 'center center'
  };
}

function formatHeadingText(text) {
  if (!text) return '';
  const parts = text.split(' ');
  if (parts.length <= 1) return text.toUpperCase();
  const splitIdx = Math.max(1, Math.floor(parts.length / 2));
  const caps = parts.slice(0, splitIdx).join(' ').toUpperCase();
  const italics = parts.slice(splitIdx).join(' ');
  return `${caps} <em>${italics}</em>`;
}

function renderProduct() {
  const key = getProductKey();
  const product = productData[key] || productData['virgin-coconut-oil'];
  const productImage = getProductImage(key, product.image, product.imageAlt);

  document.title = `${product.name} - Vepuri Product Details`;
  const productNameEl = document.getElementById('productName');
  const productDescriptionEl = document.getElementById('productDescription');
  const detailCategoryEl = document.getElementById('detailCategory');
  const detailNameEl = document.getElementById('detailName');

  if (productNameEl) {
    productNameEl.innerHTML = formatHeadingText(product.name);
    productNameEl.style.textTransform = 'none';
  }
  if (productDescriptionEl) productDescriptionEl.textContent = product.description;
  if (detailCategoryEl) detailCategoryEl.textContent = product.category;
  if (detailNameEl) detailNameEl.textContent = product.name;
  const imageEl = document.getElementById('productImage');
  imageEl.src = productImage.src;
  imageEl.alt = productImage.alt;
  imageEl.style.objectFit = productImage.fit;
  imageEl.style.objectPosition = productImage.position;

  const list = document.getElementById('detailUseCases');
  list.innerHTML = '';
  product.useCases.forEach(useCase => {
    const li = document.createElement('li');
    li.textContent = useCase;
    list.appendChild(li);
  });
}

function renderOtherProducts() {
  const currentKey = getProductKey();
  const otherProductsContainer = document.getElementById('otherProductsGrid');
  if (!otherProductsContainer) return;

  otherProductsContainer.innerHTML = '';
  
  // Get all keys except current
  const keys = Object.keys(productData).filter(key => key !== currentKey);
  
  keys.forEach((key, index) => {
    const product = productData[key];
    const imageMap = window.PRODUCT_IMAGE_MAP || {};
    const imgData = imageMap[key] || { src: product.image };
    
    const card = document.createElement('a');
    card.href = `product.html?item=${key}`;
    card.className = `pc-modern rv d${(index % 3) + 1}`;
    
    card.innerHTML = `
      <img src="${imgData.src}" alt="${product.name}">
      <div class="pc-overlay">
        <div class="pc-label">${product.category}</div>
        <h3 class="pc-title">${formatHeadingText(product.name)}</h3>
        <p class="pc-text">${product.description.substring(0, 80)}...</p>
      </div>
    `;
    
    otherProductsContainer.appendChild(card);
  });
}

function init() {
  renderProduct();
  renderOtherProducts();
}

init();
