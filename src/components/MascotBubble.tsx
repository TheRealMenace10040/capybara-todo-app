import mascotCalm from '../assets/mascot-calm3.png'

interface MascotBubbleProps {
  doneCount: number
  totalCount: number
  visible: boolean
  onToggle: () => void
}

export function MascotBubble({ doneCount, totalCount, visible, onToggle }: MascotBubbleProps) {
  if (!visible) return null

  let message: string
  if (totalCount === 0 || doneCount === 0) {
    message = "Let's get things done today!"
  } else if (doneCount === totalCount) {
    message = 'You two make a great team — all done!'
  } else {
    message = `Nice progress — ${totalCount - doneCount} left to go.`
  }

  return (
    <button type="button" className="mascot-bubble" onClick={onToggle}>
      <img src={mascotCalm} alt="" className="mascot-img" />
      <span className="mascot-text">{message}</span>
    </button>
  )
}
