import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import FileItem from './components/FileItem.jsx';
import FileList from './components/FileList.jsx';
import FileUpload from './components/FileUpload.jsx';
import './App.css';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [files, setFiles] = useState([
    { id: 1, name: 'Document.pdf', size: '2.4 MB', date: '2023-05-15' },
    { id: 2, name: 'Image.jpg', size: '1.8 MB', date: '2023-05-14' },
    { id: 3, name: 'Presentation.pptx', size: '5.2 MB', date: '2023-05-13' }
  ]);

  const handleUpload = (file) => {
    const newFile = {
      id: files.length + 1,
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0]
    };
    setFiles([...files, newFile]);
  };

   const [viewMode, setViewMode] = useState('grid');
   const storageUsage = {
    used: 1.2,    // GB used
    total: 5.0    // GB total
  };

  return (
    <div className="app">
      <Navbar 
        storageUsage={storageUsage} 
        viewMode={viewMode} 
        setViewMode={setViewMode}  
      />
      <div className="app-content">


        <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        
        <main className="main-content">
          <FileUpload onUpload={handleUpload} />
          <FileList files={files} />
        </main>
      </div>
    </div>
  );
}

export default App;