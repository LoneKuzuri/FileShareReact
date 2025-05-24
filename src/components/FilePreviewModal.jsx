// src/components/FilePreviewModal.jsx
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './FilePreviewModal.css';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function FilePreviewModal({ file, onClose }) {
  return (
    <div className="preview-modal">
      <div className="preview-content">
        <button className="close-button" onClick={onClose}>
          ✕
        </button>
        {file.type.startsWith('image/') ? (
          <img
            src={file.preview}
            alt={file.name}
            className="full-preview"
          />
        ) : file.type === 'application/pdf' ? (
          <Document file={file.file}>
            <Page pageNumber={1} width={600} />
          </Document>
        ) : (
          <p className="no-preview-message">No preview available for this file type.</p>
        )}
      </div>
    </div>
  );
}

export default FilePreviewModal;