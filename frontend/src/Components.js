import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

// Mock Data
const mockVideos = [
  {
    id: '1',
    title: 'Ultimate Gaming Setup Tour 2025 - RTX 4090 Build!',
    thumbnail: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e',
    channel: 'TechGamers Pro',
    channelAvatar: 'https://images.unsplash.com/photo-1504370164829-8c6ef0c41d06?w=50',
    views: '2.1M',
    timestamp: '3 days ago',
    duration: '12:45',
    category: 'Gaming'
  },
  {
    id: '2',
    title: 'How to Code React Apps Like a Pro - Complete 2025 Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1526915303387-35900bc4ff33',
    channel: 'CodeMaster Academy',
    channelAvatar: 'https://images.unsplash.com/photo-1585236880726-8cac6ac0e1b3?w=50',
    views: '856K',
    timestamp: '1 week ago',
    duration: '45:32',
    category: 'Education'
  },
  {
    id: '3',
    title: 'EPIC Cooking Challenge - 5 Minute Gourmet Meals!',
    thumbnail: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98',
    channel: 'Kitchen Masters',
    channelAvatar: 'https://images.unsplash.com/photo-1514986888952-8cd320577b68?w=50',
    views: '1.5M',
    timestamp: '2 days ago',
    duration: '18:23',
    category: 'Cooking'
  },
  {
    id: '4',
    title: 'Amazing Travel Destinations You MUST Visit in 2025',
    thumbnail: 'https://images.unsplash.com/photo-1500835556837-99ac94a94552',
    channel: 'Wanderlust Adventures',
    channelAvatar: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=50',
    views: '789K',
    timestamp: '5 days ago',
    duration: '22:15',
    category: 'Travel'
  },
  {
    id: '5',
    title: 'DJ Mix 2025 - Best Electronic Dance Music',
    thumbnail: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745',
    channel: 'ElectroBeats Official',
    channelAvatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=50',
    views: '3.2M',
    timestamp: '1 day ago',
    duration: '1:15:30',
    category: 'Music'
  },
  {
    id: '6',
    title: 'Learn Python in 30 Minutes - Beginner Friendly',
    thumbnail: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6',
    channel: 'EduTech Central',
    channelAvatar: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=50',
    views: '2.8M',
    timestamp: '1 week ago',
    duration: '31:42',
    category: 'Education'
  },
  {
    id: '7',
    title: 'Mind-Blowing Gaming Highlights & Epic Fails',
    thumbnail: 'https://images.unsplash.com/photo-1593280359364-5242f1958068',
    channel: 'GameClips HD',
    channelAvatar: 'https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?w=50',
    views: '1.9M',
    timestamp: '4 days ago',
    duration: '15:28',
    category: 'Gaming'
  },
  {
    id: '8',
    title: 'Secret Cooking Tips from Professional Chefs',
    thumbnail: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f',
    channel: 'Chef\'s Corner',
    channelAvatar: 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=50',
    views: '645K',
    timestamp: '6 days ago',
    duration: '26:17',
    category: 'Cooking'
  },
  {
    id: '9',
    title: 'Road Trip Across Europe - Beautiful Landscapes',
    thumbnail: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
    channel: 'Euro Traveler',
    channelAvatar: 'https://images.pexels.com/photos/2245436/pexels-photo-2245436.png?w=50',
    views: '1.1M',
    timestamp: '3 days ago',
    duration: '38:45',
    category: 'Travel'
  },
  {
    id: '10',
    title: 'Latest Music Production Techniques & Tips',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    channel: 'Studio Pro',
    channelAvatar: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=50',
    views: '432K',
    timestamp: '1 week ago',
    duration: '19:52',
    category: 'Music'
  },
  {
    id: '11',
    title: 'Advanced Mobile App Development Tutorial',
    thumbnail: 'https://images.unsplash.com/photo-1585236880726-8cac6ac0e1b3',
    channel: 'Mobile Dev Pro',
    channelAvatar: 'https://images.unsplash.com/photo-1666890665956-ff34ea13c2cf?w=50',
    views: '928K',
    timestamp: '2 weeks ago',
    duration: '52:33',
    category: 'Education'
  },
  {
    id: '12',
    title: 'Colorful Abstract Art Creation Process',
    thumbnail: 'https://images.pexels.com/photos/1154723/pexels-photo-1154723.jpeg',
    channel: 'Creative Arts Studio',
    channelAvatar: 'https://images.pexels.com/photos/1996035/pexels-photo-1996035.jpeg?w=50',
    views: '567K',
    timestamp: '5 days ago',
    duration: '24:11',
    category: 'Art'
  }
];

// Header Component
export const Header = ({ sidebarOpen, setSidebarOpen, searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 h-14">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link to="/" className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a2.87 2.87 0 0 0-2.024-2.033C19.65 3.7 12 3.7 12 3.7s-7.65 0-9.474.453A2.87 2.87 0 0 0 .502 6.186C.05 8.02.05 12 .05 12s0 3.98.452 5.814a2.87 2.87 0 0 0 2.024 2.033C4.35 20.3 12 20.3 12 20.3s7.65 0 9.474-.453a2.87 2.87 0 0 0 2.024-2.033C23.95 15.98 23.95 12 23.95 12s0-3.98-.452-5.814z"/>
                <path d="m9.75 15.02 6.22-3.02L9.75 8.98v6.04z" fill="white"/>
              </svg>
            </div>
            <span className="text-xl font-semibold">YouTube</span>
          </Link>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-full focus:outline-none focus:border-blue-500 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-50 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5c-3.866 0-7 3.134-7 7v0c0-3.866-3.134-7-7-7H1m14-5v5" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ sidebarOpen }) => {
  const menuItems = [
    { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', active: true },
    { name: 'Shorts', icon: 'M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h3a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h3z' },
    { name: 'Subscriptions', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { name: 'Library', icon: 'M19 11H5m14-7H5m14 14H5' },
    { name: 'History', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Your videos', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z' },
    { name: 'Watch later', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Liked videos', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' }
  ];

  return (
    <aside className={`fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${
      sidebarOpen ? 'w-64' : 'w-16'
    }`}>
      <nav className="p-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to="/"
            className={`flex items-center space-x-6 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 mb-1 ${
              item.active ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
        
        {sidebarOpen && (
          <>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="px-3 py-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Subscriptions</h3>
              <div className="space-y-2">
                {mockVideos.slice(0, 5).map((video) => (
                  <div key={video.id} className="flex items-center space-x-3 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <img src={video.channelAvatar} alt={video.channel} className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{video.channel}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

// Video Card Component
const VideoCard = ({ video }) => {
  return (
    <Link to={`/watch/${video.id}`} className="group">
      <div className="space-y-3">
        <div className="relative">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full aspect-video object-cover rounded-xl group-hover:rounded-lg transition-all duration-200"
          />
          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </span>
        </div>
        <div className="flex space-x-3">
          <img
            src={video.channelAvatar}
            alt={video.channel}
            className="w-9 h-9 rounded-full flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-5 line-clamp-2 group-hover:text-blue-600 transition-colors">
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

// Home Page Component
export const HomePage = ({ searchQuery }) => {
  const [filteredVideos, setFilteredVideos] = useState(mockVideos);

  useEffect(() => {
    if (searchQuery) {
      const filtered = mockVideos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(mockVideos);
    }
  }, [searchQuery]);

  const categories = ['All', 'Gaming', 'Music', 'Education', 'Cooking', 'Travel', 'Tech', 'Entertainment'];

  return (
    <div className="p-6">
      {/* Category Pills */}
      <div className="flex space-x-3 mb-6 overflow-x-auto pb-2">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              index === 0
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

// Video Page Component
export const VideoPage = () => {
  const { videoId } = useParams();
  const video = mockVideos.find(v => v.id === videoId) || mockVideos[0];
  const relatedVideos = mockVideos.filter(v => v.id !== videoId).slice(0, 8);

  return (
    <div className="flex flex-col lg:flex-row p-6 space-y-6 lg:space-y-0 lg:space-x-6">
      {/* Main Video Section */}
      <div className="flex-1">
        {/* Video Player */}
        <div className="relative bg-black rounded-xl overflow-hidden mb-4">
          <div className="aspect-video flex items-center justify-center">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <button className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{video.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src={video.channelAvatar} alt={video.channel} className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{video.channel}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1.2M subscribers</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
                Subscribe
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-full">
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-3M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>125K</span>
                </button>
                <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
                <button className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
                  </svg>
                </button>
              </div>
              
              <button className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-sm">
              <span className="font-semibold">{video.views} views • {video.timestamp}</span>
            </p>
            <p className="text-sm mt-2 text-gray-700 dark:text-gray-300">
              Welcome to another amazing video! In this episode, we're diving deep into {video.category.toLowerCase()} 
              content that you won't want to miss. Make sure to like, subscribe, and hit the notification bell 
              for more awesome content like this!
            </p>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <p className="text-lg font-semibold">1,234 Comments</p>
              <button className="flex items-center space-x-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                <span>Sort by</span>
              </button>
            </div>
            
            {/* Comment Input */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                U
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full pb-2 border-b border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar - Related Videos */}
      <div className="w-full lg:w-96 space-y-3">
        <h3 className="font-semibold mb-4">Up next</h3>
        {relatedVideos.map((relatedVideo) => (
          <Link
            key={relatedVideo.id}
            to={`/watch/${relatedVideo.id}`}
            className="flex space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
          >
            <div className="relative flex-shrink-0">
              <img
                src={relatedVideo.thumbnail}
                alt={relatedVideo.title}
                className="w-40 aspect-video object-cover rounded-lg"
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