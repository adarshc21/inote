import React, { useContext, useState } from 'react'
import NoteContext from '../../context/note/NoteContext';

export default function AddNote() {

  const {addNote} = useContext(NoteContext)
  const [note, setNote] = useState({title:"", description:"", tag:"general"})
  
  function handleSubmit(e){
    e.preventDefault();
    addNote(note);
    e.target.reset();
  }

  function onChange(e){
      setNote({...note, [e.target.name]: e.target.value});
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container py-5">
            <h2 className="heading">Add Notes</h2>  
            <hr/>
            <input 
              type="text" 
              name="title" 
              placeholder='Title' 
              className='form-control mt-4 mb-3' 
              onChange={onChange}
            />
            
            <textarea 
              name="description"
              placeholder="Description"
              className="form-control my-3"
              rows="7"
              onChange={onChange}
            ></textarea>

            <select name='tag' onChange={onChange} defaultValue={note.tag} style={{border: "0"}}>
              <option value="general">General</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>

            <div className="py-2">
              <button className='btn btn-outline-primary my-2'>Add Note</button>
            </div>

        </div>
      </form>
      
    </>
  )
}
