import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Mine } from './Mine';
import { Camera } from './Camera';
import { Hud } from './Hud';
import ReportTable from './ReportTable';
import { DashboardHeader } from './DashboardHeader';
import { Chatbot } from './Chatbot';
import './App.css';
import './ReportTable.css';

function App() {
  const [alertLevel, setAlertLevel] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [showReportTable, setShowReportTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleAlert = () => {
    setAlertLevel(prev => (prev === 'none' ? 'high' : 'none'));
  };

  const toggleReportTable = () => {
    setShowReportTable(prev => !prev);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={`app-container ${alertLevel === 'high' ? 'high-alert' : ''}`}>
      <DashboardHeader
        toggleAlert={toggleAlert}
        toggleReportTable={toggleReportTable}
        showReportTable={showReportTable}
      />
      <Hud alertLevel={alertLevel} />

      {showReportTable ? (
        <ReportTable toggleReportTable={toggleReportTable} />
      ) : (
        <Canvas camera={{ position: [0, 15, 20] }}>
          <Camera>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Mine alertLevel={alertLevel} />
          </Camera>
        </Canvas>
      )}
      <Chatbot />
    </div>
  );
}

export default App;
