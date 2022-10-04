import { useState } from 'react'
import './TakeNote.css'

export const TakeNote = (props) => {
  const [showColorOptions, setShowColorOptions] = useState(false)

  return (
    <div style={{ backgroundColor: props.takeNoteColor }} className="takeNote">
      <input
        placeholder="Title"
        className="addNoteInput addNoteTitleInput"
        name="title"
        value={props.titleValue}
        onChange={props.onTitleChange}
      />
      <textarea
        placeholder="Content"
        className="addNoteInput addNoteContentInput"
        style={{ height: props.textareaHeight }}
        name="content"
        value={props.contentValue}
        onChange={props.onContentChange}
      ></textarea>
      <button
        type="submit"
        className="addNoteBtn"
        onClick={props.addNoteBtnClick}
      >
        Add
      </button>
      <button
        className="addNoteBtn"
        onClick={() => setShowColorOptions(!showColorOptions)}
        name="color"
      >
        Color
      </button>
      <button className={props.pinBtn} onClick={props.pinBtnClick} name="pin">
        Pin
      </button>
      <div
        style={{ display: showColorOptions ? 'block' : 'none' }}
        className="Colors"
      >
        <button
          onClick={props.colorChosen}
          name="red"
          className="colorBtn red"
        ></button>
        <button
          onClick={props.colorChosen}
          name="green"
          className="colorBtn green"
        ></button>
        <button
          onClick={props.colorChosen}
          name="blue"
          className="colorBtn blue"
        ></button>
        <button
          onClick={props.colorChosen}
          name="yellow"
          className="colorBtn yellow"
        ></button>
        <button
          onClick={props.colorChosen}
          name="white"
          className="colorBtn white"
        ></button>
      </div>
    </div>
  )
}
