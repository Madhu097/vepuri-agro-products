const productData = {
  'virgin-coconut-oil': {
    name: 'Virgin Coconut Oil',
    category: 'Coconut Oil Category',
    description: 'Extracted from the freshest coconuts through a natural cold-press process, Vepuri Coconut Oil retains all its nutrients and natural aroma. A multi-purpose oil perfect for cooking, skincare, and haircare. Experience coconut in its purest form.',
    image: 'assets/products/oil.jpg',
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
  const detailNameEl = document.getElementById('detailName');

  if (productNameEl) productNameEl.textContent = product.name;
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

renderProduct();
