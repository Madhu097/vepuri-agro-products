const productData = {
  'virgin-coconut-oil': {
    name: 'Virgin Coconut Oil',
    category: 'Coconut Oil Category',
    description: 'Pure, cold-processed coconut oil with a clean aroma profile and stable quality for consumer and industrial applications.',
    image: 'assets/products/oil.jpg',
    imageAlt: 'Virgin coconut oil product image',
    useCases: [
      'Retail edible oil and wellness portfolios',
      'Personal care and cosmetic formulations',
      'Premium food processing ingredient base'
    ]
  },
  'coconut-neera': {
    name: 'Coconut Neera',
    category: 'Natural Coconut Sap Category',
    description: 'Fresh coconut inflorescence sap processed with hygienic handling for beverage and value-added product development.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut neera beverage image',
    useCases: [
      'Functional beverage formulations',
      'Natural sweet base for food processing',
      'Fermented and craft beverage applications'
    ]
  },
  'coconut-honey': {
    name: 'Coconut Honey',
    category: 'Natural Sweetener Category',
    description: 'Thick coconut sap concentrate with balanced sweetness and mineral notes, designed for natural sweetening needs.',
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut honey syrup image',
    useCases: [
      'Bakery and confectionery sweetener',
      'Syrup blend in premium food products',
      'Consumer jars for natural sweetener market'
    ]
  },
  'coconut-caned-milk': {
    name: 'Coconut Caned Milk',
    category: 'Coconut Milk Category',
    description: 'Rich coconut milk profile suitable for food service, packaged consumer products, and culinary manufacturing.',
    image: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut milk product image',
    useCases: [
      'Curry, sauce, and ready-meal applications',
      'Bakery and dessert formulations',
      'HORECA and institutional kitchen supply'
    ]
  },
  'coconut-blossom-sugar': {
    name: 'Coconut Blossom Sugar',
    category: 'Coconut Blossom Sweetener Category',
    description: 'Granulated natural sweetener from coconut blossoms with a caramel note and broad food application compatibility.',
    image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=1400&q=75&auto=format&fit=crop',
    imageAlt: 'Coconut blossom sugar image',
    useCases: [
      'Healthy retail sweetener alternatives',
      'B2B baking and snack manufacturing',
      'Functional food and beverage sweetening'
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

function renderProduct() {
  const key = getProductKey();
  const product = productData[key] || productData['virgin-coconut-oil'];
  const productImage = getProductImage(key, product.image, product.imageAlt);

  document.title = `${product.name} - Vepuri Product Details`;
  const productNameEl = document.getElementById('productName');
  const productDescriptionEl = document.getElementById('productDescription');
  const detailCategoryEl = document.getElementById('detailCategory');
  const detailDescriptionEl = document.getElementById('detailDescription');
  const detailNameEl = document.getElementById('detailName');

  if (productNameEl) productNameEl.textContent = product.name;
  if (productDescriptionEl) productDescriptionEl.textContent = product.description;
  if (detailCategoryEl) detailCategoryEl.textContent = product.category;
  if (detailDescriptionEl) detailDescriptionEl.textContent = product.description;
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

renderProduct();
