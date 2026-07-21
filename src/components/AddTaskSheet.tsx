import { useState } from 'react'
import type { Assignee, Category, DueLabel, NewTaskDraft, Recurrence } from '../types'
import { DEFAULT_DRAFT } from '../types'

const ASSIGNEE_OPTIONS: { value: Assignee; label: string }[] = [
  { value: 'dennis', label: 'Dennis' },
  { value: 'ramila', label: 'Ramila' },
  { value: 'both', label: 'Both' },
]

const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'chores', label: 'Chores' },
  { value: 'errands', label: 'Errands' },
  { value: 'dates', label: 'Dates' },
  { value: 'other', label: 'Other' },
]

const DUE_OPTIONS: DueLabel[] = ['Today', 'Tomorrow', 'This week']

const RECURRENCE_OPTIONS: { value: Recurrence; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
]

interface AddTaskSheetProps {
  onSubmit: (draft: NewTaskDraft) => void
  onClose: () => void
}

export function AddTaskSheet({ onSubmit, onClose }: AddTaskSheetProps) {
  const [draft, setDraft] = useState<NewTaskDraft>(DEFAULT_DRAFT)

  const canSubmit = draft.title.trim().length > 0

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({ ...draft, title: draft.title.trim() })
  }

  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <h2 className="sheet-heading">New task</h2>

        <div className="field">
          <input
            type="text"
            className="title-input"
            placeholder="What needs doing?"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            autoFocus
          />
        </div>

        <div className="field">
          <p className="field-label">Assign to</p>
          <div className="segmented">
            {ASSIGNEE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={draft.assignee === opt.value ? 'active' : ''}
                onClick={() => setDraft({ ...draft, assignee: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <p className="field-label">Category</p>
          <div className="category-buttons">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={draft.category === opt.value ? `active ${opt.value}` : ''}
                onClick={() => setDraft({ ...draft, category: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <p className="field-label">Due</p>
          <div className="segmented">
            {DUE_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                className={draft.due === opt ? 'active' : ''}
                onClick={() => setDraft({ ...draft, due: opt })}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <p className="field-label">Repeat</p>
          <div className="repeat-buttons">
            {RECURRENCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={draft.recurrence === opt.value ? 'active' : ''}
                onClick={() => setDraft({ ...draft, recurrence: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="priority-row"
          onClick={() => setDraft({ ...draft, priority: !draft.priority })}
        >
          <span className={`star-btn${draft.priority ? ' active' : ''}`}>★</span>
          <span className="label">Mark as priority</span>
        </button>

        <button type="button" className="submit-btn" disabled={!canSubmit} onClick={handleSubmit}>
          Add task
        </button>
      </div>
    </div>
  )
}
