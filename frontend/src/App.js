import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Sidebar, HomePage, VideoPage, AdminLogin, AdminDashboard } from './Components';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default closed on mobile
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [videos, setVideos] = useState([]);

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
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="App bg-white dark:bg-gray-900 min-h-screen">
      <BrowserRouter>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isAdmin={isAdmin}
          onAdminLogin={() => setShowAdminLogin(true)}
          onAdminLogout={adminLogout}
        />
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} ml-0 mt-14`}>
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} videos={videos} />} />
              <Route path="/watch/:videoId" element={<VideoPage videos={videos} />} />
              <Route path="/admin" element={
                isAdmin ? (
                  <AdminDashboard 
                    videos={videos}
                    onAddVideo={addVideo}
                    onDeleteVideo={deleteVideo}
                  />
                ) : (
                  <AdminLogin onLogin={adminLogin} />
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
          />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;