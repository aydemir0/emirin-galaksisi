"use client";

import React, { useState, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import { inSphere } from 'maath/random';
import * as THREE from 'three';

const YildizKumesi = (props) => {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const pointMaterialRef = useRef();

  const starPositions = useMemo(() => inSphere(new Float32Array(5000 * 3), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    if(pointMaterialRef.current && pointMaterialRef.current.uniforms) {
       pointMaterialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  const onBeforeCompile = (shader) => {
    shader.uniforms.time = { value: 0.0 };
    shader.vertexShader = `
      uniform float time;
      ` + shader.vertexShader;
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
        #include <begin_vertex>
        // Zaman ve pozisyona göre her yıldızın boyutunu değiştirerek titreşim efekti
        transformed.x += sin(time + position.y * 2.0) * 0.1;
        transformed.y += cos(time + position.x * 2.0) * 0.1;
      `
    );
    pointMaterialRef.current = shader;
  };
  
  return (
    <group rotation={[0, 0, Math.PI / 4]} {...props}>
      <Points
        ref={ref}
        positions={starPositions}
        stride={3}
        frustumCulled={false}
        onClick={(event) => {
          event.stopPropagation();
          props.onClick();
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(event) => {
          setHover(false);
          document.body.style.cursor = 'default';
        }}
      >
        <PointMaterial
          transparent
          color={hovered ? '#add8e6' : '#87CEEB'}
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          onBeforeCompile={onBeforeCompile} 
        />
      </Points>
    </group>
  );
};

export default YildizKumesi;
