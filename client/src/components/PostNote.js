import React, { useState } from 'react'
import swal from 'sweetalert'
const PostNote = () => {
    const [data, setData] = useState({
        name: "",
        desc: "",
        ddate: "",
        dtime: ""
    })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(data.name === '' || data.desc === '' || data.ddate === '' || data.dtime ===''){
            swal("Error","All fields are mandatory","error");
            return;
        }
        swal("Success","Note posted successfully",'success');
        await fetch("http://localhost:8800/post/", {
            method: 'POST',
            body: JSON.stringify({
                name: data.name,
                desc: data.desc,
                ddate: data.ddate,
                dtime: data.dtime
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                
                return response.json()
            })
            .then(data => {
                
            })
            .catch(error => {
                window.alert(error);
                return;
            })
    }
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate() + 1;
    var year = dtToday.getFullYear();
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var minDate = year + '-' + month + '-' + day;
    return (
        <div className='m-20'>
            <div className='flex flex-col'>
                <label className='text-lg font-mono'>Name: </label>
                <input type='text' name='name' value={data.name} onChange={handleChange} className='border-black shadow-md p-3'></input><br></br>
                <label className='text-lg font-mono'>Description: </label>
                <textarea type='text' name='desc' value={data.desc} rows={5} cols={20} onChange={handleChange} className='border-black shadow-md p-3'></textarea><br></br>
                <label className='text-lg font-mono' min={minDate}>Due Date:</label>
                <input type='date' name='ddate' value={data.ddate} onChange={handleChange} className='border-black shadow-md p-3'></input><br></br>
                <label className='text-lg font-mono'>Due Time:</label>
                <input type='time' name='dtime' value={data.dtime} onChange={handleChange} className='border-black shadow-md p-3'></input><br></br>
                <input type='submit' onClick={handleSubmit} className='cursor-pointer bg-gray-200 w-20 shadow-md border-rounded p-2 hover:shadow-lg'></input>
            </div>
        </div>
    )
}

export default PostNote
