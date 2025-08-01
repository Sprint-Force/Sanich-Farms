// IMPORTANT: Ensure these image imports are correct relative to THIS file's location.
import broilerChicksImage from '../assets/image7.png';
import feedAdditiveImage from '../assets/additive.jpg';
import wheatBranImage from '../assets/wheat.jpg';
import freshEggImage from '../assets/egg.jpg';
import layerChicksImage from '../assets/layer_chicks.png';
import poultryVitaminsImage from '../assets/poultry_vitamins.png';

// NEW: Add secondary images for the product detail page gallery
import broilerChickSide from '../assets/broiler_chick_side.png'; // Example secondary image
import broilerChickGroup from '../assets/broiler_chick_group.png'; // Example tertiary image

export const productsData = [
  {
    id: 1,
    name: "Broiler Day Old Chicks",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    image: broilerChicksImage,
    imageAlt: "Broiler Day Old Chicks",
    isFeatured: false,
    category: "Chicks", // Added category
    // NEW: Add an array of detail images for the gallery (optional, can be generated or fetched)
    detailImages: [broilerChicksImage, broilerChickSide, broilerChickGroup],
    description: "These broiler day-old chicks are sourced from top-quality hatcheries, ensuring healthy growth and high productivity. Perfect for commercial broiler farming.",
    additionalInfo: {
      weight: "0.3 kg",
      type: "Hybrid",
      age: "1 day old",
      origin: "Local Hatchery"
    }
  },
  // {
  //   id: 2,
  //   name: "Premium Feed Additive",
  //   currentPrice: 12.00,
  //   oldPrice: null,
  //   rating: 4,
  //   image: feedAdditiveImage,
  //   imageAlt: "Feed Additive",
  //   isFeatured: true,
  //   category: "Feeds", // Added category
  //   detailImages: [feedAdditiveImage],
  //   description: "Our premium feed additive is formulated to boost the immunity and growth rate of your poultry. Enriched with essential vitamins and minerals.",
  //   additionalInfo: {
  //     weight: "500g",
  //     type: "Powder",
  //     usage: "Mix with feed"
  //   }
  // },
  {
    id: 3,
    name: "Organic Wheat Bran",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    image: wheatBranImage,
    imageAlt: "Wheat Bran",
    isFeatured: false,
    category: "Feeds", // Added category
    detailImages: [wheatBranImage],
    description: "High-quality organic wheat bran, a natural and essential component for poultry feed. Promotes healthy digestion and nutrient absorption.",
    additionalInfo: {
      weight: "25kg",
      type: "Organic",
      source: "Local Farms"
    }
  },
  {
    id: 4,
    name: "Farm Fresh Eggs (Dozen)",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    image: freshEggImage,
    imageAlt: "Farm Fresh Eggs (Dozen)",
    isFeatured: false,
    category: "Eggs", // Added category
    detailImages: [freshEggImage],
    description: "Naturally laid, farm-fresh eggs from healthy hens. Rich in protein and essential nutrients, perfect for your daily needs.",
    additionalInfo: {
      quantity: "1 Dozen",
      type: "Brown/White",
      storage: "Refrigerate"
    }
  },
  {
    id: 5,
    name: "Layer Day Old Chicks",
    currentPrice: 16.50,
    oldPrice: 22.00,
    rating: 5,
    image: layerChicksImage,
    imageAlt: "Layer Day Old Chicks",
    isFeatured: false,
    category: "Chicks", // Added category
    detailImages: [layerChicksImage],
    description: "Robust layer day-old chicks with high laying potential. Bred for excellent egg production and resilience.",
    additionalInfo: {
      weight: "0.3 kg",
      type: "Hybrid",
      age: "1 day old",
      origin: "Certified Hatchery"
    }
  },
  {
    id: 6,
    name: "Poultry Vitamins",
    currentPrice: 8.75,
    oldPrice: null,
    rating: 3,
    image: poultryVitaminsImage,
    imageAlt: "Poultry Vitamins",
    isFeatured: false,
    category: "Vitamins", // Added category
    detailImages: [poultryVitaminsImage],
    description: "Essential vitamin supplements for all stages of poultry growth. Boosts health, immunity, and overall performance.",
    additionalInfo: {
      volume: "1 Liter",
      form: "Liquid",
      usage: "Drinking Water"
    }
  },
  {
    id: 7,
    name: "Starter Feed 25kg",
    currentPrice: 45.00,
    oldPrice: 50.00,
    rating: 4,
    image: feedAdditiveImage, // Reusing image for demo
    imageAlt: "Starter Feed",
    isFeatured: false,
    category: "Feeds",
    detailImages: [feedAdditiveImage],
    description: "Specially formulated starter feed for young chicks, providing all necessary nutrients for rapid early growth.",
    additionalInfo: {
      weight: "25kg",
      type: "Crumble",
      protein: "20%"
    }
  },
  {
    id: 8,
    name: "Vaccine Combo Pack",
    currentPrice: 30.00,
    oldPrice: null,
    rating: 5,
    image: poultryVitaminsImage, // Reusing image for demo
    imageAlt: "Vaccine Combo Pack",
    isFeatured: false,
    category: "Vitamins",
    detailImages: [poultryVitaminsImage],
    description: "A comprehensive vaccine pack to protect your flock against common poultry diseases. Consult a vet for dosage.",
    additionalInfo: {
      doses: "100 Doses",
      storage: "Refrigerated",
      application: "Injection/Oral"
    }
  },
  {
    id: 9,
    name: "Brown Eggs (Tray)",
    currentPrice: 13.50,
    oldPrice: 18.00,
    rating: 4,
    image: freshEggImage, // Reusing image for demo
    imageAlt: "Brown Eggs",
    isFeatured: false,
    category: "Eggs",
    detailImages: [freshEggImage],
    description: "A tray of rich, brown eggs, perfect for baking or a hearty breakfast. Sourced from free-range hens.",
    additionalInfo: {
      quantity: "30 Eggs",
      color: "Brown",
      farm: "Sanich Farms"
    }
  },
  {
    id: 10,
    name: "Cockerel Day Old Chicks",
    currentPrice: 10.00,
    oldPrice: 15.00,
    rating: 3,
    image: broilerChicksImage, // Reusing image for demo
    imageAlt: "Cockerel Day Old Chicks",
    isFeatured: false,
    category: "Chicks",
    detailImages: [broilerChicksImage],
    description: "Hardy cockerel day-old chicks, suitable for meat production or breeding programs.",
    additionalInfo: {
      weight: "0.3 kg",
      type: "Cockerel",
      age: "1 day old",
      origin: "Local Hatchery"
    }
  },
];
