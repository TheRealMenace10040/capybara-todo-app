import mascotCalm from '../assets/mascot-calm3.png'

export function EmptyState() {
  return (
    <div className="empty-state">
      <img src={mascotCalm} alt="" />
      <p className="empty-title">Nothing to do</p>
      <p className="empty-sub">Relax like a capybara. Add your first task below.</p>
    </div>
  )
}

export function EmptyFilterState() {
  return <p className="empty-filtered">No tasks match this filter.</p>
}
