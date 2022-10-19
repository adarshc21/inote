import React from 'react'

export default function EditNote() {

  function handleSubmit(){

  }

  function onChange(){

  }

  return (
    <>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
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

                    <div className="modal-footer">
                      <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className='btn btn-outline-primary my-2' onClick={handleSubmit}>Save changes</button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
