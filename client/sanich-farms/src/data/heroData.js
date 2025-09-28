// Enhanced Mock Data for Unique Hero Section (Amazon/Alibaba/Jumia inspired)
import chickImage from '../assets/image7.png';
import feedImage from '../assets/additive.jpg';   
import eggImage from '../assets/egg.jpg';
import broilerChickMain from '../assets/image7.png';
import layerChicks from '../assets/layer_chicks.png';
import broilerChickGroup from '../assets/broiler_chick_group.png';
import wheatImage from '../assets/wheat.jpg';

// Enhanced Flash Sale Data with live stock tracking
export const flashSaleData = {
  title: "Lightning Deals",
  description: "Amazon-style flash sales with live stock updates and social proof",
  salePercentage: 60,
  endDate: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
  products: [
    {
      id: 1,
      name: "Premium Broiler Day-Old Chicks",
      image: broilerChickMain,
      currentPrice: 8.99,
      oldPrice: 18.99,
      rating: 4.9,
      reviews: 324,
      category: "Chicks",
      availability: "In Stock",
      isFlashSale: true,
      isTrending: true,
      stockLevel: 85, // % claimed
      liveViewers: 247,
      recentSales: "1,284 sold this week"
    },
    {
      id: 2,
      name: "Vaccinated Layer Chicks (50 Pack)",
      image: layerChicks,
      currentPrice: 45.99,
      oldPrice: 89.99,
      rating: 4.8,
      reviews: 189,
      category: "Chicks",
      availability: "Low Stock",
      isFlashSale: true,
      isNew: true,
      stockLevel: 92,
      liveViewers: 156,
      recentSales: "789 sold this week"
    },
    {
      id: 3,
      name: "Smart Feed Formula (25kg)",
      image: feedImage,
      currentPrice: 35.99,
      oldPrice: 65.99,
      rating: 4.7,
      reviews: 567,
      category: "Feed",
      availability: "In Stock",
      isFlashSale: true,
      stockLevel: 73,
      liveViewers: 98,
      recentSales: "2,145 sold this week"
    },
    {
      id: 4,
      name: "Farm-Fresh Organic Eggs (30 pcs)",
      image: eggImage,
      currentPrice: 12.99,
      oldPrice: 24.99,
      rating: 5.0,
      reviews: 892,
      category: "Eggs",
      availability: "In Stock",
      isFlashSale: true,
      isTrending: true,
      stockLevel: 67,
      liveViewers: 312,
      recentSales: "5,678 sold this week"
    },
    {
      id: 5,
      name: "Broiler Growth Package (100 chicks + feed)",
      image: broilerChickGroup,
      currentPrice: 199.99,
      oldPrice: 349.99,
      rating: 4.6,
      reviews: 156,
      category: "Packages",
      availability: "Limited",
      isFlashSale: true,
      isNew: true,
      stockLevel: 94,
      liveViewers: 89,
      recentSales: "234 sold this week"
    }
  ]
};

// Smart Trending Products Data
export const trendingData = {
  title: "Trending Now",
  description: "Smart recommendations powered by market analysis and customer behavior",
  products: [
    {
      id: 1,
      name: "Premium Broiler Starter Pack",
      image: broilerChickMain,
      currentPrice: 24.99,
      oldPrice: 35.99,
      rating: 4.9,
      reviews: 1247,
      category: "Chicks",
      availability: "In Stock",
      isTrending: true,
      isRecommended: true,
      confidence: 96,
      trendingReason: "High demand in your area",
      priceHistory: "Price expected to rise next week"
    },
    {
      id: 6,
      name: "Smart Nutrition Premium Feed",
      image: wheatImage,
      currentPrice: 28.99,
      oldPrice: null,
      rating: 4.8,
      reviews: 678,
      category: "Feed",
      availability: "In Stock",
      isTrending: true,
      isNew: true,
      isRecommended: true,
      confidence: 91,
      trendingReason: "Perfect for current season",
      priceHistory: "Price dropped 12%"
    },
    {
      id: 4,
      name: "Farm-Fresh Omega-3 Eggs",
      image: eggImage,
      currentPrice: 15.99,
      oldPrice: null,
      rating: 5.0,
      reviews: 2341,
      category: "Eggs",
      availability: "In Stock",
      isTrending: true,
      isRecommended: true,
      confidence: 94,
      trendingReason: "Most ordered this week",
      priceHistory: "Stable pricing"
    },
    {
      id: 2,
      name: "Layer Plus Vaccine Package",
      image: layerChicks,
      currentPrice: 18.99,
      oldPrice: 25.99,
      rating: 4.7,
      reviews: 445,
      category: "Healthcare",
      availability: "In Stock",
      isTrending: true,
      isNew: true,
      isRecommended: true,
      confidence: 87,
      trendingReason: "Health trend in Ghana",
      priceHistory: "New formula launched"
    },
    {
      id: 7,
      name: "Complete Poultry Vitamin Mix",
      image: feedImage,
      currentPrice: 22.99,
      oldPrice: null,
      rating: 4.6,
      reviews: 334,
      category: "Healthcare",
      availability: "In Stock",
      isTrending: true,
      isRecommended: true,
      confidence: 89,
      trendingReason: "Prevents common diseases",
      priceHistory: "Great value pick"
    },
    {
      id: 5,
      name: "Ultimate Growth Package",
      image: broilerChickGroup,
      currentPrice: 299.99,
      oldPrice: 399.99,
      rating: 4.8,
      reviews: 123,
      category: "Packages",
      availability: "Limited",
      isTrending: true,
      isRecommended: true,
      confidence: 92,
      trendingReason: "Best value for farmers",
      priceHistory: "Limited time bundle"
    }
  ]
};

// Dynamic Smart Promotional Banners (rotates automatically)
export const promoBanners = [
  {
    id: 1,
    message: "� LIVE: 2,450 fresh eggs collected today | Free delivery on GHS 200+",
    ctaText: "Order Fresh",
    variant: "live",
    icon: "activity",
    location: "Kumasi Farm",
    urgency: "high"
  },
  {
    id: 2,
    message: "FLASH: 500 day-old chicks available | Limited stock - 85% claimed",
    ctaText: "Secure Now",
    variant: "urgent", 
    icon: "zap",
    location: "Accra Farm",
    urgency: "critical"
  },
  {
    id: 3,
    message: "SMART: Market analysis predicts 25% price increase next week | Lock rates today",
    ctaText: "Lock Price",
    variant: "smart",
    icon: "brain",
    location: "Market Analysis",
    urgency: "medium"
  },
  {
    id: 4,
    message: "TRENDING: Premium feed 30% OFF | Perfect weather conditions",
    ctaText: "Save Now",
    variant: "offer",
    icon: "percent",
    location: "All Farms",
    urgency: "low"
  }
];

// Enhanced Hero Slides with unique value propositions
export const enhancedHeroSlides = [
  {
    id: 1,
    title: "Smart Farm-to-Table",
    headline: "Track Your Poultry from Farm to Plate", 
    description: "Revolutionary blockchain-tracked poultry with real-time health monitoring and quality assurance",
    image: chickImage,
    ctaText: "Start Tracking",
    ctaSecondary: "View Journey",
    badge: "BLOCKCHAIN VERIFIED",
    badgeVariant: "new",
    features: ["GPS Tracking", "Health Reports", "Quality Certified"],
    uniqueValue: "First in Ghana with full traceability"
  },
  {
    id: 2, 
    title: "Smart Farming Solutions",
    headline: "Optimize Your Poultry Business",
    description: "Advanced analytics predict market trends, optimize feed schedules, and maximize your profit margins",
    image: broilerChickGroup,
    ctaText: "Try Analytics",
    ctaSecondary: "See Demo",
    badge: "ANALYTICS POWERED",
    badgeVariant: "trending",
    features: ["Market Predictions", "Auto-Scheduling", "Profit Optimization"],
    uniqueValue: "Increase profits by 40% with analytics"
  },
  {
    id: 3,
    title: "Live Market Intelligence", 
    headline: "Real-Time Prices & Market Insights",
    description: "Access live commodity prices, weather forecasts, and market trends to make informed decisions",
    image: feedImage,
    ctaText: "View Market",
    ctaSecondary: "Get Alerts",
    badge: "� LIVE DATA",
    badgeVariant: "flash",
    features: ["Live Prices", "Weather Alerts", "Trend Analysis"],
    uniqueValue: "Beat the market with real-time data"
  },
  {
    id: 4,
    title: "Social Commerce Hub",
    headline: "Connect, Trade & Learn from Farmers",
    description: "Join Ghana's largest poultry farming community. Share experiences, trade directly, and learn from experts",
    image: eggImage,
    ctaText: "Join Community",
    ctaSecondary: "Browse Market",
    badge: "� COMMUNITY DRIVEN",
    badgeVariant: "success",
    features: ["Farmer Network", "Direct Trading", "Expert Advice"],
    uniqueValue: "10,000+ active farmers nationwide"
  }
];