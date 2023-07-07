import React, { useState } from 'react'
import NotesList from './NotesList';
import swal from 'sweetalert'
const FetchNotes = () => {
    const [search, setSearch] = useState('');
    const [notes, setNotes] = useState([]);
    const handleChange = (e) => {
        setSearch(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:8800/fetch/", {
            method: 'POST',
            body: JSON.stringify({
                search: search
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            return response.json()
        }).then(data => {
            setNotes(data);
        }).catch(error => {
            window.alert(error);
            return;
        })
    }
    const deleteNote = async (id)=>{
        const newNotes = notes.filter((note) => note.id !== id)
        setNotes(newNotes);
        swal("Note deleted successfully","","success")
        await fetch("http://localhost:8800/delete", {
                method: 'POST',
                body: JSON.stringify({
                    id: id
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                return response.json()
            }).then(data => {
              
            }).catch(error => {
                window.alert(error);
                return;
            })
      }
      const updateNote = async (id,desc)=>{
        await fetch("http://localhost:8800/update", {
                method: 'POST',
                body: JSON.stringify({
                    id: id,
                    desc:desc,
                    search:search
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                return response.json()
            }).then(data => {
              setNotes(data);
            }).catch(error => {
                window.alert(error);
                return;
            })
            swal("Note updated successfully","","success")
      }

    return (
        <>
            <div className='font-mono text-2xl font-bold m-20'>Fetch Note</div>
            <div className='flex m-20'>
                <input type='text' name='search' placeholder="Search note by name..." className='border-black shadow-md p-3 w-108' onChange={handleChange}></input>
                <input type='submit' value={search === '' ? "Fetch All Notes" : "Fetch Notes"} className='ml-5 cursor-pointer bg-gray-200 shadow-md border-rounded p-2 hover:shadow-lg' onClick={handleSubmit}></input>
            </div>
            <div className='m-20'>
            <NotesList notes={notes} deleteNote={deleteNote} updateNote={updateNote} />
            </div>
        </>

    )
}

export default FetchNotes
