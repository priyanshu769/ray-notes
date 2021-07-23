import './Note.css'
import {SeeMore} from "../index"
import React from 'react'

export const Note = (props) => {
  return (
    <div style={{ backgroundColor: props.noteBg }} className="theNote">
      <h4 className="noteTitle">{props.title}</h4>
      <p className="noteContent">{props.content}<SeeMore contentLength={props.contentLength} noteId={props.noteId}/></p>
      <hr />
      <button className="noteBtn" onClick={props.deleteBtnClick}>
        Delete
      </button>
    </div>
  )
}
