import React, { useState } from 'react';
import { Search, Heart, Users, BookOpen, MapPin, ArrowRight, Mail, Phone, MessageCircle, BarChart3, LogOut, User } from 'lucide-react';
import QRCodeGenerator from './QRCodeGenerator';
import FeedbackSection from './FeedbackSection';
import { AuthUser } from '../utils/auth';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
  onLogout: () => void;
  currentUser: AuthUser | null;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSearch, onLogout, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle contact form submission
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', message: '' });
  };

  const services = [
    {
      icon: Users,
      title: 'Donate to Combat Poverty',
      description: 'Connect directly with verified recipients through our NGO network. Track your donations in real-time.',
      gradient: 'from-purple-500 to-pink-500',
      action: () => onNavigate('donate')
    },
    {
      icon: Heart,
      title: 'Feed Someone Today',
      description: 'Help fight hunger worldwide. Special focus on Palestine and African communities in need.',
      gradient: 'from-orange-500 to-red-500',
      action: () => onNavigate('feed')
    },
    {
      icon: BookOpen,
      title: 'Education & Skills',
      description: 'Provide educational resources and skill training to bridge the education gap.',
      gradient: 'from-blue-500 to-indigo-500',
      action: () => onNavigate('education')
    },
    {
      icon: MapPin,
      title: 'Find Part-Time Jobs',
      description: 'Connect skilled individuals with part-time job opportunities from partner companies.',
      gradient: 'from-green-500 to-teal-500',
      action: () => onNavigate('jobs')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                HopeConnect
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Home
              </button>
              <button
                onClick={() => onNavigate('analytics')}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors flex items-center"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Analytics
              </button>
              {currentUser && (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-700">
                    <User className="w-4 h-4 mr-1" />
                    <span className="font-medium">{currentUser.name}</span>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center text-gray-700 hover:text-red-600 font-medium transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-600/10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Transform Lives Through
            <span className="block bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Collective Action
            </span>
          </h2>
          
          {/* Hero Images */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/8471888/pexels-photo-8471888.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Children in need of education"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium">Education</div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Families needing food assistance"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium">Hunger Relief</div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/6994314/pexels-photo-6994314.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Communities in poverty"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium">Poverty Relief</div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/6646943/pexels-photo-6646943.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="Children needing support"
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium">Child Support</div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our global platform connecting donors, volunteers, and communities to fight poverty, hunger, and education gaps together.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for education, jobs, donate, feed someone..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-200 pr-14"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-500 mb-2">$2.5M</div>
              <div className="text-gray-600">Total Donations</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-500 mb-2">100K+</div>
              <div className="text-gray-600">Meals Provided</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-500 mb-2">25K+</div>
              <div className="text-gray-600">Students Educated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">How We're Making a Difference</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides multiple ways to create meaningful impact in communities worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                  onClick={service.action}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h4>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                    Get Started <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">About Our Mission</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                HopeConnect is more than just a platform—it's a movement. We believe that by connecting hearts and resources, 
                we can create sustainable solutions to the world's most pressing challenges.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Transparency First</h4>
                    <p className="text-gray-600">Every donation is tracked and verified through our NGO partners</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Global Impact</h4>
                    <p className="text-gray-600">Special focus on crisis areas like Palestine and African communities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sustainable Solutions</h4>
                    <p className="text-gray-600">Education and job programs create long-term positive change</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-8 text-white">
                <h4 className="text-2xl font-bold mb-6">Our Impact This Week</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Families Helped</span>
                    <span className="font-bold text-orange-300">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Meals Provided</span>
                    <span className="font-bold text-orange-300">8,932</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Students Enrolled</span>
                    <span className="font-bold text-orange-300">456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Jobs Connected</span>
                    <span className="font-bold text-orange-300">123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-gray-900 mb-6">Access Anywhere</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Scan the QR code to instantly access HopeConnect on your mobile device. 
                Our platform is optimized for all devices and can be installed as a Progressive Web App.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Mobile Optimized</h4>
                    <p className="text-gray-600">Perfect experience on any device</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Offline Access</h4>
                    <p className="text-gray-600">Works even without internet connection</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Install as App</h4>
                    <p className="text-gray-600">Add to home screen for quick access</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <QRCodeGenerator size={250} />
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <FeedbackSection />

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h3>
            <p className="text-xl text-gray-600">
              Have questions or want to partner with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-300 transform hover:scale-[1.02] transition-all duration-200"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-purple-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                  <p className="text-gray-600">contact@hopeconnect.org</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-purple-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MessageCircle className="w-6 h-6 text-purple-600 mt-1 mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Live Chat</h4>
                  <p className="text-gray-600">Available 24/7 for urgent matters</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Heart className="w-8 h-8 text-orange-400 mr-3" />
            <h2 className="text-2xl font-bold">HopeConnect</h2>
          </div>
          <p className="text-gray-400 mb-6">
            Together, we can build a world without poverty, hunger, or educational barriers.
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500">© 2025 HopeConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;