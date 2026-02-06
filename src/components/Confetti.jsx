import { useEffect, useState } from 'react';

export function Confetti({ trigger }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
        color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#A78BFA', '#F472B6'][Math.floor(Math.random() * 5)]
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => setParticles([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="confetti-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle"
          style={{
            left: `${particle.x}%`,
            animationDelay: `${particle.delay}s`,
            backgroundColor: particle.color
          }}
        />
      ))}
    </div>
  );
}
