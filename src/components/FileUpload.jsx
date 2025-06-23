import React, { useState } from 'react';
import './FileUpload.css';

function FileUploadModal({ onClose, onUploadComplete, isDarkMode }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setFileUrl('');
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate file upload (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock URL (in real app, this would come from your backend)
    const mockUrl = `https://fileshare.com/${Date.now()}_${selectedFile.name.replace(/\s+/g, '_')}`;
    setFileUrl(mockUrl);
    setIsUploading(false);
    
    // Notify parent component
    if (onUploadComplete) {
      onUploadComplete({
        name: selectedFile.name,
        size: (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: mockUrl
      });
    }
  };

  return (
    <div className={`file-upload-modal ${isDarkMode ? 'dark' : ""}`}>
      <h2>Upload File</h2>
      
      <div className="upload-area">
        <label htmlFor="file-upload" className="drop-zone">
          {selectedFile ? (
            <>
              <div className="file-preview">
                {selectedFile.type.startsWith('image/') ? (
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Preview" 
                    className="image-preview"
                  />
                ) : (
                  <div className="file-icon">
                    {getFileIcon(selectedFile.name)}
                  </div>
                )}
              </div>
              <p className="file-name">{selectedFile.name}</p>
            </>
          ) : (
            <>
              <div className="upload-icon">📁</div>
              <p>Drag & drop files here or click to browse</p>
            </>
          )}
          <input 
            id="file-upload"
            type="file" 
            onChange={handleFileChange}
            className="file-input"
          />
        </label>
      </div>

      {selectedFile && (
        <div className="file-details">
          <p>Type: {selectedFile.type || 'Unknown'}</p>
          <p>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}

      <button 
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="upload-button"
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>

      {fileUrl && (
        <div className="file-info">
          <p>File uploaded successfully!</p>
          <div className="file-url">
            <span>Shareable link: </span>
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </div>
          <button 
            onClick={() => navigator.clipboard.writeText(fileUrl)}
            className="copy-button"
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}

// Helper function to show appropriate file icon
function getFileIcon(filename) {
  const extension = filename.split('.').pop().toLowerCase();
  switch(extension) {
    case 'pdf': return '📄';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif': return '🖼️';
    case 'doc':
    case 'docx': return '📝';
    case 'xls':
    case 'xlsx': return '📊';
    case 'ppt':
    case 'pptx': return '📑';
    case 'zip':
    case 'rar': return '🗄️';
    default: return '📁';
  }
}

export default FileUploadModal;