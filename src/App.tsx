import { useEffect, useRef, useState } from 'react'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import type { AssigneeFilter, CategoryFilter, NewTaskDraft, Task } from './types'
import { Header } from './components/Header'
import { MascotBubble } from './components/MascotBubble'
import { ProgressBar } from './components/ProgressBar'
import { AssigneeChips, CategoryChips } from './components/FilterChips'
import { TaskCard } from './components/TaskCard'
import { EmptyState, EmptyFilterState } from './components/EmptyState'
import { AddTaskSheet } from './components/AddTaskSheet'
import { CelebrationOverlay } from './components/CelebrationOverlay'
import './App.css'

const TASKS_COLLECTION = 'tasks'
const CELEBRATION_DURATION_MS = 1900

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filter, setFilter] = useState<AssigneeFilter>('all')
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false)
  const [mascotVisible, setMascotVisible] = useState(true)
  const [celebrating, setCelebrating] = useState(false)
  const celebrationTimer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const q = query(collection(db, TASKS_COLLECTION), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTasks(
        snapshot.docs.map((d) => {
          const data = d.data() as Omit<Task, 'id'>
          return {
            id: d.id,
            ...data,
            recurrence: data.recurrence ?? 'none',
            completedAt: data.completedAt ?? null,
          }
        }),
      )
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    return () => {
      if (celebrationTimer.current) window.clearTimeout(celebrationTimer.current)
    }
  }, [])

  const doneCount = tasks.filter((t) => t.done).length
  const totalCount = tasks.length

  const filteredTasks = tasks.filter(
    (t) =>
      (filter === 'all' || t.assignee === filter) &&
      (categoryFilter === 'all' || t.category === categoryFilter),
  )
  const activeTasks = filteredTasks.filter((t) => !t.done)
  const completedTasks = filteredTasks
    .filter((t) => t.done)
    .sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))

  function triggerCelebration() {
    if (celebrationTimer.current) window.clearTimeout(celebrationTimer.current)
    setCelebrating(true)
    celebrationTimer.current = window.setTimeout(() => {
      setCelebrating(false)
    }, CELEBRATION_DURATION_MS)
  }

  async function handleToggleDone(id: string) {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    const nextDone = !task.done

    await updateDoc(doc(db, TASKS_COLLECTION, id), {
      done: nextDone,
      completedAt: nextDone ? Date.now() : null,
    })

    if (nextDone) {
      triggerCelebration()
      if (task.recurrence !== 'none') {
        await addDoc(collection(db, TASKS_COLLECTION), {
          title: task.title,
          category: task.category,
          assignee: task.assignee,
          due: task.due,
          priority: task.priority,
          recurrence: task.recurrence,
          done: false,
          createdAt: Date.now(),
          completedAt: null,
        })
      }
    }
  }

  async function handleTogglePriority(id: string) {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    await updateDoc(doc(db, TASKS_COLLECTION, id), { priority: !task.priority })
  }

  async function handleRemove(id: string) {
    await deleteDoc(doc(db, TASKS_COLLECTION, id))
  }

  async function handleAddTask(draft: NewTaskDraft) {
    await addDoc(collection(db, TASKS_COLLECTION), {
      title: draft.title,
      category: draft.category,
      assignee: draft.assignee,
      due: draft.due,
      priority: draft.priority,
      recurrence: draft.recurrence,
      done: false,
      createdAt: Date.now(),
      completedAt: null,
    })
    setIsAddSheetOpen(false)
  }

  return (
    <div className="screen">
      <Header />
      <MascotBubble
        doneCount={doneCount}
        totalCount={totalCount}
        visible={mascotVisible}
        onToggle={() => setMascotVisible((v) => !v)}
      />
      <ProgressBar doneCount={doneCount} totalCount={totalCount} />
      <AssigneeChips value={filter} onChange={setFilter} />
      <CategoryChips value={categoryFilter} onChange={setCategoryFilter} />

      <div className="task-list">
        {totalCount === 0 ? (
          <EmptyState />
        ) : filteredTasks.length === 0 ? (
          <EmptyFilterState />
        ) : (
          <>
            {activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleDone={handleToggleDone}
                onTogglePriority={handleTogglePriority}
                onRemove={handleRemove}
              />
            ))}

            {completedTasks.length > 0 && (
              <>
                <div className="section-divider">Completed ({completedTasks.length})</div>
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleDone={handleToggleDone}
                    onTogglePriority={handleTogglePriority}
                    onRemove={handleRemove}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>

      <button type="button" className="fab" onClick={() => setIsAddSheetOpen(true)} aria-label="Add task">
        +
      </button>

      {isAddSheetOpen && (
        <AddTaskSheet onSubmit={handleAddTask} onClose={() => setIsAddSheetOpen(false)} />
      )}

      {celebrating && <CelebrationOverlay />}
    </div>
  )
}

export default App
