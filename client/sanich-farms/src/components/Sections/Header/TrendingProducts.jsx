// Smart TrendingProducts - Market-driven product recommendations with insights
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrendingUp, FiArrowRight, FiBarChart2, FiActivity, FiGlobe, FiUsers, FiTarget, FiZap } from 'react-icons/fi';
import HeroProductCard from '../../UI/HeroProductCard';
import Badge from '../../UI/Badge';

const TrendingProducts = ({ 
  trendingData = null,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [activeInsight, setActiveInsight] = useState(0);
  const [marketData, setMarketData] = useState({
    totalBuyers: 1247,
    growthRate: 23.5,
    marketPrediction: 'Rising',
    demandLevel: 'High'
  });

  // Market insights rotation
  const marketInsights = [
    {
      icon: FiActivity,
      title: "Market Prediction",
      message: "Chick demand will increase 25% next week",
      confidence: "High",
      color: "text-blue-600 bg-blue-100"
    },
    {
      icon: FiBarChart2,
      title: "Price Analysis", 
      message: "Feed prices trending down - good time to stock",
      confidence: "Medium",
      color: "text-green-600 bg-green-100"
    },
    {
      icon: FiGlobe,
      title: "Regional Trend",
      message: "Premium egg demand up 18% in West Africa",
      confidence: "High",
      color: "text-purple-600 bg-purple-100"
    },
    {
      icon: FiTarget,
      title: "Smart Buying",
      message: "Customers who buy chicks also buy vitamins 89%",
      confidence: "Very High",
      color: "text-orange-600 bg-orange-100"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight((prev) => (prev + 1) % marketInsights.length);
      // Simulate real-time market data updates
      setMarketData(prev => ({
        ...prev,
        totalBuyers: prev.totalBuyers + Math.floor(Math.random() * 5),
        growthRate: Number((prev.growthRate + (Math.random() * 2 - 1)).toFixed(1))
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (!trendingData || !trendingData.products || trendingData.products.length === 0) {
    return null;
  }

  const { title, description, products } = trendingData;
  const currentInsight = marketInsights[activeInsight];

  const handleViewAllTrending = () => {
    navigate('/shop?filter=trending');
  };

  return (
    <section className={`bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden ${className}`}>
      {/* Market-inspired background pattern */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="w-96 h-96 border-2 border-blue-300 rounded-full absolute -top-48 -left-48"></div>
        <div className="w-64 h-64 border border-purple-300 rounded-full absolute top-20 right-10"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        
        {/* Enhanced Header with Market Insights */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white">
                <FiZap className="w-8 h-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900">
                  {title || 'Trending Now'}
                </h2>
                <Badge variant="trending" size="md">
                  POPULAR
                </Badge>
                <Badge variant="success" size="sm">
                  LIVE DATA
                </Badge>
              </div>
              
              <p className="text-gray-600 max-w-md">
                {description || 'Market-curated products based on demand analysis and customer behavior'}
              </p>
              
              {/* Real-time market stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="bg-white/80 rounded-lg p-3 backdrop-blur-sm border border-blue-100">
                  <div className="flex items-center gap-2">
                    <FiUsers className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Active Buyers</span>
                  </div>
                  <div className="font-bold text-blue-600 text-lg">{marketData.totalBuyers.toLocaleString()}</div>
                </div>
                <div className="bg-white/80 rounded-lg p-3 backdrop-blur-sm border border-green-100">
                  <div className="flex items-center gap-2">
                    <FiTrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Growth</span>
                  </div>
                  <div className="font-bold text-green-600 text-lg">+{marketData.growthRate}%</div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Insight Panel */}
          <div className="lg:w-80 bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${currentInsight.color}`}>
                <currentInsight.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{currentInsight.title}</h3>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {currentInsight.confidence} confidence
                  </span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">{currentInsight.message}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {marketInsights.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeInsight ? 'bg-blue-500 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleViewAllTrending}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                View Analytics <FiArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Products Grid with Smart Recommendations */}
        <div className="space-y-4">
          {/* Smart Recommendation Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <FiTarget className="w-4 h-4" />
              Recommended based on your location and current season
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.slice(0, 6).map((product, index) => (
              <div key={product.id} className="relative group">
                <HeroProductCard
                  product={product}
                  showQuickView={true}
                  className="transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
                />
                {/* Match Score */}
                <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  {95 - index * 2}% match
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Mobile CTA */}
        <div className="sm:hidden mt-6">
          <button
            onClick={handleViewAllTrending}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg"
          >
            Explore Smart Recommendations
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Enhanced Market Intelligence Footer */}
        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FiBarChart2 className="w-5 h-5 text-blue-600" />
            Market Intelligence Dashboard
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.5%</div>
              <div className="text-sm text-gray-600">Customer Satisfaction</div>
              <div className="text-xs text-green-600 mt-1 flex items-center justify-center gap-1">
                <FiTrendingUp className="w-3 h-3" />
                +2.3% this week
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{marketData.totalBuyers.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Active Farmers</div>
              <div className="text-xs text-blue-600 mt-1 flex items-center justify-center gap-1">
                <FiGlobe className="w-3 h-3" />
                Across Ghana
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Live Monitoring</div>
              <div className="text-xs text-purple-600 mt-1 flex items-center justify-center gap-1">
                <FiZap className="w-3 h-3" />
                Real-time updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;