import { NavLink } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import './Sidebar.css'

export const Sidebar = () => {
  const { state, dispatch } = useApp()
  const logoutHandler = () => {
    localStorage.removeItem('token')
    dispatch({ type: 'SET_LOGGEDIN_TOKEN', payload: null })
    dispatch({
      type: 'SET_PROFILE',
      payload: {
        userId: 'u123',
        name: 'James Bucky Barns',
      },
    })
    dispatch({
      type: 'SET_NOTES',
      payload: [
        {
          _id: 'n123',
          title: 'Note Example',
          content: 'Your note will look like this. Go create your first Note',
          color: '#ffffff',
          pinned: false,
          user: {
            userId: 'u123',
          },
        },
      ],
    })
  }
  return (
    <div
      style={{ display: state.loggedInToken ? 'block' : 'none' }}
      className="sidebar"
    >
      <h3 className="profileHeadline">Profile</h3>
      <p className="profileName">{`${state.profile.name.split(' ')[0]}`}</p>
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
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  )
}
