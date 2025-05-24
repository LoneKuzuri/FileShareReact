// src/components/FileItem.jsx
import React from "react";
import "./FileItem.css"; 
import { FaFilePdf, FaFileImage, FaFilePowerpoint } from 'react-icons/fa';

function FileItem({ file, onSelect, isSelected, onShare }) {
  
    const FileIcon = ({ type }) => {
    switch (type) {
      case 'pdf': return <FaFilePdf className="file-icon pdf" />;
      case 'jpg': return <FaFileImage className="file-icon image" />;
      case 'pptx': return <FaFilePowerpoint className="file-icon ppt" />;
      default: return <Fa File className="file-icon" />;
    }
  };


    return (
    <div
      className={`file-item ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(file.id)}
    >
      <div className="file-info">
        <p>{file.name}</p>
      </div>
      <button className="share-btn" onClick={(e) => { e.stopPropagation(); onShare(file); }}>
        Share
      </button>
    </div>
  );
}

export default FileItem;
