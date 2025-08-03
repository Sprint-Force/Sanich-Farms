// // IMPORTANT: Ensure these image imports are correct relative to THIS file's location.
// import broilerChicksImage from '../assets/image7.png';
// import feedAdditiveImage from '../assets/additive.jpg';
// import wheatBranImage from '../assets/wheat.jpg';
// import freshEggImage from '../assets/egg.jpg';
// import layerChicksImage from '../assets/layer_chicks.png';
// import poultryVitaminsImage from '../assets/poultry_vitamins.png';

// // NEW: Add secondary images for the product detail page gallery
// import broilerChickSide from '../assets/broiler_chick_side.png'; // Example secondary image
// import broilerChickGroup from '../assets/broiler_chick_group.png'; // Example tertiary image

// export const productsData = [
//   {
//     id: 1,
//     name: "Broiler Day Old Chicks",
//     currentPrice: 14.99,
//     oldPrice: 20.99,
//     rating: 4,
//     image: broilerChicksImage,
//     imageAlt: "Broiler Day Old Chicks",
//     isFeatured: false,
//     category: "Chicks", // Added category
//     // NEW: Add an array of detail images for the gallery (optional, can be generated or fetched)
//     detailImages: [broilerChicksImage, broilerChickSide, broilerChickGroup],
//     description: "These broiler day-old chicks are sourced from top-quality hatcheries, ensuring healthy growth and high productivity. Perfect for commercial broiler farming.",
//     additionalInfo: {
//       weight: "0.3 kg",
//       type: "Hybrid",
//       age: "1 day old",
//       origin: "Local Hatchery"
//     }
//   },
//   // {
//   //   id: 2,
//   //   name: "Premium Feed Additive",
//   //   currentPrice: 12.00,
//   //   oldPrice: null,
//   //   rating: 4,
//   //   image: feedAdditiveImage,
//   //   imageAlt: "Feed Additive",
//   //   isFeatured: true,
//   //   category: "Feeds", // Added category
//   //   detailImages: [feedAdditiveImage],
//   //   description: "Our premium feed additive is formulated to boost the immunity and growth rate of your poultry. Enriched with essential vitamins and minerals.",
//   //   additionalInfo: {
//   //     weight: "500g",
//   //     type: "Powder",
//   //     usage: "Mix with feed"
//   //   }
//   // },
//   {
//     id: 3,
//     name: "Organic Wheat Bran",
//     currentPrice: 14.99,
//     oldPrice: 20.99,
//     rating: 4,
//     image: wheatBranImage,
//     imageAlt: "Wheat Bran",
//     isFeatured: false,
//     category: "Feeds", // Added category
//     detailImages: [wheatBranImage],
//     description: "High-quality organic wheat bran, a natural and essential component for poultry feed. Promotes healthy digestion and nutrient absorption.",
//     additionalInfo: {
//       weight: "25kg",
//       type: "Organic",
//       source: "Local Farms"
//     }
//   },
//   {
//     id: 4,
//     name: "Farm Fresh Eggs (Dozen)",
//     currentPrice: 14.99,
//     oldPrice: 20.99,
//     rating: 4,
//     image: freshEggImage,
//     imageAlt: "Farm Fresh Eggs (Dozen)",
//     isFeatured: false,
//     category: "Eggs", // Added category
//     detailImages: [freshEggImage],
//     description: "Naturally laid, farm-fresh eggs from healthy hens. Rich in protein and essential nutrients, perfect for your daily needs.",
//     additionalInfo: {
//       quantity: "1 Dozen",
//       type: "Brown/White",
//       storage: "Refrigerate"
//     }
//   },
//   {
//     id: 5,
//     name: "Layer Day Old Chicks",
//     currentPrice: 16.50,
//     oldPrice: 22.00,
//     rating: 5,
//     image: layerChicksImage,
//     imageAlt: "Layer Day Old Chicks",
//     isFeatured: false,
//     category: "Chicks", // Added category
//     detailImages: [layerChicksImage],
//     description: "Robust layer day-old chicks with high laying potential. Bred for excellent egg production and resilience.",
//     additionalInfo: {
//       weight: "0.3 kg",
//       type: "Hybrid",
//       age: "1 day old",
//       origin: "Certified Hatchery"
//     }
//   },
//   {
//     id: 6,
//     name: "Poultry Vitamins",
//     currentPrice: 8.75,
//     oldPrice: null,
//     rating: 3,
//     image: poultryVitaminsImage,
//     imageAlt: "Poultry Vitamins",
//     isFeatured: false,
//     category: "Vitamins", // Added category
//     detailImages: [poultryVitaminsImage],
//     description: "Essential vitamin supplements for all stages of poultry growth. Boosts health, immunity, and overall performance.",
//     additionalInfo: {
//       volume: "1 Liter",
//       form: "Liquid",
//       usage: "Drinking Water"
//     }
//   },
//   {
//     id: 7,
//     name: "Starter Feed 25kg",
//     currentPrice: 45.00,
//     oldPrice: 50.00,
//     rating: 4,
//     image: feedAdditiveImage, // Reusing image for demo
//     imageAlt: "Starter Feed",
//     isFeatured: false,
//     category: "Feeds",
//     detailImages: [feedAdditiveImage],
//     description: "Specially formulated starter feed for young chicks, providing all necessary nutrients for rapid early growth.",
//     additionalInfo: {
//       weight: "25kg",
//       type: "Crumble",
//       protein: "20%"
//     }
//   },
//   {
//     id: 8,
//     name: "Vaccine Combo Pack",
//     currentPrice: 30.00,
//     oldPrice: null,
//     rating: 5,
//     image: poultryVitaminsImage, // Reusing image for demo
//     imageAlt: "Vaccine Combo Pack",
//     isFeatured: false,
//     category: "Vitamins",
//     detailImages: [poultryVitaminsImage],
//     description: "A comprehensive vaccine pack to protect your flock against common poultry diseases. Consult a vet for dosage.",
//     additionalInfo: {
//       doses: "100 Doses",
//       storage: "Refrigerated",
//       application: "Injection/Oral"
//     }
//   },
//   {
//     id: 9,
//     name: "Brown Eggs (Tray)",
//     currentPrice: 13.50,
//     oldPrice: 18.00,
//     rating: 4,
//     image: freshEggImage, // Reusing image for demo
//     imageAlt: "Brown Eggs",
//     isFeatured: false,
//     category: "Eggs",
//     detailImages: [freshEggImage],
//     description: "A tray of rich, brown eggs, perfect for baking or a hearty breakfast. Sourced from free-range hens.",
//     additionalInfo: {
//       quantity: "30 Eggs",
//       color: "Brown",
//       farm: "Sanich Farms"
//     }
//   },
//   {
//     id: 10,
//     name: "Cockerel Day Old Chicks",
//     currentPrice: 10.00,
//     oldPrice: 15.00,
//     rating: 3,
//     image: broilerChicksImage, // Reusing image for demo
//     imageAlt: "Cockerel Day Old Chicks",
//     isFeatured: false,
//     category: "Chicks",
//     detailImages: [broilerChicksImage],
//     description: "Hardy cockerel day-old chicks, suitable for meat production or breeding programs.",
//     additionalInfo: {
//       weight: "0.3 kg",
//       type: "Cockerel",
//       age: "1 day old",
//       origin: "Local Hatchery"
//     }
//   },
// ];

// src/data/productsData.js

// Import your actual product images here
// Ensure these paths are correct relative to productsData.js
import chickImage from '../assets/image7.png'; // Example
import feedImage from '../assets/additive.jpg';   // Example
import eggImage from '../assets/egg.jpg';     // Example
import vitaminImage from '../assets/poultry_vitamins.png'; // Example

// Example of multiple images for a product
import broilerChickMain from '../assets/image7.png'; // Assuming this is your main broiler chick image
import broilerChickSide from '../assets/layer_chicks.png'; // Assuming this is a side view
import broilerChickGroup from '../assets/broiler_chick_group.png'; // Assuming this is a group view


export const productsData = [
  {
    id: 1,
    name: "Broiler Day Old Chicks",
    shortDescription: "High-quality broiler chicks, 1 week old, vaccinated and ready for growth. Excellent for meat production.",
    fullDescription: "These broiler chicks are meticulously raised in a controlled environment, ensuring they are healthy, robust, and disease-free. They are vaccinated against common poultry diseases and are ready for immediate brooding upon arrival. Ideal for commercial meat production, they exhibit rapid growth rates and efficient feed conversion.",
    price: "GH₵14.99", // Display price string
    currentPrice: 14.99, // IMPORTANT: Numeric price for calculations/sorting
    oldPrice: 20.99, // Numeric old price
    rating: 4, // Numeric rating
    reviews: 120, // Total number of reviews
    category: "Chicks",
    sku: "CHICK001",
    tags: ["broiler", "chicks", "poultry", "day-old"],
    availability: 'In Stock',
    image: broilerChickMain, // Main image for product card
    images: [ // Array of images for detail page gallery
      broilerChickMain,
      broilerChickSide,
      broilerChickGroup,
      'https://placehold.co/600x400/808080/FFFFFF?text=Chick+View+4' // Placeholder example
    ],
    keyFeatures: [ // For the checkmark list in product details
      "Vaccinated for optimal health",
      "Rapid growth rate",
      "Excellent feed conversion ratio",
      "Sourced from reputable hatcheries",
    ],
    additionalInfo: { // For the "Additional Information" tab
      "Weight per chick": "40-45g",
      "Breed": "Ross 308",
      "Shelf Life": "N/A (live animal)",
      "Storage": "Requires brooding environment",
      "Origin": "Local Hatchery",
    },
    reviewsData: [ // For the "Customer Feedback" tab
      { rating: 5, author: "John Watson", date: "3 min ago", comment: "Excellent quality chicks, very active and healthy upon arrival!" },
      { rating: 4, author: "Jane Cooper", date: "1 day ago", comment: "Good chicks, but delivery was a bit delayed. Otherwise satisfied." },
      { rating: 5, author: "Kwame Nkrumah", date: "5 days ago", comment: "My best batch of broilers yet! Highly recommend Sanich Farms." },
    ]
  },
  {
    id: 2,
    name: "Premium Feed Additive",
    shortDescription: "Boosts growth and immunity, ensuring healthier poultry.",
    fullDescription: "Our premium feed additive is formulated with essential vitamins, minerals, and probiotics to enhance nutrient absorption, improve digestive health, and strengthen the immune system of your poultry. Regular use leads to faster growth, better feed efficiency, and reduced mortality rates.",
    price: "GH₵12.00",
    currentPrice: 12.00,
    oldPrice: null,
    rating: 4,
    reviews: 85,
    category: "Feeds",
    sku: "FEED001",
    tags: ["feed", "additive", "nutrition", "growth"],
    availability: 'In Stock',
    image: feedImage,
    images: [
      feedImage,
      'https://placehold.co/600x400/808080/FFFFFF?text=Feed+View+2'
    ],
    keyFeatures: [
      "Rich in essential vitamins and minerals",
      "Improves digestion and nutrient absorption",
      "Enhances immune system",
      "Suitable for all poultry types",
    ],
    additionalInfo: {
      "Net Weight": "1kg",
      "Ingredients": "Vitamin A, D3, E, B Complex, Probiotics, Amino Acids",
      "Usage": "Mix 5g per 1kg of feed",
      "Storage": "Cool, dry place",
    },
    reviewsData: [
      { rating: 4, author: "Alice Brown", date: "2 weeks ago", comment: "Seen good improvements in my birds' health. Easy to mix." },
      { rating: 3, author: "Bob White", date: "1 month ago", comment: "It's okay, not a miracle worker but helps." },
    ]
  },
  {
    id: 3,
    name: "Organic Wheat Bran",
    shortDescription: "Natural and fibrous supplement for poultry feed.",
    fullDescription: "Organic wheat bran is a highly fibrous and nutritious supplement for your poultry. It aids in digestion, provides essential energy, and contributes to overall gut health. Sourced from organic farms, it's free from pesticides and harmful chemicals, ensuring a natural diet for your birds.",
    price: "GH₵14.99",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    reviews: 50,
    category: "Feeds",
    sku: "FEED003",
    tags: ["organic", "wheat", "bran", "feed", "fiber"],
    availability: 'In Stock',
    image: eggImage, // Using egg image as placeholder for now
    images: [
      eggImage,
      'https://placehold.co/600x400/FFF0F5/800000?text=Wheat+Bran+2'
    ],
    keyFeatures: [
      "High in dietary fiber",
      "Supports healthy digestion",
      "100% organic and natural",
      "Boosts energy levels",
    ],
    additionalInfo: {
      "Net Weight": "10kg",
      "Protein Content": "15%",
      "Fiber Content": "12%",
      "Storage": "Dry, cool place",
    },
    reviewsData: [
      { rating: 5, author: "Chris Green", date: "3 days ago", comment: "My chickens love this! Great quality." },
      { rating: 4, author: "Diana Prince", date: "1 week ago", comment: "Good product, arrived quickly." },
    ]
  },
  {
    id: 4,
    name: "Farm Fresh Eggs (Dozen)",
    shortDescription: "Locally sourced, nutritious, and delicious eggs.",
    fullDescription: "Enjoy the taste of truly farm-fresh eggs from our healthy, free-range hens. Each egg is carefully collected and packed to ensure maximum freshness and quality. Perfect for baking, cooking, or a healthy breakfast, these eggs are a staple for every kitchen.",
    price: "GH₵14.99",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    reviews: 200,
    category: "Eggs",
    sku: "EGG002",
    tags: ["eggs", "fresh", "organic", "dozen"],
    availability: 'In Stock',
    image: eggImage,
    images: [
      eggImage,
      'https://placehold.co/600x400/E6E6FA/4682B4?text=Fresh+Eggs+2'
    ],
    keyFeatures: [
      "Naturally rich in protein and vitamins",
      "Collected daily for ultimate freshness",
      "From free-range, healthy hens",
      "Perfect for any meal",
    ],
    additionalInfo: {
      "Quantity": "12 eggs per carton",
      "Shelf Life": "3 weeks refrigerated",
      "Storage": "Refrigerate after purchase",
      "Size": "Large",
    },
    reviewsData: [
      { rating: 5, author: "Frank Miller", date: "2 days ago", comment: "The freshest eggs I've ever bought! Will definitely reorder." },
      { rating: 5, author: "Grace Lee", date: "4 days ago", comment: "Delicious and great quality. Highly recommend." },
    ]
  },
  {
    id: 5,
    name: "Layer Day Old Chicks",
    shortDescription: "Robust layer chicks for consistent egg production.",
    fullDescription: "Our day-old layer chicks are bred for high egg-laying performance and resilience. They are carefully selected and vaccinated, providing you with a strong foundation for your laying flock. Invest in quality layers for a productive and profitable egg business.",
    price: "GH₵16.50",
    currentPrice: 16.50,
    oldPrice: 22.00,
    rating: 5,
    reviews: 90,
    category: "Chicks",
    sku: "CHICK002",
    tags: ["layer", "chicks", "poultry", "day-old"],
    availability: 'In Stock',
    image: chickImage, // Reusing chick image
    images: [
      chickImage,
      'https://placehold.co/600x400/DDA0DD/800080?text=Layer+Chicks+2'
    ],
    keyFeatures: [
      "High egg-laying potential",
      "Strong and healthy genetics",
      "Vaccinated against common diseases",
      "Ideal for commercial egg production",
    ],
    additionalInfo: {
      "Weight per chick": "35-40g",
      "Breed": "Isa Brown",
      "Expected Laying Age": "18-20 weeks",
      "Peak Production": "75-80 weeks",
    },
    reviewsData: [
      { rating: 5, author: "Henry King", date: "1 week ago", comment: "Fantastic chicks, all arrived healthy and are growing well." },
      { rating: 5, author: "Ivy Queen", date: "3 weeks ago", comment: "Very satisfied with these layers. Starting to lay already!" },
    ]
  },
  {
    id: 6,
    name: "Poultry Vitamins",
    shortDescription: "Essential vitamins for poultry health and vitality.",
    fullDescription: "A comprehensive blend of vitamins and minerals crucial for the overall health, growth, and productivity of your poultry. This supplement supports bone development, feather quality, and boosts immunity, especially during stressful periods or disease outbreaks.",
    price: "GH₵8.75",
    currentPrice: 8.75,
    oldPrice: null,
    rating: 3,
    reviews: 60,
    category: "Vitamins",
    sku: "VIT001",
    tags: ["vitamins", "health", "supplement", "poultry"],
    availability: 'In Stock',
    image: vitaminImage,
    images: [
      vitaminImage,
      'https://placehold.co/600x400/B0E0E6/0000CD?text=Poultry+Vitamins+2'
    ],
    keyFeatures: [
      "Boosts immunity",
      "Supports growth and bone health",
      "Enhances eggshell quality",
      "Easy to administer in water or feed",
    ],
    additionalInfo: {
      "Volume": "500ml",
      "Composition": "Vitamin A, D3, E, K, B1, B2, B6, B12, Niacin, Pantothenic Acid",
      "Dosage": "1ml per liter of drinking water",
      "Application": "Oral or mixed with feed",
    },
    reviewsData: [
      { rating: 3, author: "Kevin Blue", date: "1 month ago", comment: "Seems to work okay, no major changes but no issues either." },
      { rating: 4, author: "Laura Red", date: "2 months ago", comment: "My birds look healthier since I started using this." },
    ]
  },
];

