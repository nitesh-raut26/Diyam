import { useMemo } from 'react'

const symbols = ['✦', '✧', '◈', '❋', '✦', '⬡', '✦']

export default function ParticleField({ count = 20 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 8}s`,
      animationDuration: `${6 + Math.random() * 8}s`,
      size: Math.random() > 0.7 ? 'text-lg' : 'text-xs',
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: 0.1 + Math.random() * 0.4,
    })), [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute ${p.size} animate-particle-rise select-none`}
          style={{
            left: p.left,
            animationDelay: p.animationDelay,
            animationDuration: p.animationDuration,
            opacity: p.opacity,
            color: '#F59E0B',
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  )
}
