// Import actual product images here
// Ensure these paths are correct relative to productsData.js
import chickImage from '../assets/image7.png'; // Example
import feedImage from '../assets/additive.jpg';   // Example
import eggImage from '../assets/egg.jpg';     // Example

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
    price: "14.99", // Display price string
    currentPrice: 14.99, // IMPORTANT: Numeric price for calculations/sorting
    oldPrice: 20.99, // Numeric old price
    rating: 4, // Numeric rating
    reviews: 120, // Total number of reviews
    category: "Chicks",
    // sku: "CHICK001", // REMOVED SKU as requested
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
    additionalInfo: { // Standardized additionalInfo
      "Weight": "0.3 kg",
      "Type": "Hybrid",
      "Age": "1 day old",
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
    price: "12.00",
    currentPrice: 12.00,
    oldPrice: null,
    rating: 4,
    reviews: 85,
    category: "Feeds",
    // sku: "FEED001", // REMOVED SKU as requested
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
    additionalInfo: { // Standardized additionalInfo
      "Weight": "1 kg",
      "Type": "Powder",
      "Age": "All ages",
      "Origin": "Imported",
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
    price: "14.99",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    reviews: 50,
    category: "Feeds",
    // sku: "FEED003", // REMOVED SKU as requested
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
    additionalInfo: { // Standardized additionalInfo
      "Weight": "10 kg",
      "Type": "Grain",
      "Age": "All ages",
      "Origin": "Local Farm",
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
    price: "14.99",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    reviews: 200,
    category: "Eggs",
    // sku: "EGG002", // REMOVED SKU as requested
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
    additionalInfo: { // Standardized additionalInfo
      "Weight": "0.7 kg", // for a dozen eggs
      "Type": "Chicken Eggs",
      "Age": "Freshly laid",
      "Origin": "Local Farm",
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
    price: "16.50",
    currentPrice: 16.50,
    oldPrice: 22.00,
    rating: 5,
    reviews: 90,
    category: "Chicks",
    // sku: "CHICK002", // REMOVED SKU as requested
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
    additionalInfo: { // Standardized additionalInfo
      "Weight": "0.2 kg",
      "Type": "Layer",
      "Age": "1 day old",
      "Origin": "Local Hatchery",
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
    price: "8.75",
    currentPrice: 8.75,
    oldPrice: null,
    rating: 3,
    reviews: 60,
    category: "Vitamins",
    // sku: "VIT001", // REMOVED SKU as requested
    tags: ["vitamins", "health", "supplement", "poultry"],
    availability: 'In Stock',
    image: 'https://placehold.co/600x400/B0E0E6/0000CD?text=Poultry+Vitamins',
    images: [
      'https://placehold.co/600x400/B0E0E6/0000CD?text=Poultry+Vitamins',
      'https://placehold.co/600x400/B0E0E6/0000CD?text=Poultry+Vitamins+2'
    ],
    keyFeatures: [
      "Boosts immunity",
      "Supports growth and bone health",
      "Enhances eggshell quality",
      "Easy to administer in water or feed",
    ],
    additionalInfo: { // Standardized additionalInfo
      "Weight": "0.5 kg", // for 500ml liquid
      "Type": "Liquid",
      "Age": "All ages",
      "Origin": "Imported",
    },
    reviewsData: [
      { rating: 3, author: "Kevin Blue", date: "1 month ago", comment: "Seems to work okay, no major changes but no issues either." },
      { rating: 4, author: "Laura Red", date: "2 months ago", comment: "My birds look healthier since I started using this." },
    ]
  },
];
