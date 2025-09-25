import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Mine } from './Mine';
import { Camera } from './Camera';
import { Hud } from './Hud';
import ReportTable from './ReportTable';
import { DashboardHeader } from './DashboardHeader';
import './App.css';
import './ReportTable.css';

function App() {
  const [alertLevel, setAlertLevel] = useState<'high' | 'medium' | 'low' | 'none'>('none');
  const [showReportTable, setShowReportTable] = useState(false);

  const toggleAlert = () => {
    setAlertLevel(prev => (prev === 'none' ? 'high' : 'none'));
  };

  const toggleReportTable = () => {
    setShowReportTable(prev => !prev);
  };

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
    </div>
  );
}

export default App;
