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
import { createSub, removeSub,getSubs } from '../../../functions/sub'
const SubCategory = () => {
    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)
    const { user } = useSelector((state)=>({...state}));
    const [category,setCategory] = useState("")   // Parent cartgory
    const [categories,setCategories] = useState([]);
    const [keyword,setkeyword] = useState("");
    const [subs,setSubs] = useState([])
    // Search and filter 
    // Step 1 for searching and filter
 

    useEffect(()=>{
        loadCategories();
        loadSubs();
    },[])
    
    const loadCategories = () => {
        getCategories().then((c)=>setCategories(c.data));
    }
    const loadSubs = () => {
        getSubs().then((s)=>setSubs(s.data));
        // console.log();
    //     getSubs().then((s)=>{
           
    //     })
    }

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(name);
        setLoading(true)
        createSub({ name,parent:category },user.token)
        .then((res)=>{
            toast.success(`"${res.data.name} SubCategory created"`)
            setLoading(false)
            setName('')
            loadSubs();

        })
        .catch((err)=>{
            console.log(err);
            toast.error("SubCategory already exists in database or make sure the subcategory name is atleast 3 letters");
            setLoading(false)
        })
    }
    
        const handleRemove = async (slug) =>{
    
            if(window.confirm("ARE YOU SURE YOU WANT TO DELETE THE SUBCATEGORY ?")){
                setLoading(true)
               removeSub(slug,user.token)
               .then((res)=>{
                   setLoading(false)
                
                   toast.error(`${res.data.name} deleted`)
                   loadSubs();
 
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
                    {loading?(<h4 className='text-secondary'>Loading</h4>): (<h4>Create SubCategory</h4>)}
                    <div className='form-group'>
                      <label className='mt-2'>Main Category</label>
                      <select name='category' className='form-control mt-2 ' onChange={(e)=> setCategory(e.target.value)}>
                      <option>---Please select category---</option>
                        {categories.length > 0 && categories.map((c)=>{
                            return(
                                <option key={c._id} value={c._id}>{c.name}</option>
                            )
                        })}
                      </select>
                  </div>
                  <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                  {/* Step 2 and 3 in Local Search */}
         
          
                <LocalSearch keyword={keyword} setkeyword={setkeyword}/>
                    {/* {JSON.stringify(category)} */}
                    {/* {JSON.stringify(categories)} */}
                    {/* Step 5 */}
                    
                 
                            {subs.filter(searched(keyword)).map((c)=>{
                    return(
                        <div key={c._id} className="alert alert-secondary">
                        {c.name}{" "}
                        <span onClick={()=> handleRemove(c.slug)} className='btn btn-sm float-end'>
                            <DeleteOutlined className='text-danger'/>
                        </span>
                        <Link to={`/admin/sub/${c.slug}`}>

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

export default SubCategory