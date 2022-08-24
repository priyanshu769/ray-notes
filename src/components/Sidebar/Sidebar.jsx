import { useNavigate } from 'react-router'
import { useApp } from '../../contexts/AppContext'
import './Sidebar.css'

export const Sidebar = () => {
    const { state, dispatch } = useApp()
    const navigate = useNavigate()
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
        <div style={{ display: state.loggedInToken ? 'block' : 'none' }}>
            <p className="profileName">Hi, {`${state.profile.name.split(' ')[0]}`}!</p>
            <button className='navBtn' onClick={() => navigate('/')}>Home</button>
            <br />
            <button className='navBtn' onClick={() => navigate('/create-note')}>Create Note</button>
            <h4>Notes</h4>
            {state.notes.map(note => {
                return (<div>
                    <button className="noteTitleBtn" onClick={() => navigate(`/note/${note._id}`)} >{note.title}</button>
                </div>)
            })}
            <br />
            <button className='noteBtn' onClick={logoutHandler}>Logout</button>
        </div>
    )
}
