import React from 'react'

const CategoryForm = ({name,setName,handleSubmit}) => {
        return(
            <form onSubmit={handleSubmit}>
                <div className='className="form-group"'>
                <label>Name</label>
                <input type="text" className='form-control'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                autoFocus
                />
                <button className='btn btn-outline-primary mt-2'>Save</button>
            </div>
                </form>
        )
    }

export default CategoryForm