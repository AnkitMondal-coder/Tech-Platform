import React, { useState } from 'react';
import { ArrowLeft, BarChart3, MapPin, TrendingUp, Users, Heart, BookOpen, DollarSign } from 'lucide-react';

interface AnalyticsProps {
  onBack: () => void;
}

const Analytics: React.FC<AnalyticsProps> = ({ onBack }) => {
  const [timeframe, setTimeframe] = useState('7days');

  const donationData = {
    '7days': {
      total: 125000,
      donations: 342,
      beneficiaries: 1847,
      regions: [
        { name: 'Palestine', amount: 45000, percentage: 36, color: 'bg-red-500' },
        { name: 'Nigeria', amount: 32000, percentage: 26, color: 'bg-green-500' },
        { name: 'Somalia', amount: 28000, percentage: 22, color: 'bg-blue-500' },
        { name: 'Syria', amount: 20000, percentage: 16, color: 'bg-purple-500' }
      ],
      daily: [
        { day: 'Mon', poverty: 15000, hunger: 12000, education: 8000 },
        { day: 'Tue', poverty: 18000, hunger: 15000, education: 9500 },
        { day: 'Wed', poverty: 22000, hunger: 18000, education: 11000 },
        { day: 'Thu', poverty: 17000, hunger: 14000, education: 8500 },
        { day: 'Fri', poverty: 25000, hunger: 20000, education: 12000 },
        { day: 'Sat', poverty: 19000, hunger: 16000, education: 10000 },
        { day: 'Sun', poverty: 21000, hunger: 17000, education: 10500 }
      ]
    }
  };

  const currentData = donationData[timeframe];

  const mapLocations = [
    { name: 'Gaza, Palestine', lat: 31.5, lng: 34.5, amount: 45000, urgency: 'critical' },
    { name: 'Lagos, Nigeria', lat: 6.5, lng: 3.4, amount: 32000, urgency: 'high' },
    { name: 'Mogadishu, Somalia', lat: 2.0, lng: 45.3, amount: 28000, urgency: 'critical' },
    { name: 'Damascus, Syria', lat: 33.5, lng: 36.3, amount: 20000, urgency: 'medium' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center">
              <BarChart3 className="w-6 h-6 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Impact Analytics</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Filter */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Global Impact Overview</h2>
            <p className="text-gray-600">Real-time analytics of donations and their impact across all programs</p>
          </div>
          <div className="flex space-x-2">
            {[
              { value: '7days', label: '7 Days' },
              { value: '30days', label: '30 Days' },
              { value: '90days', label: '90 Days' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeframe(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  timeframe === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Donations</p>
                <p className="text-2xl font-bold text-gray-900">${currentData.total.toLocaleString()}</p>
                <p className="text-green-600 text-sm font-medium mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +23% from last week
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Active Donations</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.donations}</p>
                <p className="text-purple-600 text-sm font-medium mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +15% increase
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">People Helped</p>
                <p className="text-2xl font-bold text-gray-900">{currentData.beneficiaries.toLocaleString()}</p>
                <p className="text-orange-600 text-sm font-medium mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +31% this week
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">98.7%</p>
                <p className="text-blue-600 text-sm font-medium mt-1 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Verification rate
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Map */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-6 h-6 text-blue-600 mr-2" />
              Global Impact Map
            </h3>
            
            <div className="h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl relative overflow-hidden">
              {/* World map background pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 400 200">
                  <path
                    d="M50,50 L100,40 L150,60 L200,45 L250,55 L300,50 L350,45"
                    stroke="#6B7280"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M30,80 L80,85 L130,90 L180,85 L230,88 L280,85 L330,80"
                    stroke="#6B7280"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M60,120 L110,115 L160,125 L210,120 L260,118 L310,120 L360,115"
                    stroke="#6B7280"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Location markers */}
              {mapLocations.map((location, index) => (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${25 + index * 15}%`,
                    top: `${30 + (index % 2) * 30}%`
                  }}
                >
                  <div className={`w-6 h-6 rounded-full animate-pulse ${
                    location.urgency === 'critical' ? 'bg-red-500' :
                    location.urgency === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}>
                    <div className={`w-6 h-6 rounded-full animate-ping ${
                      location.urgency === 'critical' ? 'bg-red-500' :
                      location.urgency === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 min-w-max z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="font-semibold text-xs text-gray-900">{location.name}</p>
                    <p className="text-xs text-gray-600">${location.amount.toLocaleString()}</p>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="font-medium text-gray-900 text-sm mb-2">Urgency Levels</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    Critical
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    High
                  </div>
                  <div className="flex items-center text-xs">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    Medium
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Regional Distribution</h3>
            
            <div className="space-y-4">
              {currentData.regions.map((region, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className={`w-4 h-4 ${region.color} rounded-full mr-3`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">{region.name}</span>
                        <span className="text-sm font-medium text-gray-600">
                          ${region.amount.toLocaleString()} ({region.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 ${region.color} rounded-full transition-all duration-500`}
                          style={{ width: `${region.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Impact by Category</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">$68K</div>
                  <div className="text-xs text-gray-600">Poverty Relief</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">$42K</div>
                  <div className="text-xs text-gray-600">Hunger Relief</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-gray-900">$15K</div>
                  <div className="text-xs text-gray-600">Education</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Trends Chart */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Daily Donation Trends</h3>
          
          <div className="h-64 flex items-end justify-between space-x-2">
            {currentData.daily.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full max-w-16 relative mb-4" style={{ height: '200px' }}>
                  <div className="absolute bottom-0 w-full flex flex-col">
                    <div
                      className="bg-purple-500 rounded-t-sm"
                      style={{ height: `${(day.poverty / 25000) * 100}px` }}
                      title={`Poverty: $${day.poverty}`}
                    ></div>
                    <div
                      className="bg-red-500"
                      style={{ height: `${(day.hunger / 25000) * 100}px` }}
                      title={`Hunger: $${day.hunger}`}
                    ></div>
                    <div
                      className="bg-blue-500 rounded-b-sm"
                      style={{ height: `${(day.education / 25000) * 100}px` }}
                      title={`Education: $${day.education}`}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-600">{day.day}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Poverty Relief</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Hunger Relief</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Education Support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;