import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Sidebar, HomePage, VideoPage } from './Components';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="App bg-white dark:bg-gray-900 min-h-screen">
      <BrowserRouter>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} />
          <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} mt-14`}>
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
              <Route path="/watch/:videoId" element={<VideoPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;