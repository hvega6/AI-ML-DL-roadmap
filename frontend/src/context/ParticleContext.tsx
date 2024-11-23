import React, { createContext, useContext, useMemo } from 'react';

// Consistent random generation function
const createSeededRandom = (seed: number) => {
  let currentSeed = seed;
  return () => {
    const x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
  };
};

// Define particle interface
interface Particle {
  delay: number;
  duration: number;
  hue: number;
  translateX: number;
  translateY: number;
  particleSize: number;
  rotationAngle: number;
  top: number;
  left: number;
}

// Particle generation logic
const generateStaticParticles = (): Particle[] => {
  const fixedSeed = 42;
  const seededRandom = createSeededRandom(fixedSeed);

  return Array.from({ length: 200 }, () => {
    const randomX = seededRandom() * 120 - 10; // Spread across 0-110%
    const randomY = seededRandom() * 120 - 10; // Spread across 0-110%
    
    return {
      delay: seededRandom() * 14,
      duration: 14,
      hue: Math.floor(seededRandom() * 360),
      translateX: (seededRandom() * 2 - 1) * 100,
      translateY: (seededRandom() * 2 - 1) * 100,
      particleSize: seededRandom() * 3 + 1, // 1-4px
      rotationAngle: seededRandom() * 360,
      top: randomY,
      left: randomX
    };
  });
};

// Create the context
export const ParticleContext = createContext<Particle[]>([]);

// Provider component
interface ParticleProviderProps {
  children: React.ReactNode;
}

export const ParticleProvider: React.FC<ParticleProviderProps> = ({ children }) => {
  const staticParticlesData = useMemo(() => generateStaticParticles(), []);

  return (
    <ParticleContext.Provider value={staticParticlesData}>
      {children}
    </ParticleContext.Provider>
  );
};

// Custom hook to use the particle data
export const useParticles = (): Particle[] => {
  return useContext(ParticleContext);
};

export default ParticleContext;
