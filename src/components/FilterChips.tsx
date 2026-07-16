import type { AssigneeFilter, CategoryFilter } from '../types'

const ASSIGNEE_OPTIONS: { value: AssigneeFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'dennis', label: 'Dennis' },
  { value: 'ramila', label: 'Ramila' },
  { value: 'both', label: 'Both' },
]

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'chores', label: 'Chores' },
  { value: 'errands', label: 'Errands' },
  { value: 'dates', label: 'Dates' },
  { value: 'other', label: 'Other' },
]

interface AssigneeChipsProps {
  value: AssigneeFilter
  onChange: (value: AssigneeFilter) => void
}

export function AssigneeChips({ value, onChange }: AssigneeChipsProps) {
  return (
    <div className="chip-row">
      {ASSIGNEE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`chip${value === opt.value ? ' active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

interface CategoryChipsProps {
  value: CategoryFilter
  onChange: (value: CategoryFilter) => void
}

export function CategoryChips({ value, onChange }: CategoryChipsProps) {
  return (
    <div className="chip-row categories">
      {CATEGORY_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`chip category${value === opt.value ? ' active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
