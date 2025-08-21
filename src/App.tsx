import React, { useState } from 'react';
import { useEffect } from 'react';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SearchResults from './components/SearchResults';
import DonatePage from './components/DonatePage';
import EducationPage from './components/EducationPage';
import JobsPage from './components/JobsPage';
import FeedPage from './components/FeedPage';
import Analytics from './components/Analytics';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { getCurrentUser, signOut } from './utils/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }

    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
      setCurrentPage('home');
    }
  }, []);

  const handleLogin = () => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    signOut();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setCurrentPage('login');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage('search');
  };

  const renderCurrentPage = () => {
    if (!isLoggedIn && currentPage !== 'login') {
      return <LoginPage onLogin={handleLogin} />;
    }

    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'home':
        return <HomePage onNavigate={setCurrentPage} onSearch={handleSearch} onLogout={handleLogout} currentUser={currentUser} />;
      case 'search':
        return <SearchResults query={searchQuery} onNavigate={setCurrentPage} onBack={() => setCurrentPage('home')} />;
      case 'donate':
        return <DonatePage onBack={() => setCurrentPage('home')} currentUser={currentUser} />;
      case 'education':
        return <EducationPage onBack={() => setCurrentPage('home')} currentUser={currentUser} />;
      case 'jobs':
        return <JobsPage onBack={() => setCurrentPage('home')} currentUser={currentUser} />;
      case 'feed':
        return <FeedPage onBack={() => setCurrentPage('home')} currentUser={currentUser} />;
      case 'analytics':
        return <Analytics onBack={() => setCurrentPage('home')} />;
      default:
        return <HomePage onNavigate={setCurrentPage} onSearch={handleSearch} onLogout={handleLogout} currentUser={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {renderCurrentPage()}
      <PWAInstallPrompt />
    </div>
  );
}

export default App;