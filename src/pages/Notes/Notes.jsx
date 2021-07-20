import { useState } from 'react'
import { useApp } from '../../contexts/AppContext'

export const Notes = () => {
  const { state, dispatch } = useApp()
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  return (
    <div>
      <div>
        <input name="title" onChange={(e) => setNewPostTitle(e.target.value)} />
        <input
          name="context"
          onChange={(e) => setNewPostContent(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({
              type: 'ADD_NOTES',
              payload: {
                _id: Math.floor(Math.random() * 69),
                title: newPostTitle,
                content: newPostContent,
              },
            })
            setNewPostTitle(()=> '')
            setNewPostContent(()=> '')
          }}
        >
          Add Note
        </button>
      </div>
      <div>
        {state.notes.map((note) => {
          return (
            <div>
              <h1>{note.title}</h1>
              <p>{note.content}</p>
              <button
                onClick={() =>
                  dispatch({ type: 'DELETE_NOTES', payload: note })
                }
              >
                Del
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
