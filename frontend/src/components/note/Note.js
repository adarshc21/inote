import React, { useContext } from "react";
import NoteContext from "../../context/note/NoteContext";

export default function Note({ data, editNote }) {
  const { _id, title, description, tag } = data;
  const {deleteNote} = useContext(NoteContext);

  return (
    <div id={_id} className="col col-lg-3 col-md-4 col-sm-6 col-12 p-2">
      <div className="card">
        <div className="card-header" style={{textTransform:"capitalize"}}>{tag}</div>
        
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
          
          <div className="btn-wrapper d-flex justify-content-end gap-2">
            <div className="btn btn-outline-primary" onClick={ ()=> editNote(data) }>Update</div>
            <button className="btn btn-outline-danger" onClick={ ()=> deleteNote(data) }>Delete</button>
          </div>
        </div>
      
      </div>
    </div>
  );
}
