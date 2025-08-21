import React from 'react';
import { Search, ArrowLeft, Users, Heart, BookOpen, MapPin } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onNavigate, onBack }) => {
  const getSearchResults = (query: string) => {
    const results = [];
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('donate') || lowerQuery.includes('poverty') || lowerQuery.includes('money') || lowerQuery.includes('cash') || lowerQuery.includes('clothes')) {
      results.push({
        type: 'donate',
        title: 'Donate to Combat Poverty',
        description: 'Help families in need with direct donations tracked through our verified NGO network',
        icon: Users,
        gradient: 'from-purple-500 to-pink-500',
        action: () => onNavigate('donate')
      });
    }

    if (lowerQuery.includes('feed') || lowerQuery.includes('hunger') || lowerQuery.includes('food') || lowerQuery.includes('meal') || lowerQuery.includes('palestine') || lowerQuery.includes('africa')) {
      results.push({
        type: 'feed',
        title: 'Feed Someone Today',
        description: 'Provide meals to hungry families worldwide, with special focus on Palestine and Africa',
        icon: Heart,
        gradient: 'from-orange-500 to-red-500',
        action: () => onNavigate('feed')
      });
    }

    if (lowerQuery.includes('education') || lowerQuery.includes('learn') || lowerQuery.includes('skill') || lowerQuery.includes('course') || lowerQuery.includes('study')) {
      results.push({
        type: 'education',
        title: 'Education & Skills Training',
        description: 'Access free courses and skill development programs to bridge the education gap',
        icon: BookOpen,
        gradient: 'from-blue-500 to-indigo-500',
        action: () => onNavigate('education')
      });
    }

    if (lowerQuery.includes('job') || lowerQuery.includes('work') || lowerQuery.includes('employment') || lowerQuery.includes('part time') || lowerQuery.includes('career')) {
      results.push({
        type: 'jobs',
        title: 'Part-Time Job Opportunities',
        description: 'Find verified part-time jobs from our partner companies',
        icon: MapPin,
        gradient: 'from-green-500 to-teal-500',
        action: () => onNavigate('jobs')
      });
    }

    // If no specific matches, show all results
    if (results.length === 0) {
      return [
        {
          type: 'donate',
          title: 'Donate to Combat Poverty',
          description: 'Help families in need with direct donations tracked through our verified NGO network',
          icon: Users,
          gradient: 'from-purple-500 to-pink-500',
          action: () => onNavigate('donate')
        },
        {
          type: 'feed',
          title: 'Feed Someone Today',
          description: 'Provide meals to hungry families worldwide, with special focus on Palestine and Africa',
          icon: Heart,
          gradient: 'from-orange-500 to-red-500',
          action: () => onNavigate('feed')
        },
        {
          type: 'education',
          title: 'Education & Skills Training',
          description: 'Access free courses and skill development programs to bridge the education gap',
          icon: BookOpen,
          gradient: 'from-blue-500 to-indigo-500',
          action: () => onNavigate('education')
        },
        {
          type: 'jobs',
          title: 'Part-Time Job Opportunities',
          description: 'Find verified part-time jobs from our partner companies',
          icon: MapPin,
          gradient: 'from-green-500 to-teal-500',
          action: () => onNavigate('jobs')
        }
      ];
    }

    return results;
  };

  const results = getSearchResults(query);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center flex-1">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <span className="text-lg text-gray-900">Results for "{query}"</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Found {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <div
                key={index}
                onClick={result.action}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group border-2 border-transparent hover:border-purple-200"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${result.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {result.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {result.description}
                </p>
                <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-8">
              Try searching for "donate", "feed", "education", or "jobs"
            </p>
            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Go Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;