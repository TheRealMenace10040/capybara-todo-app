import avatarDennis from '../assets/avatar-dennis.png'
import avatarRamila from '../assets/avatar-ramila.png'
import type { Task } from '../types'
import { formatDate } from '../dateFormat'

const CATEGORY_LABEL: Record<Task['category'], string> = {
  chores: 'Chores',
  errands: 'Errands',
  dates: 'Dates',
  other: 'Other',
}

const RECURRENCE_LABEL: Record<Task['recurrence'], string> = {
  none: '',
  daily: 'Repeats daily',
  weekly: 'Repeats weekly',
  monthly: 'Repeats monthly',
}

interface TaskCardProps {
  task: Task
  onToggleDone: (id: string) => void
  onTogglePriority: (id: string) => void
  onRemove: (id: string) => void
}

function AssigneeAvatar({ assignee }: { assignee: Task['assignee'] }) {
  if (assignee === 'both') {
    return (
      <div className="assignee-avatar-both">
        <img src={avatarDennis} alt="Dennis" />
        <img src={avatarRamila} alt="Ramila" />
      </div>
    )
  }
  const src = assignee === 'dennis' ? avatarDennis : avatarRamila
  const alt = assignee === 'dennis' ? 'Dennis' : 'Ramila'
  return <img src={src} alt={alt} className="assignee-avatar" />
}

export function TaskCard({ task, onToggleDone, onTogglePriority, onRemove }: TaskCardProps) {
  const isRecurring = task.recurrence !== 'none'

  return (
    <div className={`task-card${task.done ? ' done' : ''}`}>
      <button
        type="button"
        className={`checkbox${task.done ? ' checked' : ''}`}
        onClick={() => onToggleDone(task.id)}
        aria-label={task.done ? 'Mark as not done' : 'Mark as done'}
      >
        {task.done && (
          <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3 8.5L6.5 12L13 4.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="task-main">
        <p className={`task-title${task.done ? ' done' : ''}`}>{task.title}</p>
        <div className="task-meta">
          <span className={`category-badge ${task.category}`}>{CATEGORY_LABEL[task.category]}</span>
          <span className="due-text">{task.due}</span>
          {isRecurring && (
            <span className="recurrence-badge" title={RECURRENCE_LABEL[task.recurrence]}>
              ↻ {task.recurrence}
            </span>
          )}
        </div>
        <div className="task-dates">
          Added {formatDate(task.createdAt)}
          {task.done && task.completedAt && <> · Completed {formatDate(task.completedAt)}</>}
        </div>
      </div>

      <div className="task-side">
        <AssigneeAvatar assignee={task.assignee} />
        <button
          type="button"
          className={`star-btn${task.priority ? ' active' : ''}`}
          onClick={() => onTogglePriority(task.id)}
          aria-label="Toggle priority"
        >
          ★
        </button>
        <button
          type="button"
          className="remove-btn"
          onClick={() => onRemove(task.id)}
          aria-label="Remove task"
        >
          ×
        </button>
      </div>
    </div>
  )
}
