'use client';

import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * DataCentreCorridor
 * Architectural hull of the facility:
 * - Continuous reflective dark graphite floor
 * - Acoustic ceiling grid with recessed linear warm downlights
 * - Overhead cable raceways and conduit trays
 * - Repeated structural portal frames (archways) linking facility zones
 */
export default function DataCentreCorridor() {
  const portalFramesRef = useRef();

  // Portal archway positions along the corridor
  const portalPositions = useMemo(() => {
    const list = [];
    for (let z = 10; z >= -170; z -= 15) {
      list.push(z);
    }
    return list;
  }, []);

  // Compute portal archway transforms
  const portalMatrices = useMemo(() => {
    const mats = [];
    const dummy = new THREE.Object3D();

    portalPositions.forEach((z) => {
      // Left vertical pillar
      dummy.position.set(-3.7, 1.9, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.3, 3.8, 0.5);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());

      // Right vertical pillar
      dummy.position.set(3.7, 1.9, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(0.3, 3.8, 0.5);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());

      // Overhead cross-beam
      dummy.position.set(0, 3.75, z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(7.6, 0.3, 0.5);
      dummy.updateMatrix();
      mats.push(dummy.matrix.clone());
    });

    return mats;
  }, [portalPositions]);

  React.useEffect(() => {
    if (portalFramesRef.current) {
      portalMatrices.forEach((mat, i) => {
        portalFramesRef.current.setMatrixAt(i, mat);
      });
      portalFramesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [portalMatrices]);

  return (
    <group>
      {/* 1. Reflective Floor Plane */}
      <mesh
        position={[0, -0.01, -85]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[7.8, 210]} />
        <meshStandardMaterial
          color="#16191a"
          roughness={0.28}
          metalness={0.4}
        />
      </mesh>

      {/* 1b. Floor Seam Accent Strips (Center Guide) */}
      <mesh position={[0, 0.005, -85]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 210]} />
        <meshBasicMaterial color="#343D3C" transparent opacity={0.6} />
      </mesh>
      <mesh position={[-2.4, 0.005, -85]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 210]} />
        <meshBasicMaterial color="#293030" transparent opacity={0.45} />
      </mesh>
      <mesh position={[2.4, 0.005, -85]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, 210]} />
        <meshBasicMaterial color="#293030" transparent opacity={0.45} />
      </mesh>

      {/* 2. Ceiling Structure */}
      <mesh position={[0, 3.85, -85]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.8, 210]} />
        <meshStandardMaterial
          color="#1a1e1f"
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* 3. Overhead Cable Raceway / Conduits (Center) */}
      <mesh position={[0, 3.65, -85]}>
        <boxGeometry args={[1.2, 0.12, 210]} />
        <meshStandardMaterial
          color="#222828"
          roughness={0.65}
          metalness={0.5}
        />
      </mesh>

      {/* 4. Recessed Linear Architectural Downlight Strips */}
      <mesh position={[-1.2, 3.8, -85]}>
        <boxGeometry args={[0.15, 0.04, 210]} />
        <meshBasicMaterial color="#FFF8EE" />
      </mesh>
      <mesh position={[1.2, 3.8, -85]}>
        <boxGeometry args={[0.15, 0.04, 210]} />
        <meshBasicMaterial color="#FFF8EE" />
      </mesh>

      {/* 5. Instanced Structural Portal Frames (Archways) */}
      <instancedMesh
        ref={portalFramesRef}
        args={[null, null, portalMatrices.length]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#343D3C"
          roughness={0.6}
          metalness={0.45}
        />
      </instancedMesh>

      {/* 6. Soft Downlight Cones for Atmosphere (Evenly Spaced) */}
      {portalPositions.map((z, idx) => (
        <group key={`light-${idx}`} position={[0, 3.6, z]}>
          <pointLight
            color="#FFF8EE"
            intensity={2.2}
            distance={14}
            decay={2}
          />
        </group>
      ))}
    </group>
  );
}
