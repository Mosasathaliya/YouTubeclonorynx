import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Default Mock Data
const defaultMockVideos = [
  {
    id: 'default_1',
    title: 'Welcome to Orynx AI Labs - Revolutionary AI Technology',
    thumbnail: 'https://customer-assets.emergentagent.com/job_tubedup-8/artifacts/jg7im862_2c195611-aa8c-44cb-b6b4-368711a32fc0.png',
    channel: 'Orynx AI Labs',
    channelAvatar: 'https://customer-assets.emergentagent.com/job_tubedup-8/artifacts/jg7im862_2c195611-aa8c-44cb-b6b4-368711a32fc0.png',
    views: '15K',
    timestamp: '1 day ago',
    duration: '8:45',
    category: 'Technology',
    youtubeId: 'dQw4w9WgXcQ',
    isDefault: true
  },
  {
    id: 'default_2',
    title: 'AI Innovation Summit 2025 - Future of Technology',
    thumbnail: 'https://images.unsplash.com/photo-1526915303387-35900bc4ff33',
    channel: 'Orynx Research',
    channelAvatar: 'https://customer-assets.emergentagent.com/job_tubedup-8/artifacts/jg7im862_2c195611-aa8c-44cb-b6b4-368711a32fc0.png',
    views: '32K',
    timestamp: '3 days ago',
    duration: '15:30',
    category: 'Technology',
    youtubeId: 'dQw4w9WgXcQ',
    isDefault: true
  }
];

// Utility function to extract YouTube video ID from URL
const extractYouTubeId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Mobile-First Header Component
export const Header = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  searchQuery, 
  setSearchQuery, 
  isAdmin, 
  onAdminLogin, 
  onAdminLogout,
  isMobile 
}) => {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      if (isMobile) setShowSearch(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 h-14">
        <div className="flex items-center justify-between px-3 h-full">
          {/* Left section */}
          <div className="flex items-center space-x-2">
            {!isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-2 py-1">
              <img 
                src="https://customer-assets.emergentagent.com/job_tubedup-8/artifacts/jg7im862_2c195611-aa8c-44cb-b6b4-368711a32fc0.png" 
                alt="Orynx AI Labs" 
                className="w-7 h-7 object-contain"
              />
              <div className={isMobile ? 'hidden xs:block' : 'block'}>
                <div className="text-base font-bold text-blue-500 leading-none">ORYNX</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400 leading-none">AI LABS</div>
              </div>
            </Link>
          </div>

          {/* Center section - Search (Desktop) / Search Icon (Mobile) */}
          {isMobile ? (
            <button
              onClick={() => setShowSearch(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          ) : (
            <div className="flex-1 max-w-xl mx-6">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search videos..."
                  className="flex-1 px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-gray-50 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-1">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}
            
            {isAdmin ? (
              <div className="flex items-center space-x-1">
                <Link 
                  to="/admin"
                  className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-full transition-colors"
                >
                  {isMobile ? 'A' : 'Admin'}
                </Link>
                <button
                  onClick={onAdminLogout}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={onAdminLogin}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-xs rounded-full transition-colors"
              >
                {isMobile ? 'A' : 'Admin'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isMobile && showSearch && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 pt-14">
          <div className="p-4">
            <form onSubmit={handleSearch} className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                autoFocus
              />
              <button
                type="submit"
                className="p-3 bg-blue-500 text-white rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

// Mobile-Optimized Sidebar Component
export const Sidebar = ({ sidebarOpen, setSidebarOpen, isMobile }) => {
  const menuItems = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true, path: '/' },
    { name: 'Trending', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', path: '/' },
    { name: 'Subscriptions', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', path: '/' },
    { name: 'Library', icon: 'M19 11H5m14-7H5m14 14H5', path: '/' },
    { name: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', path: '/' },
    { name: 'Your videos', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', path: '/' }
  ];

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById('mobile-sidebar');
        const trigger = document.querySelector('[data-sidebar-trigger]');
        if (sidebar && !sidebar.contains(event.target) && !trigger?.contains(event.target)) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarOpen, setSidebarOpen, isMobile]);

  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Mobile Sidebar */}
        <aside 
          id="mobile-sidebar"
          className={`fixed left-0 top-14 bottom-0 w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-50 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="p-3 h-full overflow-y-auto">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center space-x-4 px-3 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-1 transition-colors ${
                  item.active ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
            
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Quick Access</h3>
              <div className="space-y-2">
                <Link to="/" className="flex items-center space-x-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">O</span>
                  </div>
                  <span className="text-sm">Orynx AI Labs</span>
                </Link>
              </div>
            </div>
          </nav>
        </aside>
      </>
    );
  }

  // Desktop Sidebar
  return (
    <aside className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      <nav className="p-2 h-full overflow-y-auto">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-1 transition-colors ${
              item.active ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

// Mobile-Optimized Video Card Component
const VideoCard = ({ video, isMobile }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group block">
      <div className={`space-y-2 ${isMobile ? 'pb-4' : 'pb-0'}`}>
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover rounded-lg group-hover:rounded-md transition-all duration-200"
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded font-medium">
            {video.duration}
          </span>
        </div>
        <div className="flex space-x-3">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-9 h-9 rounded-full flex-shrink-0 object-cover"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold leading-5 line-clamp-2 group-hover:text-blue-600 transition-colors ${
              isMobile ? 'text-sm' : 'text-sm'
            }`}>
              {video.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{video.channel}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {video.views} views • {video.timestamp}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Mobile-First Home Page Component
export const HomePage = ({ searchQuery, videos = [], isMobile }) => {
  const allVideos = [...defaultMockVideos, ...videos];
  const [filteredVideos, setFilteredVideos] = useState(allVideos);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let filtered = allVideos;
    
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(video => video.category === selectedCategory);
    }
    
    setFilteredVideos(filtered);
  }, [searchQuery, videos, selectedCategory]);

  const categories = ['All', 'Technology', 'Gaming', 'Music', 'Education', 'Cooking', 'Travel', 'Entertainment'];

  return (
    <div className={`${isMobile ? 'p-3' : 'p-6'}`}>
      {/* Category Pills */}
      <div className={`flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide ${isMobile ? 'px-1' : ''}`}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 touch-manipulation ${
              selectedCategory === category
                ? 'bg-blue-500 text-white dark:bg-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className={`grid gap-4 ${
        isMobile 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} isMobile={isMobile} />
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No videos found</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search term or category</p>
        </div>
      )}
    </div>
  );
};

// Mobile-Optimized YouTube Player Component
const YouTubePlayer = ({ videoId, title, isMobile }) => {
  if (!videoId) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center rounded-lg overflow-hidden">
        <div className="text-center text-white">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z"/>
          </svg>
          <p>Video not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`aspect-video ${isMobile ? 'rounded-lg' : 'rounded-xl'} overflow-hidden`}>
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

// Mobile-First Video Page Component
export const VideoPage = ({ videos = [], isMobile }) => {
  const { videoId } = useParams();
  const allVideos = [...defaultMockVideos, ...videos];
  const video = allVideos.find(v => v.id === videoId) || allVideos[0];
  const relatedVideos = allVideos.filter(v => v.id !== videoId).slice(0, isMobile ? 6 : 8);

  return (
    <div className={`${isMobile ? 'flex flex-col' : 'flex flex-col xl:flex-row'} ${isMobile ? 'p-0' : 'p-6'} ${isMobile ? 'space-y-4' : 'space-y-6 xl:space-y-0 xl:space-x-6'}`}>
      {/* Main Video Section */}
      <div className="flex-1">
        {/* Video Player */}
        <div className={isMobile ? 'mb-3' : 'mb-4'}>
          <YouTubePlayer videoId={video.youtubeId} title={video.title} isMobile={isMobile} />
        </div>

        {/* Video Info */}
        <div className={`space-y-3 ${isMobile ? 'px-3' : ''}`}>
          <h1 className={`font-semibold leading-tight ${isMobile ? 'text-base' : 'text-xl'}`}>
            {video.title}
          </h1>
          
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0'}`}>
            <div className="flex items-center space-x-3">
              <img 
                src={video.channelAvatar} 
                alt={video.channel} 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{video.channel}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">1.2M subscribers</p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm touch-manipulation">
                Subscribe
              </button>
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full flex-shrink-0">
                <button className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-full transition-colors touch-manipulation">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-3M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span className="text-sm">125K</span>
                </button>
                <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
                <button className="px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-full transition-colors touch-manipulation">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
                  </svg>
                </button>
              </div>
              
              <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 rounded-full transition-colors flex-shrink-0 touch-manipulation">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <p className="text-sm font-semibold">
              {video.views} views • {video.timestamp}
            </p>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to Orynx AI Labs! Discover the future of artificial intelligence and cutting-edge technology. 
              Subscribe for more content about AI innovation, machine learning breakthroughs, and tech insights.
            </p>
          </div>

          {/* Comments Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <p className="font-semibold">1,234 Comments</p>
              <button className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span>Sort by</span>
              </button>
            </div>
            
            {/* Comment Input */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                A
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full pb-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Videos */}
      <div className={`${isMobile ? 'px-3' : 'w-full xl:w-96'} space-y-3`}>
        <h3 className="font-semibold">Up next</h3>
        {relatedVideos.map((relatedVideo) => (
          <Link
            key={relatedVideo.id}
            to={`/watch/${relatedVideo.id}`}
            className="flex space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors touch-manipulation"
          >
            <div className="relative flex-shrink-0">
              <img
                src={relatedVideo.thumbnail}
                alt={relatedVideo.title}
                className={`${isMobile ? 'w-32' : 'w-40'} aspect-video object-cover rounded-lg`}
                loading="lazy"
              />
              <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded text-[10px]">
                {relatedVideo.duration}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm leading-5 line-clamp-2 mb-1">
                {relatedVideo.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-xs">{relatedVideo.channel}</p>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                {relatedVideo.views} views • {relatedVideo.timestamp}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

// Mobile-Optimized Admin Login Component
export const AdminLogin = ({ onLogin, onClose, isModal = false, isMobile }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(code)) {
      setCode('');
      setError('');
      if (onClose) onClose();
    } else {
      setError('Invalid admin code');
    }
  };

  const content = (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 w-full ${isMobile ? 'max-w-sm mx-4' : 'max-w-md'}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Admin Code</label>
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError('');
            }}
            placeholder="Enter admin code"
            className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white touch-manipulation"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <div className={`flex ${isMobile ? 'flex-col space-y-2' : 'space-x-3'}`}>
          <button
            type="submit"
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition-colors touch-manipulation"
          >
            Login
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg transition-colors touch-manipulation"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {content}
    </div>
  );
};

// Mobile-Optimized Admin Dashboard Component
export const AdminDashboard = ({ videos, onAddVideo, onDeleteVideo, isMobile }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    youtubeUrl: '',
    channel: 'Orynx AI Labs',
    category: 'Technology'
  });

  const handleAddVideo = (e) => {
    e.preventDefault();
    const youtubeId = extractYouTubeId(formData.youtubeUrl);
    
    if (!youtubeId) {
      alert('Please enter a valid YouTube URL');
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      title: formData.title,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      channel: formData.channel,
      channelAvatar: 'https://customer-assets.emergentagent.com/job_tubedup-8/artifacts/jg7im862_2c195611-aa8c-44cb-b6b4-368711a32fc0.png',
      views: '0',
      timestamp: 'Just now',
      duration: '0:00',
      category: formData.category,
      youtubeId: youtubeId,
      youtubeUrl: formData.youtubeUrl
    };

    onAddVideo(newVideo);
    setFormData({ title: '', youtubeUrl: '', channel: 'Orynx AI Labs', category: 'Technology' });
    setShowAddForm(false);
  };

  return (
    <div className={isMobile ? 'p-3' : 'p-6'}>
      <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col sm:flex-row sm:items-center sm:justify-between'} mb-6`}>
        <h1 className={`font-bold ${isMobile ? 'text-xl' : 'text-2xl'}`}>Admin Dashboard</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors touch-manipulation"
        >
          {showAddForm ? 'Cancel' : 'Add Video'}
        </button>
      </div>

      {/* Add Video Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className={`font-semibold mb-4 ${isMobile ? 'text-lg' : 'text-xl'}`}>Add New Video</h2>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 gap-4'}`}>
              <div>
                <label className="block text-sm font-medium mb-2">Video Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter video title"
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white touch-manipulation"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">YouTube URL</label>
                <input
                  type="url"
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white touch-manipulation"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Channel Name</label>
                <input
                  type="text"
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white touch-manipulation"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:text-white touch-manipulation"
                >
                  <option value="Technology">Technology</option>
                  <option value="Education">Education</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Gaming">Gaming</option>
                  <option value="Music">Music</option>
                  <option value="Cooking">Cooking</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors touch-manipulation"
            >
              Add Video
            </button>
          </form>
        </div>
      )}

      {/* Videos List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-gray-200 dark:border-gray-700`}>
          <h2 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'}`}>
            Manage Videos ({videos.length})
          </h2>
        </div>
        {videos.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p>No videos added yet</p>
            <p className="text-sm mt-1">Add your first video above</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {videos.map((video) => (
              <div key={video.id} className={`${isMobile ? 'p-4' : 'p-6'} ${isMobile ? 'space-y-3' : 'flex items-center space-x-4'}`}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className={`${isMobile ? 'w-full' : 'w-32'} aspect-video object-cover rounded-lg flex-shrink-0`}
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold line-clamp-2 mb-2 ${isMobile ? 'text-base' : 'text-lg'}`}>
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Channel: {video.channel}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Category: {video.category}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Added: {video.timestamp}</p>
                </div>
                <div className={`flex ${isMobile ? 'space-x-2 w-full' : 'space-x-2'} flex-shrink-0`}>
                  <Link
                    to={`/watch/${video.id}`}
                    className={`bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors touch-manipulation ${isMobile ? 'flex-1 text-center' : ''}`}
                  >
                    View
                  </Link>
                  <button
                    onClick={() => onDeleteVideo(video.id)}
                    className={`bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm transition-colors touch-manipulation ${isMobile ? 'flex-1' : ''}`}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};