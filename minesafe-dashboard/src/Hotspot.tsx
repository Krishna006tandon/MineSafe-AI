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

export function Hotspot({ position, riskLevel, alertLevel }) {
  const [hovered, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
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
      <meshBasicMaterial color={hovered ? 'hotpink' : riskLevel === 'High' ? 'red' : riskLevel === 'Medium' ? 'orange' : 'green'} />
      {clicked && (
        <Html center>
          <div className="holographic-panel" style={{width: '400px', height: '300px'}}>
            <h2>Risk Assessment</h2>
            <p>Rockfall Probability: {riskLevel}</p>
            <ResponsiveContainer width="100%" height="80%">
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