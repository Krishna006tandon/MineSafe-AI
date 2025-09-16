import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Mine } from './Mine';
import { Camera } from './Camera';
import { Hud } from './Hud';
import './App.css';

function App() {
  const [alertLevel, setAlertLevel] = useState('none');

  const toggleAlert = () => {
    setAlertLevel(prev => (prev === 'none' ? 'high' : 'none'));
  };

  return (
    <div className={`app-container ${alertLevel === 'high' ? 'high-alert' : ''}`}>
      <Hud alertLevel={alertLevel} />
      <button onClick={toggleAlert} style={{position: 'absolute', top: '150px', left: '20px', zIndex: 101}}>
        Toggle Alert
      </button>
      <Canvas camera={{ position: [0, 15, 20] }}>
        <Camera>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Mine alertLevel={alertLevel} />
        </Camera>
      </Canvas>
    </div>
  );
}

export default App;