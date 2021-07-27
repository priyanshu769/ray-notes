import { NavLink } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import './Sidebar.css'

export const Sidebar = () => {
  const { state } = useApp()
  return (
    <div className="sidebar">
      <h3 className="profileHeadline">Profile</h3>
      <p className="profileName">{state.profile.name}</p>
      <h3>Navigate</h3>
      <ul className="navLinks">
        <li className="navLinkLi">
          <NavLink activeClassName="activeNavLink" className="navLink" to="/">
            Home
          </NavLink>
        </li>
        <li className="navLinkLi">
          <NavLink
            activeClassName="activeNavLink"
            className="navLink"
            to="/create-note"
          >
            Create
          </NavLink>
        </li>
      </ul>
      <h3>Your Notes</h3>
      <ul className="noteTitles">
        {state.notes.map((note) => {
          return (
            <li className="noteTitleLi">
              <button className="noteTitleBtn">{note.title}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
