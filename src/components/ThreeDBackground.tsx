
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

const FloatingCube = () => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3
      mesh.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.2
      mesh.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })
  
  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial color="#9b87f5" wireframe />
    </mesh>
  )
}

const FloatingSphere = ({ position }: { position: [number, number, number] }) => {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.getElapsedTime()
      mesh.current.position.y = position[1] + Math.sin(time + position[0]) * 0.3
      mesh.current.rotation.x = time * 0.2
      mesh.current.rotation.y = time * 0.1
    }
  })
  
  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial color="#1EAEDB" wireframe opacity={0.7} transparent />
    </mesh>
  )
}

const ThreeDBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9b87f5" />
        
        <FloatingCube />
        <FloatingSphere position={[-2, 0, -1]} />
        <FloatingSphere position={[2, 0, -1]} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}

export default ThreeDBackground
