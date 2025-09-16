import { createContext } from 'react';
import { CameraControls } from '@react-three/drei';

export const CameraContext = createContext<React.RefObject<CameraControls> | null>(null);