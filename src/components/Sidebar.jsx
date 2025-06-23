import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faFolder,
  faShareAlt,
  faFileAlt,
  faStar,
  faLock,
  faTrash,
  faFileDownload,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import logoImg from '../assets/logo.jpg';
import './Sidebar.css';

function Sidebar({ isCollapsed, onToggle, onLogout, onRequestFile, isDarkMode }) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}  ${isDarkMode ? 'dark' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <img src={logoImg} alt="Logo" />
          </div>
          {!isCollapsed && <span className="logo-text">File Share</span>}
        </div>
        <button className="toggle-btn" onClick={onToggle} aria-label="Toggle sidebar">
          <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li className="nav-item active">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faFolder} className="nav-icon" />
              {!isCollapsed && <span className="nav-text">My Files</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faShareAlt} className="nav-icon" />
              {!isCollapsed && <span className="nav-text">Shared</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faFileAlt} className="nav-icon" />
              {!isCollapsed && <span className="nav-text">All Files</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faStar} className="nav-icon" />
              {!isCollapsed && <span className="nav-text">Favorites</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faLock} className="nav-icon" />
              {!isCollapsed && <span className="nav-text">Private Files</span>}
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              <FontAwesomeIcon icon={faTrash} className="nav-icon" />
              {!isCollapsed && <span className="nav-text">Deleted</span>}
            </a>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-btn" onClick={onRequestFile}>
          <FontAwesomeIcon icon={faFileDownload} className="nav-icon" />
          {!isCollapsed && <span>Request File</span>}
        </button>
        <button className="sidebar-btn" onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          {!isCollapsed && <span>Log Out</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;