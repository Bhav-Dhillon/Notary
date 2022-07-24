import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import { nanoid } from "nanoid"

function App() {
  const [count, setCount] = useState(0)

  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || [])

  const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || "")

  React.useEffect(() =>
  {
      localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])



  function createNewNote()
  {
      const newNote = {
          id: nanoid(),
          body: "# Type your markdown note's title here"
      }
      setNotes(prevNotes => [newNote, ...prevNotes])
      setCurrentNoteId(newNote.id)
  }


  function updateNote(text)
  {
      // Put the most recently-modified note at the top
      setNotes(oldNotes =>
      {
          const newArray = []
          for (let i = 0; i < oldNotes.length; i++)
          {
              const oldNote = oldNotes[i]
              if (oldNote.id === currentNoteId)
              {
                  newArray.unshift({ ...oldNote, body: text })
              } else
              {
                  newArray.push(oldNote)
              }
          }
          return newArray
      })
  }



  function deleteNote(event, noteId)
  {
      event.stopPropagation()
      setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
  }


  function findCurrentNote()
  {
      return notes.find(note =>
      {
          return note.id === currentNoteId
      }) || notes[0]
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
