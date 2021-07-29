import './CreateNote.css'
import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../contexts/AppContext'
import axios from 'axios'

export const CreateNote = () => {
  const { state, dispatch } = useApp()
  const contentFocus = useRef()
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [noteColor, setNoteColor] = useState('#ffffff')
  const [pinBtn, setPinBtn] = useState(false)

  const colorChosen = (e) => {
    console.log(e.target.name)
    if (e.target.name === 'red') {
      return setNoteColor('#ff2e63')
    }
    if (e.target.name === 'green') {
      return setNoteColor('#00b8a9')
    }
    if (e.target.name === 'blue') {
      return setNoteColor('#3490de')
    }
    if (e.target.name === 'yellow') {
      return setNoteColor('#f9ed69')
    }
  }

  useEffect(() => {
    ;(() => {
      const temporaryData = state.temporaryData
      if (temporaryData) {
        setNewPostTitle(temporaryData.title)
        setNewPostContent(temporaryData.content)
        setNoteColor(temporaryData.color)
        setPinBtn(temporaryData.pinned)
        dispatch({type: "SET_TEMPORARY_DATA", payload: null})
      }
    })()
  }, [state.temporaryData, dispatch])

  useEffect(() => {
    contentFocus.current.focus();
  }, [])

  const addNoteHandler = async () => {
    const noteToAdd = {
      title: newPostTitle,
      content: newPostContent,
      color: noteColor,
      pinned: pinBtn,
      user: {
        userId: state.profile.userId,
      },
    }
    console.log(noteToAdd)
    try {
      const noteAdded = await axios.post(
        'https://raynotes-api.herokuapp.com/notes',
        noteToAdd,
        { headers: { Authorization: state.loggedInToken } },
      )
      console.log(noteAdded)
      if (noteAdded.data.success) {
        dispatch({ type: 'ADD_NOTE', payload: noteAdded.data.noteAdded })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="createNote">
      <div className="createNoteFirstRow">
        <input
          className="createNoteInput createNoteInputTitle"
          name="title"
          placeholder="Title"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
        />
        <button
          className="createNoteBtn"
          name="add note"
          onClick={() => {
            addNoteHandler()
            setNewPostTitle('')
            setNewPostContent('')
            setNoteColor('#ffffff')
            setPinBtn(false)
          }}
        >
          Add
        </button>
        <button
          onClick={colorChosen}
          name="red"
          className="createNoteColorBtn red"
        ></button>
        <button
          onClick={colorChosen}
          name="green"
          className="createNoteColorBtn green"
        ></button>
        <button
          onClick={colorChosen}
          name="blue"
          className="createNoteColorBtn blue"
        ></button>
        <button
          onClick={colorChosen}
          name="yellow"
          className="createNoteColorBtn yellow"
        ></button>
        <button
          onClick={colorChosen}
          name="white"
          className="createNoteColorBtn white"
        ></button>
        <button
          className="createNoteBtn"
          name="pin note"
          onClick={() => setPinBtn(!pinBtn)}
        >
          Pin
        </button>
      </div>
      <textarea
        className="createNoteInput createNoteInputContent"
        name="content"
        value={newPostContent}
        placeholder="Content"
        ref={contentFocus}
        onChange={(e) => setNewPostContent(e.target.value)}
      ></textarea>
    </div>
  )
}
