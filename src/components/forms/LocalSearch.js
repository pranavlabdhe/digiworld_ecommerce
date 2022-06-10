import React from 'react'

const LocalSearch = ({keyword,setkeyword}) => {
    //Step 3 search and filter
    const handleSearchChange = (e)=>{
        e.preventDefault();
        setkeyword(e.target.value.toLowerCase())
    }   
  return (
    <div className='container pt-4 pb-4'>
    {/* Step 2 for searching and filter */}
    <input type="search" placeholder='search category' value={keyword} onChange={handleSearchChange}
    className="form-control mt-2"
    />
    </div>
  )
}

export default LocalSearch