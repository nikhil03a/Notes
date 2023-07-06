import React, { useState } from 'react'
import NotesList from './NotesList';

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


    return (
        <>
            <div className='flex m-20'>
                <input type='text' name='search' placeholder='Search note' className='border-black shadow-md p-3' onChange={handleChange}></input>
                <input type='submit' value="Fetch Notes" className='ml-5' onClick={handleSubmit}></input>
            </div>
            <div className='m-20'>
            <NotesList notes={notes} />
            </div>
        </>

    )
}

export default FetchNotes
