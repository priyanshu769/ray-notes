import './Homepage.css'
import { useState, useEffect } from 'react'
import { useApp } from '../../contexts/AppContext'
import { TakeNote, Note } from '../../components/index'
import { useNavigate } from 'react-router'
import axios from 'axios'

export const Homepage = () => {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [noteColor, setNoteColor] = useState('#ffffff')
  const [pinBtn, setPinBtn] = useState(false)
  // const [noteAddedStatus, setNoteAddedStatus] = useState(null)
  const autoTextareaHeight = () => {
    if (newPostContent.length < 128) {
      return '9rem'
    }
    if (newPostContent.length >= 128) {
      return `${newPostContent.length}px`
    }
  }

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
    if (e.target.name === 'white') {
      return setNoteColor('#ffffff')
    }
  }
  useEffect(() => {
    ;(async () => {
      try {
        const notesRes = await axios.get(
          'http://raynotes-api.herokuapp.com/notes',
          { headers: { Authorization: state.loggedInToken } },
        )
        if (notesRes.data.success === true) {
          return dispatch({ type: 'SET_NOTES', payload: notesRes.data.notes })
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [state.loggedInToken, dispatch])

  useEffect(() => {
    ;(() => {
      if (newPostContent.length > 128) {
        dispatch({
          type: 'SET_TEMPORARY_DATA',
          payload: {
            _id: Math.floor(Math.random() * 69),
            title: newPostTitle,
            content: newPostContent,
            color: noteColor,
            pinned: pinBtn,
          },
        })
        navigate('/create-note')
      }
    })()
  }, [newPostContent, dispatch, navigate, newPostTitle, noteColor, pinBtn])

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
        'http://raynotes-api.herokuapp.com/notes',
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

  const deleteNoteHandler = async(noteId) => {
    try{
      const deleteNote = await axios.delete(`http://raynotes-api.herokuapp.com/notes/${noteId}`, { headers: { Authorization: state.loggedInToken } })
      console.log(deleteNote)
      if (deleteNote.data.success){
        dispatch({ type: 'DELETE_NOTE', payload: deleteNote.data.note })
      }
    } catch (error){
      console.log(error)
    }
  }

  const unPinnedNotes = state.notes
    .filter((note) => note.pinned === false)
    .reverse()
  const pinnedNotes = state.notes
    .filter((note) => note.pinned === true)
    .reverse()

  return (
    <div className="homepage">
      <TakeNote
        onTitleChange={(e) => setNewPostTitle(e.target.value)}
        onContentChange={(e) => setNewPostContent(e.target.value)}
        pinBtnClick={() => setPinBtn(!pinBtn)}
        textareaHeight={autoTextareaHeight()}
        pinBtn={pinBtn ? 'pinOn addNoteBtn' : 'pinOff addNoteBtn'}
        colorChosen={colorChosen}
        takeNoteColor={noteColor}
        titleValue={newPostTitle}
        contentValue={newPostContent}
        addNoteBtnClick={() => {
          addNoteHandler()
          setNewPostTitle('')
          setNewPostContent('')
          setPinBtn(false)
          setNoteColor('#ffffff')
        }}
      />
      {pinnedNotes.map((note) => {
        return (
          <Note
            title={
              note.title.length <= 20
                ? note.title
                : `${note.title.slice(0, 15)}...`
            }
            content={
              note.content.length <= 128
                ? note.content
                : note.content.slice(0, 160)
            }
            noteId={note._id}
            contentLength={note.content.length}
            noteBg={note.color}
            pinned={note.pinned}
            // editBtnClick={() => {
            //   setNewPostTitle(note.title)
            //   setNewPostContent(note.content)
            //   setNoteColor(note.color)
            //   setPinBtn(note.pinned)
            //   dispatch({ type: 'DELETE_NOTE', payload: note })
            // }}
            deleteBtnClick={() =>
              deleteNoteHandler(note._id)
            }
          />
        )
      })}
      {unPinnedNotes.map((note) => {
        return (
          <Note
            title={
              note.title.length <= 20
                ? note.title
                : `${note.title.slice(0, 15)}...`
            }
            content={
              note.content.length <= 128
                ? note.content
                : note.content.slice(0, 160)
            }
            noteId={note._id}
            contentLength={note.content.length}
            noteBg={note.color}
            pinned={note.pinned}
            // editBtnClick={() => {
            //   setNewPostTitle(note.title)
            //   setNewPostTitle(note.content)
            //   setNoteColor(note.color)
            //   setPinBtn(note.pinned)
            //   dispatch({ type: 'DELETE_NOTE', payload: note })
            // }}
            deleteBtnClick={() =>
              deleteNoteHandler(note._id)
            }
          />
        )
      })}
    </div>
  )
}
