// components/Header.jsx
import React from 'react';
import { FiGrid, FiList, FiSettings } from 'react-icons/fi';
import { FaBell } from 'react-icons/fa';
import userImg from '../assets/User.jpg';
import { BsMoonStars, BsSun } from 'react-icons/bs';
import './Navbar.css';

function Navbar({ storageUsage, viewMode, setViewMode, isDarkMode, toggleDarkMode }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="btn btn-primary">
          {/* <span className="btn-icon plus-icon"></span> */}
        </button>
      </div>
      
      <div className="header-right">
        <div className="storage-info">
          <div className="storage-text">
            <span>{storageUsage.used} / {storageUsage.total} Gb</span>
            <span>Storage Usage</span>
          </div>

          <div className="storage-bar">
            <div 
              className="storage-progress" 
              style={{ width: `${(storageUsage.used / storageUsage.total) * 100}%` }}>
              </div>
          </div>

        </div>
        
        <div className="header-actions">
          <div className="view-mode-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <FiGrid size={20} />
            </button>
          
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <FiList size={20} />
            </button>
          </div>

          {/* dark mode ko laagi */}
           <button 
            className="header-btn dark-mode-btn" 
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {isDarkMode ? <BsSun size={20} /> : <BsMoonStars size={18} />}
          </button>
          
          <button className="header-btn settings-btn" title="Settings">
             <FiSettings size={20} />
          </button>
          
          <button className="header-btn notification-btn" title="Notifications">
            <FaBell size={24} color="golden"/>
          </button>
          
          <div className="user-avatar">
            <img src={userImg} alt="User profile" />
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;