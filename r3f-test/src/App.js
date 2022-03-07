import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import glsl from 'babel-plugin-glsl/macro';
import './App.css';

const WaveShaderMaterial = shaderMaterial(
  // Check docs for details on each
  // Uniform
  {},
  // Vertex Shader
  glsl`
    void main() {
      gl_Position = projectionMatrix * modelViewMatrix * vec4
      (position, 1.0);
    }
  `,
  // Fragment Shader
  glsl`
    void main() {
      gl_FragColor = vec4(0.0, 0.4, 1.0, 1.0);
    }
  `
);

extend({ WaveShaderMaterial });

const Scene = () => {
  return (
    <Canvas>
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <planeBufferGeometry args={[3, 5]} />
        <meshStandardMaterial color='lightblue' />
      </mesh>
    </Canvas>
  );
};

const App = () => {
  return <Scene />;
};

export default App;
