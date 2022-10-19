import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../../context/note/NoteContext'
import Note from './Note'

export default function Notes() {

  const {notes, getNotes, updateNote} = useContext(NoteContext)
  
  useEffect( ()=>{
    getNotes();
  })

  const ref = useRef(null);
  const [note, setNote] = useState({id:"", title:"", description: "", tag:""})

  function editNote(data){
    ref.current.click();
    setNote({id:data._id, title: data.title, description: data.description, tag: data.tag})
  }

  function handleSubmit(e){
    e.preventDefault();
    ref.current.click();
    updateNote(note);
    e.target.reset();
  }

  function onChange(e){
    setNote({...note, [e.target.name]:e.target.value});
  }
    

  return (
    <div className="container">
      <h2 className="heading">All Notes</h2>
      <hr />

      {/* Model */}
      <button ref={ref}  className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{display: "none"}}></button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleSubmit}>
                    <input 
                      type="text" 
                      name="title" 
                      placeholder='Title' 
                      className='form-control mt-0 mb-3' 
                      onChange={onChange}
                      value={note.title}
                    />
                    
                    <textarea 
                      name="description"
                      placeholder="Description"
                      className="form-control my-3"
                      rows="7"
                      onChange={onChange}
                      value={note.description}
                    ></textarea>

                    <select name='tag' onChange={onChange} defaultValue={note.tag} style={{border: "0"}}>
                      <option value="general">General</option>
                      <option value="personal">Personal</option>
                      <option value="other">Other</option>
                    </select>

                    <div className="modal-footer">
                      <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="submit" className='btn btn-outline-primary my-2'>Save changes</button>
                    </div>
              </form>
            </div>
            </div>
          </div>
      </div>
        
      <div className="row">
      { 
        notes.length >= 1 && notes.map(note => <Note data={note} key={note._id} editNote={editNote} />)
      }
      {
        notes.length <= 0 && <p className="py-5 text-center">Nothing to here to show please add notes.</p>
      }
      </div>
    </div>
  )
}
