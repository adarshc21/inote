import React, { useContext, useState } from 'react'
import NoteContext from './NoteContext'

export default function NoteState(props) {

  const host = "http://localhost:5000/v1/api"
  const authToken = localStorage.getItem("authToken");
  
  const [notes, setNotes] = useState([]);

  // GET ALL NOTES
  async function getNotes() {
    const response = await fetch(`${host}/notes/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const data = await response.json();
    setNotes(data);
  }

  // ADD NOTES
  async function addNote(note) {
    const response = await fetch(`${host}/notes/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
      body: JSON.stringify(note),
    });
    const data = await response.json();
    console.log("Note added successfully..");
  }

  // DELETE NOTES
  async function deleteNote(note) {
    const response = await fetch(`${host}/notes/delete/${note._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken,
      },
    });
    const data = await response;
    console.log("Note deleted successfully..");
  }

  // UPDATE NOTES
  async function updateNote(note){
    const response = await fetch(`${host}/notes/update/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": authToken
      },
      body: JSON.stringify(note)
    })
    const data = await response;
    console.log("note updated successfully..");
  }

  return (
    <NoteContext.Provider value={{notes, getNotes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}
