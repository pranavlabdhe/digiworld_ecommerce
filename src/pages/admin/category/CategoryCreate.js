import React from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createCategory, getCategories, removeCategory } from '../../../functions/category'
import { Link } from 'react-router-dom'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'



const CategoryCreate = () => {
const [name,setName] = useState('')
const [loading,setLoading] = useState(false)
const { user } = useSelector((state)=>({...state}));
const [categories,setCategories] = useState([]);
// Search and filter 
// Step 1 for searching and filter
const [keyword,setkeyword] = useState("");
useEffect(()=>{
    loadCategories();
},[])

const loadCategories = () => {
    getCategories().then((c)=>setCategories(c.data));
}

const handleSubmit = (e) =>{
    e.preventDefault();
    // console.log(name);
    setLoading(true)
    createCategory({ name },user.token)
    .then((res)=>{
        toast.success(`"${res.data.name} Category created"`)
        loadCategories();
        setLoading(false)
        setName('')

    })
    .catch((err)=>{
        console.log(err);
        toast.error("Category already exists in database or make sure the category name is atleast 3 letters");
        
        setLoading(false)
    })
}

    const handleRemove = async (slug) =>{

        if(window.confirm("ARE YOU SURE YOU WANT TO DELETE THE CATEGORY ?")){
            setLoading(true)
           removeCategory(slug,user.token)
           .then((res)=>{
               setLoading(false)
               toast.error(`${res.data.name} deleted`)
               loadCategories();
           })
           .catch((err)=>{
               toast.err(err.message)
               setLoading(false)
               
           }) 
        }
    }

    
    //step 4 search and filter
    // higher order function
    const searched = (keyword) => (c)=> c.name.toLowerCase().includes(keyword)

  return (
    <>
   <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'><AdminNav/></div>
            <div className='col'>
                {loading?(<h4 className='text-secondary'>Loading</h4>): (<h4>CreateCategory</h4>)}
              <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
              {/* Step 2 and 3 in Local Search */}
            <LocalSearch keyword={keyword} setkeyword={setkeyword}/>
         
                {/* {JSON.stringify(categories)} */}
                {/* Step 5 */}

                {categories.filter(searched(keyword)).map((c)=>{
                    return(
                        <div key={c._id} className="alert alert-secondary">
                        {c.name}{" "}
                        <span onClick={()=> handleRemove(c.slug)} className='btn btn-sm float-end'>
                            <DeleteOutlined className='text-danger'/>
                        </span>
                        <Link to={`/admin/category/${c.slug}`}>

                        <span className='btn btn-sm float-end'>
                        <EditOutlined className='text-warning'/>
                        </span>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
    </>
  )
}

export default CategoryCreate