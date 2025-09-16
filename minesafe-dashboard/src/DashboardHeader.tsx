import React, { useState } from 'react';
import './DashboardHeader.css'; // We'll create this CSS file next

export function DashboardHeader() {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleVideoClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleKnowledgeBaseClick = () => {
    // Replace with actual knowledge base URL
    window.open('https://example.com/mine-knowledge-base', '_blank');
  };

  return (
    <header className="dashboard-header">
      <div className="left-section">
        {/* Placeholder for logo */}
        {/* <img src="/vite.svg" alt="Project Aegis Logo" className="project-logo" /> */}
        <span className="project-name">MineSafe-AI</span>
      </div>
      <div className="right-section">
        <div className="icon-container" onClick={handleVideoClick}>
          <span className="icon">📹</span>
          <span className="icon-text">Guidance</span>
        </div>
        <div className="icon-container" onClick={handleKnowledgeBaseClick}>
          <span className="icon">📚</span>
          <span className="icon-text">Knowledge Base</span>
        </div>
      </div>

      {showVideoModal && (
        <div className="modal-overlay" onClick={handleCloseVideoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseVideoModal}>X</button>
            <h3>Dashboard Tutorial</h3>
            <div className="video-container">
              {/* Replace with actual YouTube embed URL */}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Placeholder YouTube video
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
