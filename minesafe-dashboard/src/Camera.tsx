import { CameraControls } from '@react-three/drei';
import { useRef } from 'react';
import type { ReactNode } from 'react';
import { CameraContext } from './CameraContext';

export function Camera({ children }: { children: ReactNode }) {
  const controls = useRef<CameraControls>(null!);

  return (
    <CameraContext.Provider value={controls}>
      <CameraControls ref={controls} />
      {children}
    </CameraContext.Provider>
  );
}