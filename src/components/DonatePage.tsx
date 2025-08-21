import React, { useState } from 'react';
import { ArrowLeft, MapPin, Users, CreditCard, Shield, CheckCircle, Heart, Star } from 'lucide-react';
import GoogleMap from './GoogleMap';
import CurrencySelector from './CurrencySelector';
import { AuthUser } from '../utils/auth';
import { formatCurrency } from '../utils/currency';

interface DonatePageProps {
  onBack: () => void;
  currentUser: AuthUser | null;
}

const DonatePage: React.FC<DonatePageProps> = ({ onBack, currentUser }) => {
  const [donationType, setDonationType] = useState('cash');
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currentUser?.preferred_currency || 'USD');
  const [monthlyDonation, setMonthlyDonation] = useState(false);

  const recipients = [
    {
      id: 1,
      name: 'Aisha Family',
      location: 'Gaza, Palestine',
      need: 'Emergency Food & Medicine',
      urgency: 'Critical',
      ngo: 'Palestine Relief Foundation',
      agent: 'Ahmed Hassan',
      verified: true,
      distance: '0.5 km',
      story: 'Family of 6 including 3 children under 10. Lost home in recent conflict, urgent need for basic necessities.',
      raised: 2800,
      goal: 5000,
      coordinates: { lat: 31.5017, lng: 34.4668 },
      image: 'https://images.pexels.com/photos/8471888/pexels-photo-8471888.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Maria & Children',
      location: 'Lagos, Nigeria',
      need: 'Education & Healthcare',
      urgency: 'High',
      ngo: 'African Hope Initiative',
      agent: 'Grace Okafor',
      verified: true,
      distance: '1.2 km',
      story: 'Single mother of 4, working hard to provide education for her children while struggling with medical expenses.',
      raised: 1200,
      goal: 3000,
      coordinates: { lat: 6.5244, lng: 3.3792 },
      image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      name: 'Omar\'s Community',
      location: 'Damascus, Syria',
      need: 'Winter Clothing & Shelter',
      urgency: 'Medium',
      ngo: 'Syrian Aid Network',
      agent: 'Fatima Al-Zahra',
      verified: true,
      distance: '2.1 km',
      story: 'Displaced community of 25 families needs warm clothing and shelter materials for upcoming winter.',
      raised: 4500,
      goal: 8000,
      coordinates: { lat: 33.5138, lng: 36.2765 },
      image: 'https://images.pexels.com/photos/6994314/pexels-photo-6994314.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const mapLocations = recipients.map(recipient => ({
    lat: recipient.coordinates.lat,
    lng: recipient.coordinates.lng,
    name: recipient.name,
    description: recipient.need,
    urgency: recipient.urgency.toLowerCase() as 'critical' | 'high' | 'medium'
  }));

  const handleDonate = () => {
    if (!selectedRecipient || !amount) {
      alert('Please select a recipient and amount');
      return;
    }
    setShowPayment(true);
  };

  const handlePayment = () => {
    const donationText = monthlyDonation ? 'monthly donation' : 'donation';
    alert(`${donationText} successful! You will receive tracking updates via email and SMS.`);
    setShowPayment(false);
    setAmount('');
    setSelectedRecipient(null);
    setMonthlyDonation(false);
  };

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
              <Heart className="w-6 h-6 text-purple-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">Donate to Combat Poverty</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map and Recipients */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donation Type Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Choose Donation Type</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setDonationType('cash')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    donationType === 'cash'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <CreditCard className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Cash Donation</div>
                </button>
                <button
                  onClick={() => setDonationType('clothes')}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    donationType === 'clothes'
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <div className="font-semibold">Clothes & Items</div>
                </button>
              </div>
            </div>

            {/* Interactive Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Nearby Recipients</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-1" />
                  Live location tracking
                </div>
              </div>
              <GoogleMap locations={mapLocations} height="300px" />
            </div>

            {/* Recipients List */}
            <div className="space-y-4">
              {recipients.map((recipient) => (
                <div
                  key={recipient.id}
                  onClick={() => setSelectedRecipient(recipient)}
                  className={`bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedRecipient?.id === recipient.id
                      ? 'border-2 border-purple-500 bg-purple-50'
                      : 'border-2 border-transparent hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <img 
                      src={recipient.image} 
                      alt={recipient.name}
                      className="w-20 h-20 rounded-xl object-cover mr-4"
                    />
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div>
                        <h3 className="font-bold text-gray-900 flex items-center">
                          {recipient.name}
                          {recipient.verified && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                          )}
                        </h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {recipient.location} • {recipient.distance}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        recipient.urgency === 'Critical'
                          ? 'bg-red-100 text-red-700'
                          : recipient.urgency === 'High'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {recipient.urgency}
                      </span>
                    </div>
                  </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">{recipient.story}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Need</p>
                      <p className="font-semibold text-gray-900">{recipient.need}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">NGO Partner</p>
                      <p className="font-semibold text-gray-900">{recipient.ngo}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Field Agent</p>
                      <p className="font-semibold text-gray-900 flex items-center">
                        {recipient.agent}
                        <Shield className="w-4 h-4 text-green-500 ml-1" />
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Progress</p>
                      <div className="flex items-center">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                            style={{ width: `${(recipient.raised / recipient.goal) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          ${recipient.raised}/${recipient.goal}
                        </span>
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Make a Donation</h2>

              {selectedRecipient ? (
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">Selected Recipient</h3>
                    <p className="text-purple-700">{selectedRecipient.name}</p>
                    <p className="text-sm text-purple-600">{selectedRecipient.location}</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Currency
                    </label>
                    <CurrencySelector 
                      value={selectedCurrency}
                      onChange={setSelectedCurrency}
                    />
                  </div>

                  {donationType === 'cash' ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Donation Amount
                      </label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={`Enter amount in ${selectedCurrency}`}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {[25, 50, 100].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setAmount(preset.toString())}
                            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
                          >
                            {formatCurrency(preset, selectedCurrency)}
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={monthlyDonation}
                            onChange={(e) => setMonthlyDonation(e.target.checked)}
                            className="mr-2 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-700">Make this a monthly donation</span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-gray-600 mb-4">
                        For clothing and item donations, our field agent will contact you to arrange pickup.
                      </p>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-900 mb-2">Most Needed Items:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• Winter clothing</li>
                          <li>• Children's clothes</li>
                          <li>• Blankets</li>
                          <li>• Basic toiletries</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleDonate}
                    disabled={donationType === 'cash' && !amount}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {donationType === 'cash' 
                      ? (monthlyDonation ? 'Start Monthly Donation' : 'Donate Now')
                      : 'Schedule Pickup'
                    }
                  </button>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Shield className="w-5 h-5 text-green-600 mr-2" />
                      <h4 className="font-medium text-green-900">Transparency Guarantee</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      You'll receive real-time updates with photos and location verification when your donation reaches the recipient.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Select a recipient to continue</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Secure Payment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4 my-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Donation Amount:</span>
                  <span className="font-bold text-purple-600">{formatCurrency(Number(amount), selectedCurrency)}</span>
                </div>
                {monthlyDonation && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Monthly recurring:</span>
                    <span className="text-sm text-purple-600">Yes</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Processing Fee:</span>
                  <span>{formatCurrency(0, selectedCurrency)}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Complete Donation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonatePage;