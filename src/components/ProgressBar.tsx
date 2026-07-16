interface ProgressBarProps {
  doneCount: number
  totalCount: number
}

export function ProgressBar({ doneCount, totalCount }: ProgressBarProps) {
  const pct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100)

  return (
    <div className="progress-row">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="progress-count">
        {doneCount}/{totalCount}
      </span>
    </div>
  )
}
