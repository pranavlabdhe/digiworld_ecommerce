import React from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
const Search = () => {
  let dispatch = useDispatch();
  const { search } =useSelector((state)=>({...state}));
  const { text } = search;
  const history = useHistory()
  const handleChange = (e) =>{
    dispatch({
        type:"SEARCH_QUERY",
        payload:{ text:e.target.value }
    });
  };
  const handleSubmit = (e)=>{
    e.preventDefault();
    history.push(`/shop/?${text}`);
  };
  return (
    <>
    <form className='form-inline my-lg-0' onSubmit={handleSubmit}>
    <input type="search" value={text} className="form-control mt-2 me-sm-2" placeholder='search' onChange={handleChange} />
    <SearchOutlined onClick={handleSubmit} style={{cursor:"pointer"}} className="search_icon"/>
    </form>

    </>
  )
}

export default Search