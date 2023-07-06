import React from 'react'
import Note from './Note'
const NotesList = ({notes}) => {
  return (
    <div className='flex space-x-4'>
        {notes.map((note)=>{
            return <Note note={note} />
        })}
    </div>
  )
}

export default NotesList
