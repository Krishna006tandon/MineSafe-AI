import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Mine } from './Mine';
import { Camera } from './Camera';
import { Hud } from './Hud';
import ReportTable from './ReportTable'; // Import ReportTable
import { DashboardHeader } from './DashboardHeader'; // Import DashboardHeader
import './App.css';
import './ReportTable.css'; // Import ReportTable.css

function App() {
  const [alertLevel, setAlertLevel] = useState('none');
  const [showReportTable, setShowReportTable] = useState(false); // New state for toggling report table

  const toggleAlert = () => {
    setAlertLevel(prev => (prev === 'none' ? 'high' : 'none'));
  };

  const toggleReportTable = () => { // New function to toggle report table
    setShowReportTable(prev => !prev);
  };

  return (
    <div className={`app-container ${alertLevel === 'high' ? 'high-alert' : ''}`}>
      <DashboardHeader /> {/* Render the DashboardHeader */}
      <Hud alertLevel={alertLevel} />
      <button onClick={toggleAlert} style={{position: 'absolute', top: '150px', left: '20px', zIndex: 101}}>
        Toggle Alert
      </button>
      {/* New button to toggle Report Table */}
      <button onClick={toggleReportTable} style={{position: 'absolute', top: '190px', left: '20px', zIndex: 101}}>
        {showReportTable ? 'Show Mine View' : 'Show Report Table'}
      </button>

      {showReportTable ? (
        <ReportTable /> // Conditionally render ReportTable
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