import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import FileItem from './FileItem';
import './FileList.css';

const SORT_OPTIONS = {
  TYPE: 'Type',
  NAME: 'Name',
  DATE: 'Date',
  SIZE: 'Size'
};

function FileList({ files = [], viewMode = 'list', onFileSelect, onShareFile, selectedFileId, isDarkMode }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState(SORT_OPTIONS.DATE);

  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen(prev => !prev);
  }, []);

  const handleSort = useCallback((option) => {
    setSortBy(option);
    setIsDropdownOpen(false);
  }, []);

  const sortedFiles = useCallback(() => {
    const sortFunctions = {
      [SORT_OPTIONS.NAME]: (a, b) => a.name.localeCompare(b.name),
      [SORT_OPTIONS.DATE]: (a, b) => new Date(b.date) - new Date(a.date),
      [SORT_OPTIONS.SIZE]: (a, b) => b.size - a.size,
      [SORT_OPTIONS.TYPE]: (a, b) => a.type.localeCompare(b.type)
    };

    return [...files].sort(sortFunctions[sortBy] || sortFunctions[SORT_OPTIONS.DATE]);
  }, [files, sortBy]);

  const isEmpty = files.length === 0;

  return (
    <div className={`file-browser ${isDarkMode ? 'dark' : ""}`}>
      <div className="file-browser-header">
        <h1>My Files</h1>
        <div className="file-browser-actions">
          <div
            className="sort-dropdown"
            onClick={toggleDropdown}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>Sort by: {sortBy}</span>
            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>
              ▼
            </span>

            {isDropdownOpen && (
              <div className="dropdown-menu" role="listbox">
                {Object.values(SORT_OPTIONS).map((option) => (
                  <div
                    key={option}
                    className="dropdown-item"
                    onClick={() => handleSort(option)}
                    role="option"
                    aria-selected={sortBy === option}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`file-container ${viewMode}-view`}>
        {isEmpty ? (
          <div className="empty-state">
            <img src="/upload-illustration.svg" alt="No files available" />
            <p>Drag and drop files here to upload</p>
          </div>
        ) : (
          sortedFiles().map((file) => (
            <FileItem
              key={file.id}
              file={file}
              isSelected={file.id === selectedFileId}
              viewMode={viewMode}
              onSelect={() => onFileSelect(file.id)}
              onShare={() => onShareFile(file.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired
    })
  ),
  viewMode: PropTypes.oneOf(['list', 'grid']),
  onFileSelect: PropTypes.func.isRequired,
  onShareFile: PropTypes.func.isRequired,
  selectedFileId: PropTypes.string
};

export default FileList;