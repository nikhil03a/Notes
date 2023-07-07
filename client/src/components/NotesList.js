import React from 'react'
import Note from './Note'
const NotesList = ({notes,deleteNote,updateNote}) => {
  return (
    <div className='flex space-x-4'>
        {notes.map((note)=>{
            return <Note note={note} deleteNote={deleteNote} updateNote={updateNote}/>
        })}
    </div>
  )
}

export default NotesList
