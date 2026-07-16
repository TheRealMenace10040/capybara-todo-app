import { useMemo } from 'react'
import mascotParty from '../assets/mascot-party2.png'

const CONFETTI_HUES = [35, 20, 145, 235, 300]
const CONFETTI_COUNT = 26

interface ConfettiPiece {
  id: number
  left: number
  width: number
  height: number
  hue: number
  duration: number
  delay: number
}

export function CelebrationOverlay() {
  const pieces = useMemo<ConfettiPiece[]>(
    () =>
      Array.from({ length: CONFETTI_COUNT }, (_, id) => {
        const width = 6 + Math.random() * 5
        return {
          id,
          left: Math.random() * 100,
          width,
          height: width * 0.6,
          hue: CONFETTI_HUES[Math.floor(Math.random() * CONFETTI_HUES.length)],
          duration: 1.1 + Math.random() * 0.6,
          delay: Math.random() * 0.3,
        }
      }),
    [],
  )

  return (
    <div className="celebration">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            width: `${p.width}px`,
            height: `${p.height}px`,
            background: `oklch(65% 0.16 ${p.hue})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <div className="celebration-mascot-wrap">
        <img src={mascotParty} alt="" className="celebration-mascot" />
        <span className="celebration-pill">Nice work!</span>
      </div>
    </div>
  )
}
