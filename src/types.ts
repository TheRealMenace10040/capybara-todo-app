export type Assignee = 'dennis' | 'ramila' | 'both'
export type Category = 'chores' | 'errands' | 'dates' | 'other'
export type DueLabel = 'Today' | 'Tomorrow' | 'This week'
export type Recurrence = 'none' | 'daily' | 'weekly' | 'monthly'

export interface Task {
  id: string
  title: string
  category: Category
  assignee: Assignee
  due: DueLabel
  priority: boolean
  done: boolean
  recurrence: Recurrence
  weekDays: number[]
  createdAt: number
  completedAt: number | null
}

export type AssigneeFilter = 'all' | Assignee
export type CategoryFilter = 'all' | Category

export interface NewTaskDraft {
  title: string
  assignee: Assignee
  category: Category
  due: DueLabel
  priority: boolean
  recurrence: Recurrence
  weekDays: number[]
}

export const DEFAULT_DRAFT: NewTaskDraft = {
  title: '',
  assignee: 'both',
  category: 'chores',
  due: 'Today',
  priority: false,
  recurrence: 'none',
  weekDays: [],
}
