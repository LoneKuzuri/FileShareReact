import React, { useState } from 'react';
import FileItem from './FileItem';
import './FileList.css';

function FileList({ files, viewMode, onFileSelect, onShareFile, selectedFileId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Type'); // Default sorting

  const sortOptions = ['Type', 'Name', 'Date', 'Size'];

  const handleSort = (option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
    // Add sorting logic here (e.g., sort files by selected option)
  };

  return (
    <div className="file-browser">
      <div className="file-browser-header">
        <h1>My Files</h1>
        <div className="file-browser-actions">
          <div 
            className="sort-dropdown"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>Sort by: {sortBy}</span>
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => handleSort(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className={`file-container ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {files.length === 0 ? (
          <div className="empty-state">
            <img src="/upload-illustration.svg" alt="No files" />
            <p>Drag and drop files here to upload</p>
          </div>
        ) : (
          files.map(file => (
            <FileItem
              key={file.id}
              file={file}
              isSelected={file.id === selectedFileId}
              viewMode={viewMode}
              onClick={() => onFileSelect(file.id)}
              onShare={() => onShareFile(file.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FileList;