import React, { useState } from 'react';
import { Heart, Users, BookOpen, MapPin } from 'lucide-react';
import { signIn, signUp } from '../utils/auth';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    country: 'US'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { user, error } = await signIn(formData.email, formData.password);
        if (error) {
          setError(error);
        } else if (user) {
          onLogin();
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
        const { user, error } = await signUp(formData.email, formData.password, formData.name, formData.country);
        if (error) {
          setError(error);
        } else if (user) {
          onLogin();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-12 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 text-white">
          <div className="flex items-center mb-8">
            <Heart className="w-12 h-12 text-orange-400 mr-4" />
            <h1 className="text-4xl font-bold">HopeConnect</h1>
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Empowering Change,<br />
            <span className="text-orange-400">One Life at a Time</span>
          </h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Join our global community in the fight against poverty, hunger, and education gaps. 
            Together, we can create lasting change and build a better world for everyone.
          </p>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-orange-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Combat Poverty</h3>
                <p className="opacity-80">Connect donors with verified recipients</p>
              </div>
            </div>
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-orange-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Fight Hunger</h3>
                <p className="opacity-80">Feed communities in need worldwide</p>
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-orange-400 mr-4" />
              <div>
                <h3 className="text-lg font-semibold">Bridge Education Gaps</h3>
                <p className="opacity-80">Provide skills training and job opportunities</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-40 right-40 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-purple-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">HopeConnect</h2>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {isLogin ? 'Welcome Back' : 'Join Our Mission'}
              </h3>
              <p className="text-gray-500">
                {isLogin ? 'Sign in to continue making a difference' : 'Create account to start helping others'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}

              {!isLogin && (
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required={!isLogin}
                  >
                    <option value="US">United States</option>
                    <option value="IN">India</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="NG">Nigeria</option>
                    <option value="EG">Egypt</option>
                    <option value="ZA">South Africa</option>
                    <option value="KE">Kenya</option>
                    <option value="GH">Ghana</option>
                    <option value="PS">Palestine</option>
                    <option value="SY">Syria</option>
                    <option value="SO">Somalia</option>
                  </select>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Confirm your password"
                    required={!isLogin}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transform hover:scale-[1.02] transition-all duration-200"
              >
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200">
                  Forgot your password?
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;