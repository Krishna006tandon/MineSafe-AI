import { CameraControls } from '@react-three/drei';
import { useRef } from 'react';
import { CameraContext } from './CameraContext';

export function Camera({ children }) {
  const controls = useRef<CameraControls>(null);

  return (
    <CameraContext.Provider value={controls}>
      <CameraControls ref={controls} />
      {children}
    </CameraContext.Provider>
  );
}