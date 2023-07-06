import React from 'react'

const Note = ({note}) => {
  return (
    <div className=' p-3 border-2 border-gray-200 shadow-md'>
      <div className='text-3xl text-bold'>{note.name}</div>
      <br></br>
      <p className='text-lg font-serif'>{note.descr}</p>
      <br></br>
      <p className='flex'><div className='text-bold'>Created</div> : {note.createdat}</p>
    </div>
  )
}

export default Note