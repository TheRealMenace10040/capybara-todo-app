import { useState } from 'react'
import type { Assignee, Category, DueLabel, NewTaskDraft, Recurrence, Task } from '../types'
import { DEFAULT_DRAFT } from '../types'
import { DAY_ABBR, DAY_NAMES, WEEKDAYS, WEEKEND_DAYS, isSameDaySet } from '../weekDays'

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

function draftFromTask(task: Task): NewTaskDraft {
  return {
    title: task.title,
    assignee: task.assignee,
    category: task.category,
    due: task.due,
    priority: task.priority,
    recurrence: task.recurrence,
    weekDays: task.weekDays,
  }
}

interface AddTaskSheetProps {
  editingTask?: Task | null
  onSubmit: (draft: NewTaskDraft) => void
  onDelete?: () => void
  onClose: () => void
}

export function AddTaskSheet({ editingTask, onSubmit, onDelete, onClose }: AddTaskSheetProps) {
  const [draft, setDraft] = useState<NewTaskDraft>(
    editingTask ? draftFromTask(editingTask) : DEFAULT_DRAFT,
  )

  const isEditing = !!editingTask
  const canSubmit = draft.title.trim().length > 0

  function handleSubmit() {
    if (!canSubmit) return
    onSubmit({ ...draft, title: draft.title.trim() })
  }

  return (
    <div className="sheet-scrim" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="drag-handle" />
        <h2 className="sheet-heading">{isEditing ? 'Edit task' : 'New task'}</h2>

        <div className="field">
          <input
            type="text"
            className="title-input"
            placeholder="What needs doing?"
            value={draft.title}
            onChange={(e) => {
              const title = e.target.value
              setDraft((prev) => ({ ...prev, title }))
            }}
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
                onClick={() => setDraft((prev) => ({ ...prev, assignee: opt.value }))}
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
                onClick={() => setDraft((prev) => ({ ...prev, category: opt.value }))}
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
                onClick={() => setDraft((prev) => ({ ...prev, due: opt }))}
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
                onClick={() =>
                  setDraft((prev) => ({
                    ...prev,
                    recurrence: opt.value,
                    weekDays: opt.value === 'weekly' ? prev.weekDays : [],
                  }))
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {draft.recurrence === 'weekly' && (
          <div className="field">
            <p className="field-label">Repeat on</p>
            <div className="day-shortcuts">
              <button
                type="button"
                className={isSameDaySet(draft.weekDays, WEEKDAYS) ? 'active' : ''}
                onClick={() => setDraft((prev) => ({ ...prev, weekDays: WEEKDAYS }))}
              >
                Weekdays
              </button>
              <button
                type="button"
                className={isSameDaySet(draft.weekDays, WEEKEND_DAYS) ? 'active' : ''}
                onClick={() => setDraft((prev) => ({ ...prev, weekDays: WEEKEND_DAYS }))}
              >
                Weekends
              </button>
            </div>
            <div className="day-picker">
              {DAY_ABBR.map((label, day) => (
                <button
                  key={day}
                  type="button"
                  className={draft.weekDays.includes(day) ? 'active' : ''}
                  aria-label={DAY_NAMES[day]}
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      weekDays: prev.weekDays.includes(day)
                        ? prev.weekDays.filter((d) => d !== day)
                        : [...prev.weekDays, day].sort((a, b) => a - b),
                    }))
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          className="priority-row"
          onClick={() => setDraft((prev) => ({ ...prev, priority: !prev.priority }))}
        >
          <span className={`star-btn${draft.priority ? ' active' : ''}`}>★</span>
          <span className="label">Mark as priority</span>
        </button>

        <button type="button" className="submit-btn" disabled={!canSubmit} onClick={handleSubmit}>
          {isEditing ? 'Save changes' : 'Add task'}
        </button>

        {isEditing && onDelete && (
          <button type="button" className="delete-btn" onClick={onDelete}>
            Delete task
          </button>
        )}
      </div>
    </div>
  )
}
