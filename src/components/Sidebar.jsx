// components/Sidebar.jsx
import React from 'react';
import logoImg from '../assets/logo.jpg';
import './Sidebar.css';

function Sidebar({ isCollapsed, onToggle, onLogout, onRequestFile }) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <img src={logoImg} alt="Logo" />
          </div>
          {!isCollapsed && <span className="logo-text">File Share</span>}
        </div>
        <button className="toggle-btn" onClick={onToggle}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <a href="#" className="nav-link">
              <span className="nav-icon folder-icon"></span>
              {!isCollapsed && <span className="nav-text">My Files</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon share-icon"></span>
              {!isCollapsed && <span className="nav-text">Shared</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon files-icon"></span>
              {!isCollapsed && <span className="nav-text">All Files</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon star-icon"></span>
              {!isCollapsed && <span className="nav-text">Favorites</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon private-icon"></span>
              {!isCollapsed && <span className="nav-text">Private files</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <span className="nav-icon trash-icon"></span>
              {!isCollapsed && <span className="nav-text">Deleted Files</span>}
            </a>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <button className="sidebar-btn" onClick={onRequestFile}>
          <span className="nav-icon request-icon"></span>
          {!isCollapsed && <span>Request File</span>}
        </button>
        <button className="sidebar-btn" onClick={onLogout}>
          <span className="nav-icon logout-icon"></span>
          {!isCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;