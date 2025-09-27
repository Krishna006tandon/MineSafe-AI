import { useState } from 'react';
import './DashboardHeader.css';

interface DashboardHeaderProps {
  toggleAlert: () => void;
  toggleReportTable: () => void;
  showReportTable: boolean;
}

export function DashboardHeader({ toggleAlert, toggleReportTable, showReportTable }: DashboardHeaderProps) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showKnowledgeBaseModal, setShowKnowledgeBaseModal] = useState(false);

  const handleVideoClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleKnowledgeBaseClick = () => {
    setShowKnowledgeBaseModal(true);
  };

  const handleCloseKnowledgeBaseModal = () => {
    setShowKnowledgeBaseModal(false);
  };

  return (
    <header className="dashboard-header">
      <div className="competition-banner">🏆This content is provided solely for the preview of our prototype.</div>
      <div className="header-main-content">
        <div className="left-section">
          <span className="project-name">MineSafe-AI</span>
        </div>
        <div className="right-section">
          <div id="toggle-alert-button" className="icon-container" onClick={toggleAlert}>
            <span className="icon">🔔</span>
            <span className="icon-text">Toggle Alert</span>
          </div>
          <div id="toggle-report-table-button" className="icon-container" onClick={toggleReportTable}>
            <span className="icon">📊</span>
            <span className="icon-text">{showReportTable ? 'Show Mine' : 'Show Report'}</span>
          </div>
          <div id="guidance-button" className="icon-container" onClick={handleVideoClick}>
            <span className="icon">📹</span>
            <span className="icon-text">Guidance</span>
          </div>
          <div id="knowledge-base-button" className="icon-container" onClick={handleKnowledgeBaseClick}>
            <span className="icon">📚</span>
            <span className="icon-text">Knowledge Base</span>
          </div>
        </div>
      </div>

      {showVideoModal && (
        <div className="modal-overlay" onClick={handleCloseVideoModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseVideoModal}>X</button>
            <h3>Dashboard Tutorial</h3>
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/wsAzlmz5dso"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {showKnowledgeBaseModal && (
        <div className="modal-overlay" onClick={handleCloseKnowledgeBaseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleCloseKnowledgeBaseModal}>X</button>
            <h3>Knowledge Base</h3>
            <ul className="knowledge-base-links">
              <li>
                <a href="https://minemountain.in/website/mining_e_library/" target="_blank" rel="noopener noreferrer">
                  <span className="link-icon">📖</span>
                  <div className="link-text">
                    <span className="link-title">Mining E-Library</span>
                    <span className="link-description">An online repository of mining resources.</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="https://www.india.gov.in/download-e-book-mining-sector-ministry-mines" target="_blank" rel="noopener noreferrer">
                  <span className="link-icon">📄</span>
                  <div className="link-text">
                    <span className="link-title">E-Book: Mining Sector (Ministry of Mines)</span>
                    <span className="link-description">Official e-book from the Indian Ministry of Mines.</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
