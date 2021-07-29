import './FullNote.css'
import { useApp } from '../../contexts/AppContext'
import { useParams } from 'react-router'
import axios from 'axios'

export const FullNote = () => {
  const { state, dispatch } = useApp()
  const { id } = useParams()
  const noteToShow = state.notes.find((note) => note._id === id)

  const deleteNoteHandler = async (noteId) => {
    try {
      const deleteNote = await axios.delete(
        `http://raynotes-api.herokuapp.com/notes/${noteId}`,
        { headers: { Authorization: state.loggedInToken } },
      )
      console.log(deleteNote)
      if (deleteNote.data.success) {
        dispatch({ type: 'DELETE_NOTE', payload: deleteNote.data.note })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
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
  )
}
