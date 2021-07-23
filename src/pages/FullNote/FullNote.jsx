import './FullNote.css'
import { useApp } from '../../contexts/AppContext'
import { useParams } from 'react-router'

export const FullNote = () => {
  const { state, dispatch } = useApp()
  const { id } = useParams()
  const noteToShow = state.notes.find((note) => note._id === id)
  console.log(noteToShow)
  return (
    <div className="fullNote">
      <div className="fullNoteHeading">
        <h4 className="fullNoteTitle">{noteToShow.title}</h4>
        <button
          className="fullNoteBtn"
          onClick={() =>
            dispatch({ type: 'DELETE_NOTES', payload: noteToShow })
          }
        >
          Delete
        </button>
      </div>
      <p className="fullNoteContent">{noteToShow.content}</p>
    </div>
  )
}
