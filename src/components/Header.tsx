import avatarDennis from '../assets/avatar-dennis.png'
import avatarRamila from '../assets/avatar-ramila.png'
import heartIcon from '../assets/heart-icon.png'

export function Header() {
  return (
    <div className="header">
      <div className="avatars">
        <img src={avatarDennis} alt="Dennis" className="avatar-img" />
        <img src={avatarRamila} alt="Ramila" className="avatar-img" />
      </div>
      <div className="title-block">
        <p className="title">Our Todos</p>
        <p className="subtitle">Dennis & Ramila</p>
      </div>
      <img src={heartIcon} alt="" className="heart-icon" />
    </div>
  )
}
