import React, { useState } from 'react';
import { ArrowLeft, Heart, MapPin, CreditCard, Utensils, Flag, Star } from 'lucide-react';

interface FeedPageProps {
  onBack: () => void;
}

const FeedPage: React.FC<FeedPageProps> = ({ onBack }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    {
      id: 1,
      title: 'Emergency Food Relief for Gaza',
      location: 'Gaza, Palestine',
      urgency: 'Critical',
      description: 'Families in Gaza are facing severe food shortages. Your donation provides emergency food packages including rice, lentils, cooking oil, and other essentials.',
      beneficiaries: 2500,
      mealsProvided: 18750,
      goal: 50000,
      raised: 32500,
      mealCost: 2.5,
      ngo: 'Palestine Emergency Relief',
      agent: 'Dr. Khalid Mansour',
      //image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=500',
      image : '/donate4.jpg',
      region: 'palestine',
      verified: true,
      urgent: true
    },
    {
      id: 2,
      title: 'School Feeding Program - Lagos',
      location: 'Lagos, Nigeria',
      urgency: 'High',
      description: 'Provide nutritious meals for children in underserved schools. Each meal includes protein, vegetables, and essential nutrients for healthy growth.',
      beneficiaries: 1800,
      mealsProvided: 12600,
      goal: 25000,
      raised: 16800,
      mealCost: 1.8,
      ngo: 'African Children\'s Foundation',
      agent: 'Grace Adebayo',
      //image: 'https://images.pexels.com/photos/8471888/pexels-photo-8471888.jpeg?auto=compress&cs=tinysrgb&w=500',
      image: '/donate5.webp',
      region: 'africa',
      verified: true,
      urgent: false
    },
    {
      id: 3,
      title: 'Drought Relief - Somalia',
      location: 'Mogadishu, Somalia',
      urgency: 'Critical',
      description: 'Severe drought has left thousands without access to food. Emergency food assistance including water purification tablets and dried foods.',
      beneficiaries: 3200,
      mealsProvided: 22400,
      goal: 75000,
      raised: 45000,
      mealCost: 2.2,
      ngo: 'Horn of Africa Relief',
      agent: 'Ahmed Hassan',
      //image: 'https://images.pexels.com/photos/6994314/pexels-photo-6994314.jpeg?auto=compress&cs=tinysrgb&w=500',
      image: '/donate6.png',
      region: 'africa',
      verified: true,
      urgent: true
    },
    {
      id: 4,
      title: 'Winter Food Support - Syria',
      location: 'Damascus, Syria',
      urgency: 'Medium',
      description: 'Displaced families need warm meals and food supplies for the winter months. Hot meals and food packages for families in temporary shelters.',
      beneficiaries: 1500,
      mealsProvided: 9000,
      goal: 30000,
      raised: 18500,
      mealCost: 3.0,
      ngo: 'Syrian Humanitarian Aid',
      agent: 'Fatima Al-Zahra',
      //image: 'https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=500',
      image: '/donate7.jpg',
      region: 'middle-east',
      verified: true,
      urgent: false
    }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'palestine', label: 'Palestine' },
    { value: 'africa', label: 'Africa' },
    { value: 'middle-east', label: 'Middle East' }
  ];

  const filteredCampaigns = campaigns.filter(campaign => 
    selectedRegion === 'all' || campaign.region === selectedRegion
  );

  const handleDonate = () => {
    if (!selectedCampaign || !donationAmount) {
      alert('Please select a campaign and donation amount');
      return;
    }
    
    const meals = Math.floor(Number(donationAmount) / selectedCampaign.mealCost);
    alert(`Thank you! Your $${donationAmount} donation will provide ${meals} meals to families in need. You'll receive tracking updates via email.`);
    
    setDonationAmount('');
    setSelectedCampaign(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
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
              <Heart className="w-6 h-6 text-red-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Feed Someone Today</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Campaigns List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Fight Hunger Worldwide
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
                Every donation provides immediate food relief to families in crisis. 
                Track your impact in real-time with verified delivery confirmations.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-red-600 mb-1">127K+</div>
                  <div className="text-sm text-gray-600">Meals Provided</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-orange-500 mb-1">8.2K</div>
                  <div className="text-sm text-gray-600">Families Fed</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-green-500 mb-1">15</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="text-2xl font-bold text-blue-500 mb-1">100%</div>
                  <div className="text-sm text-gray-600">Verified</div>
                </div>
              </div>
            </div>

            {/* Region Filter */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Region</h3>
              <div className="flex flex-wrap gap-3">
                {regions.map((region) => (
                  <button
                    key={region.value}
                    onClick={() => setSelectedRegion(region.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedRegion === region.value
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {region.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Campaigns */}
            <div className="space-y-6">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedCampaign?.id === campaign.id
                      ? 'border-2 border-red-500 bg-red-50'
                      : 'border-2 border-transparent hover:border-red-200'
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          campaign.urgency === 'Critical'
                            ? 'bg-red-100 text-red-700'
                            : campaign.urgency === 'High'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {campaign.urgency}
                        </span>
                      </div>
                      {campaign.region === 'palestine' && (
                        <div className="absolute top-4 right-4">
                          <Flag className="w-6 h-6 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          {campaign.title}
                          {campaign.verified && (
                            <span className="ml-2 text-green-600 text-sm">✓</span>
                          )}
                        </h3>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">
                            ${campaign.mealCost}/meal
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-1" />
                        {campaign.location} • {campaign.ngo}
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {campaign.description}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-500">Beneficiaries</div>
                          <div className="font-semibold text-gray-900">{campaign.beneficiaries.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Meals Provided</div>
                          <div className="font-semibold text-gray-900">{campaign.mealsProvided.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Field Agent</div>
                          <div className="font-semibold text-gray-900">{campaign.agent}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>${campaign.raised.toLocaleString()} of ${campaign.goal.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                            style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Donation Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Make a Donation</h3>

              {selectedCampaign ? (
                <div className="space-y-6">
                  <div className="bg-red-50 rounded-xl p-4">
                    <h4 className="font-semibold text-red-900 mb-2">Selected Campaign</h4>
                    <p className="text-red-700 font-medium">{selectedCampaign.title}</p>
                    <p className="text-sm text-red-600">{selectedCampaign.location}</p>
                    <p className="text-xs text-red-600 mt-2">
                      ${selectedCampaign.mealCost} provides 1 meal
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount ($)
                    </label>
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                    
                    {donationAmount && (
                      <p className="text-sm text-gray-600 mt-2">
                        This will provide <strong>{Math.floor(Number(donationAmount) / selectedCampaign.mealCost)}</strong> meals
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {[10, 25, 50].map((amount) => {
                      const meals = Math.floor(amount / selectedCampaign.mealCost);
                      return (
                        <button
                          key={amount}
                          onClick={() => setDonationAmount(amount.toString())}
                          className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-center"
                        >
                          <div className="font-medium">${amount}</div>
                          <div className="text-xs text-gray-500">{meals} meals</div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleDonate}
                    disabled={!donationAmount}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 focus:ring-4 focus:ring-red-300 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Heart className="w-5 h-5 inline mr-2" />
                    Feed Families Now
                  </button>

                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2 flex items-center">
                      <Star className="w-5 h-5 text-green-600 mr-2" />
                      Impact Guarantee
                    </h4>
                    <p className="text-sm text-green-700">
                      Receive photo and GPS verification when your meals reach families. 100% transparency guaranteed.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Utensils className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Select a campaign to start feeding families</p>
                  <div className="text-sm text-gray-400">
                    Every donation provides immediate food relief with real-time tracking
                  </div>
                </div>
              )}

              {/* Recent Activity */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Recent Donations</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Sarah donated $25 • 12 meals</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Ahmed donated $50 • 20 meals</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-600">Maria donated $15 • 8 meals</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;