import { Sphere, Html } from '@react-three/drei';
import { useState, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CameraContext } from './CameraContext';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import './styles.css';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

interface HotspotProps {
  position: [number, number, number];
  riskLevel: 'High' | 'Medium' | 'Low';
  alertLevel: 'high' | 'medium' | 'low' | 'none';
  probability: number;
  confidence: number;
}

export function Hotspot({ position, riskLevel, alertLevel, probability, confidence }: HotspotProps) {
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [showDroneImagery, setShowDroneImagery] = useState(false);
  const cameraControls = useContext(CameraContext);

  const { scale } = useSpring({
    loop: { reverse: true },
    from: { scale: 1 },
    to: { scale: 1.5 },
    config: { duration: alertLevel === 'high' && riskLevel === 'High' ? 300 : 1000 },
    reset: true,
  });

  const handleClick = () => {
    setClicked(!clicked);
    if (cameraControls && cameraControls.current) {
      const targetPosition = new THREE.Vector3(...position);
      cameraControls.current.setLookAt(
        targetPosition.x + 2,
        targetPosition.y + 2,
        targetPosition.z + 2,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    }
  };

  const AnimatedSphere = animated(Sphere);

  return (
    <AnimatedSphere
      scale={riskLevel === 'High' ? scale : 1}
      position={position}
      args={[0.2, 16, 16]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onClick={handleClick}
    >
      <animated.meshStandardMaterial
        color={riskLevel === 'High' ? 'red' : riskLevel === 'Medium' ? 'orange' : 'green'}
        emissive={riskLevel === 'High' ? 'red' : 'black'}
        emissiveIntensity={riskLevel === 'High' ? (hovered ? 1.5 : scale.to([1, 1.5], [0.5, 1.0])) : 0}
        transparent
        opacity={0.5 + confidence * 0.5}
      />
      {clicked && (
        <Html center>
          <div className="holographic-panel" style={{width: '400px', height: '300px'}}>
            <h2>Risk Assessment - Sector {position[0] > 0 ? 'A' : 'B'}</h2>
            <p><strong>Rockfall Probability Forecast:</strong> {`${(probability * 100).toFixed(0)}%`} (Confidence: {`${(confidence * 100).toFixed(0)}%`})</p>
            <p><strong>Live Geotechnical Sensor Data:</strong></p>
            <ul>
              <li>Displacement: {Math.random() * 10} mm</li>
              <li>Strain: {Math.random() * 0.1} %</li>
            </ul>
            <p><strong>High-resolution Drone Imagery:</strong> <a href="#" style={{color: '#00aaff'}} onClick={(e) => { e.preventDefault(); setShowDroneImagery(!showDroneImagery); }}>View Latest</a></p>
            {showDroneImagery && (
              <img src="https://via.placeholder.com/300x150?text=Drone+Imagery" alt="Drone Imagery" style={{ width: '100%', marginTop: '10px' }} />
            )}
            <p><strong>Environmental Factors:</strong></p>
            <ul>
              <li>Rainfall (24h): {Math.floor(Math.random() * 20)} mm</li>
              <li>Temperature: {Math.floor(Math.random() * 10) + 15}°C</li>
            </ul>
            <ResponsiveContainer width="100%" height="30%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 170, 255, 0.5)" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Html>
      )}
    </AnimatedSphere>
  );
}