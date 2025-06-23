// src/components/FileItem.jsx
import React from "react";
import PropTypes from "prop-types";
import "./FileItem.css";
import { FaFilePdf, FaFileImage, FaFilePowerpoint, FaFile } from 'react-icons/fa';

function FileItem({ file, onSelect, isSelected, onShare, isDarkMode }) {
  
  // ✅ Moved FileIcon outside for better performance
  const FileIcon = ({ type }) => {
    let className = "file-icon";
    if (type === "pdf") className += " pdf";
    else if (["jpg", "jpeg", "png", "gif", "svg"].includes(type?.toLowerCase())) className += " image";
    else if (["ppt", "pptx"].includes(type?.toLowerCase())) className += " ppt";
    
    switch (type?.toLowerCase()) {
      case 'pdf': 
        return <FaFilePdf className={className} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <FaFileImage className={className} />;
      case 'ppt':
      case 'pptx': 
        return <FaFilePowerpoint className={className} />;
      default: 
        return <FaFile className={className} />;
    }
  };

  // ✅ Handle missing file data
  if (!file) {
    return null;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(file.id);
    }
  };

  const handleShareKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onShare(file);
    }
  };

  return (
    <div
      className={`file-item ${isSelected ? "selected" : ""} ${isDarkMode ? 'dark' : ""}`}
      onClick={() => onSelect(file.id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Select file ${file.name}`}
    >
      <div className="file-info">
        <FileIcon type={file.type} />
        <p title={file.name}>{file.name}</p>
      </div>
     
      <button
        className="share-btn"
        onClick={(e) => {
          e.stopPropagation();
          onShare(file);
        }}
        onKeyDown={handleShareKeyDown}
        aria-label={`Share ${file.name}`}
      >
        Share
      </button>
    </div>
  );
}

// ✅ Added PropTypes for better debugging
FileItem.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  onShare: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool,
};

FileItem.defaultProps = {
  isSelected: false,
  isDarkMode: false,
};

export default FileItem;