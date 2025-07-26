import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Sidebar, HomePage, VideoPage, AdminLogin, AdminDashboard } from './Components';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check admin status on load
  useEffect(() => {
    const adminStatus = localStorage.getItem('orynx_admin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
    }
    
    // Load videos from localStorage
    const savedVideos = localStorage.getItem('orynx_videos');
    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }
  }, []);

  // Handle screen size changes for sidebar
  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, []);

  const adminLogin = (code) => {
    if (code === '3056') {
      setIsAdmin(true);
      localStorage.setItem('orynx_admin', 'true');
      setShowAdminLogin(false);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('orynx_admin');
  };

  const addVideo = (videoData) => {
    const newVideos = [...videos, videoData];
    setVideos(newVideos);
    localStorage.setItem('orynx_videos', JSON.stringify(newVideos));
  };

  const deleteVideo = (videoId) => {
    const updatedVideos = videos.filter(video => video.id !== videoId);
    setVideos(updatedVideos);
    localStorage.setItem('orynx_videos', JSON.stringify(updatedVideos));
  };

  return (
    <div className="App bg-white dark:bg-gray-900 min-h-screen overflow-x-hidden">
      <BrowserRouter>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAdmin={isAdmin}
          onAdminLogin={() => setShowAdminLogin(true)}
          onAdminLogout={adminLogout}
          isMobile={isMobile}
        />
        
        <div className="flex relative">
          <Sidebar 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen}
            isMobile={isMobile}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            isMobile 
              ? 'ml-0 mt-14' 
              : sidebarOpen 
                ? 'ml-64 mt-14' 
                : 'ml-16 mt-14'
          }`}>
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} videos={videos} isMobile={isMobile} />} />
              <Route path="/watch/:videoId" element={<VideoPage videos={videos} isMobile={isMobile} />} />
              <Route path="/admin" element={
                isAdmin ? (
                  <AdminDashboard 
                    videos={videos}
                    onAddVideo={addVideo}
                    onDeleteVideo={deleteVideo}
                    isMobile={isMobile}
                  />
                ) : (
                  <AdminLogin onLogin={adminLogin} isMobile={isMobile} />
                )
              } />
            </Routes>
          </main>
        </div>

        {/* Admin Login Modal */}
        {showAdminLogin && (
          <AdminLogin 
            onLogin={adminLogin} 
            onClose={() => setShowAdminLogin(false)}
            isModal={true}
            isMobile={isMobile}
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;