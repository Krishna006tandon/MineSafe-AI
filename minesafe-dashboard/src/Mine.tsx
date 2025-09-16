import { useMemo } from 'react';
import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import { Hotspot } from './Hotspot';

export function Mine({ alertLevel }) {
  const noise2D = createNoise2D();

  const geometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(20, 20, 100, 100);
    const position = geometry.attributes.position;
    for (let i = 0; i < position.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(position, i);
      const noise = noise2D(vertex.x / 10, vertex.y / 10);
      position.setZ(i, noise * 2);
    }
    geometry.computeVertexNormals();
    return geometry;
  }, [noise2D]);

  return (
    <group>
      <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#5c4033" side={THREE.DoubleSide} />
      </mesh>
      <Hotspot position={[0, 1, 4]} riskLevel="High" alertLevel={alertLevel} probability={0.7} confidence={0.8} />
      <Hotspot position={[5, 0.5, 2]} riskLevel="Medium" alertLevel={alertLevel} probability={0.4} confidence={0.6} />
      <Hotspot position={[-5, 0.2, -3]} riskLevel="Low" alertLevel={alertLevel} probability={0.1} confidence={0.9} />
    </group>
  );
}