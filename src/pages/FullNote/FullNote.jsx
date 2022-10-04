import './FullNote.css'
import { useApp } from '../../contexts/AppContext'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { Sidebar } from '../../components'
import toast from 'react-hot-toast'

export const FullNote = () => {
  const { state, dispatch } = useApp()
  const { id } = useParams()
  const navigate = useNavigate()
  const noteToShow = state.notes.find((note) => note._id === id)

  const deleteNoteHandler = async (noteId) => {
    toast('Deleting Note!', {
      icon: '⌛',
      duration: 2000
    });
    try {
      const deleteNote = await axios.delete(
        `https://raynotes-api.herokuapp.com/notes/${noteId}`,
        { headers: { Authorization: state.loggedInToken } },
      )
      if (deleteNote.data.success) {
        navigate('/')
        dispatch({ type: 'DELETE_NOTE', payload: deleteNote.data.note })
        toast.success('Note Deleted!')
      } else toast.error('Unable to Delete Note!')
    } catch (error) {
      toast.error('Error Deleting Note!')
      console.log(error)
    }
  }

  return (
    <div className='sidebarAndFullnote'>
      <Sidebar />
      <div className="fullNote">
        <div className="fullNoteHeading">
          <h4 className="fullNoteTitle">{noteToShow.title}</h4>
          <button
            className="fullNoteBtn"
            onClick={() => deleteNoteHandler(noteToShow._id)}
          >
            Delete
          </button>
        </div>
        <p className="fullNoteContent">{noteToShow.content}</p>
      </div>
    </div>
  )
}
