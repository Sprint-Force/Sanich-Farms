// Smart FlashSales - Amazon Lightning Deals inspired with live stock updates
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiZap, FiArrowRight, FiUsers, FiEye, FiShoppingCart, FiClock } from 'react-icons/fi';
import CountdownTimer from '../../UI/CountdownTimer';
import Badge from '../../UI/Badge';
import HeroProductCard from '../../UI/HeroProductCard';

const FlashSales = ({ 
  flashSaleData = null,
  className = '' 
}) => {
  const navigate = useNavigate();
  const [liveViewers, setLiveViewers] = useState(247);
  const [recentPurchases, setRecentPurchases] = useState([]);

  // Simulate live viewers (Amazon-style)
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate recent purchases (Alibaba-style social proof)
  useEffect(() => {
    const purchases = [
      "John from Accra bought 50 chicks",
      "Mary from Kumasi ordered 2kg feed", 
      "Samuel from Tamale purchased eggs",
      "Grace from Cape Coast bought vitamins"
    ];
    
    const showPurchase = () => {
      const randomPurchase = purchases[Math.floor(Math.random() * purchases.length)];
      setRecentPurchases(prev => [randomPurchase, ...prev.slice(0, 2)]);
    };

    const interval = setInterval(showPurchase, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!flashSaleData || !flashSaleData.products || flashSaleData.products.length === 0) {
    return null;
  }

  const { title, description, endDate, products, salePercentage } = flashSaleData;

  const handleViewAllSales = () => {
    navigate('/shop?filter=flash-sales');
  };

  return (
    <section className={`bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-l-4 border-red-500 relative overflow-hidden ${className}`}>
      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-red-200/20 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        
        {/* Enhanced Header with Live Stats */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl text-white">
                <FiZap className="w-8 h-8" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-2xl font-bold text-gray-900">
                  {title || 'Lightning Deals'}
                </h2>
                <Badge variant="flash" size="md" className="animate-pulse">
                  UP TO {salePercentage || 50}% OFF
                </Badge>
                <Badge variant="error" size="sm">
                  LIMITED TIME
                </Badge>
              </div>
              
              <p className="text-gray-600 max-w-md">
                {description || 'Amazon-style lightning deals on premium poultry products'}
              </p>
              
              {/* Live engagement stats */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <FiEye className="w-4 h-4 text-red-500" />
                  <span className="font-semibold text-red-600">{liveViewers}</span>
                  <span>watching now</span>
                </div>
                <div className="flex items-center gap-1">
                  <FiShoppingCart className="w-4 h-4 text-green-500" />
                  <span>85% claimed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced View All Button */}
          <button
            onClick={handleViewAllSales}
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            View All Lightning Deals
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Live Social Proof Feed */}
        <div className="mb-6 bg-white/50 backdrop-blur-sm rounded-lg p-3 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Recent Activity</span>
          </div>
          <div className="space-y-1 h-12 overflow-hidden">
            {recentPurchases.map((purchase, index) => (
              <div 
                key={index}
                className="text-xs text-gray-600 animate-slide-up"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                {purchase} • <span className="text-green-600">just now</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Countdown with Progress */}
        {endDate && (
          <div className="mb-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <FiClock className="w-5 h-5" />
                  <span className="font-semibold">Deal ends in:</span>
                </div>
                <CountdownTimer 
                  endDate={endDate} 
                  size="lg"
                  className="text-white"
                />
              </div>
              <div className="text-right">
                <div className="text-sm opacity-90">Stock Alert</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-4/5 h-full bg-yellow-400 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-sm font-bold">85% sold</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Products Grid with Stock Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-4">
          {products.slice(0, 5).map((product) => (
            <HeroProductCard
              key={product.id}
              product={product}
              showQuickView={true}
              className="transform hover:-translate-y-1 transition-transform duration-200"
            />
          ))}
        </div>

        {/* View All Button - Mobile */}
        <div className="sm:hidden">
          <button
            onClick={handleViewAllSales}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
          >
            View All Flash Sales
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;