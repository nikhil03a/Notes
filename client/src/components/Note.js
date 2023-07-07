import React, { useState } from 'react'
import {AiOutlineEdit,AiOutlineDelete} from 'react-icons/ai'
const Note = ({note,deleteNote,updateNote}) => {
  const [edit,setEdit] = useState(false);
  const [desc,setDesc] = useState(note.descr);
  const handleChange = (e)=>{
    setDesc(e.target.value);
  }
  return (
    <div className=' p-3 border-2 border-gray-200 shadow-md'>
      <div className='flex justify-between items-center'><div className='text-3xl text-bold'>{note.name}</div><div className='flex justify-between'><AiOutlineEdit className='hover:cursor-pointer' onClick={()=>{setEdit(true)}} /><pre>   </pre><AiOutlineDelete className='hover:cursor-pointer' onClick={()=>{deleteNote(note.id)}}/></div></div>
      <br></br>
      {!edit ? <p className='text-md font-sans text-center'>{note.descr}</p> : 
      <>
        <input type='text' value={desc} onChange={handleChange} className='border-black shadow-md p-3'></input><br></br>
        <div className='flex items-center justify-center mt-2'><input type='submit' className='cursor-pointer bg-gray-200 w-15 shadow-md border-rounded p-1 hover:shadow-lg ' value='Update' onClick={()=>{updateNote(note.id,desc);setEdit(false);}} ></input></div>
      </>}
      <div className='text-center font-bold mt-2'>Due Date</div>
      <div className='text-center'>{note.duedate}</div>
      <br></br>
      <div className='flex'><div className='text-bold font-extralight'>Created</div><div>: {note.createdat}</div> </div>
      <div className='flex'><div className='text-bold font-extralight'>Updated</div>:<div>{note.updatedat}</div> </div>

    </div>
  )
}

export default Note