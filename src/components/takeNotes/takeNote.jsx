import { useState } from 'react'
import './takeNote.css'

export const TakeNote = (props) => {
  const [showColorOptions, setShowColorOptions] = useState(false)
  const [textarea, setTextarea] = useState('')

  const autoTextareaHeight = () => {
    if (textarea.length < 80) {
      return '100px'
    }
    if (textarea.length >= 70) {
      return `${textarea.length}px`
    }
  }

  return (
    <div className="takeNote">
      <input
        placeholder="Title"
        className="addNoteInput addNoteTitleInput"
        name="title"
        onChange={props.onTitleChange}
      />
      <textarea
        placeholder="Content"
        className="addNoteInput addNoteContentInput"
        style={{ height: autoTextareaHeight() }}
        name="content"
        onChange={(props.onContentChange, (e) => setTextarea(e.target.value))}
      ></textarea>
      <button className="addNoteBtn" onClick={props.addNoteBtnClick}>
        Add
      </button>
      <button
        className="addNoteBtn"
        onClick={() => setShowColorOptions(!showColorOptions)}
        name="color"
      >
        Color
      </button>
      <button
        className={(props.pinBtn, 'addNoteBtn')}
        onClick={props.pinBtnClick}
        name="pin"
      >
        Pin
      </button>
      <div
        style={{ display: showColorOptions ? 'block' : 'none' }}
        className="Colors"
      >
        <button
          onClick={props.function}
          name="red"
          className="colorBtn red"
        ></button>
        <button
          onClick={props.function}
          name="green"
          className="colorBtn green"
        ></button>
        <button
          onClick={props.function}
          name="blue"
          className="colorBtn blue"
        ></button>
        <button
          onClick={props.function}
          name="yellow"
          className="colorBtn yellow"
        ></button>
      </div>
    </div>
  )
}
