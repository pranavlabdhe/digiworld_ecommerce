// O
// import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory,getCategories } from "../../../functions/category";
import CategoryForm from '../../../components/forms/CategoryForm'
import { createSub, removeSub,getSubs,getSub, updateSub } from '../../../functions/sub'
const SubCategoryUpdate = ({match,history}) => {
    const [name,setName] = useState('')
    const [loading,setLoading] = useState(false)
    const { user } = useSelector((state)=>({...state}));
    const [categories,setCategories] = useState([]);
    const [parent,setParent] = useState("")

    useEffect(()=>{
        loadCategories();
        loadSub();
    },[])
    
    const loadCategories = () => {
        getCategories().then((c)=>{
            setCategories(c.data)
            // console.log(c.data);
        })
    }
    const loadSub = () => {
        getSub(match.params.slug).then((c)=>{
            setName(c.data.data.name);
            setParent(c.data.data.parent)
            // console.log(c.data);
        })
    }

    
    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(name);
        setLoading(true)
        updateSub(match.params.slug,{name,parent},user.token)
        .then((res)=>{
            toast.success(`"${res.data.name} SubCategory created"`)
            setLoading(false)
            setName('')
            console.log(res.data);
            history.push('/admin/sub')

        })
        .catch((err)=>{
            console.log(err);
            setLoading(false)
            if(err.response.status === 400) toast.error("SubCategory already exists in database or make sure the subcategory name is atleast 3 letters");
        });
    };
        
  return (
        <>
       <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'><AdminNav/></div>
                <div className='col'>
                    {loading?(<h4 className='text-secondary'>Loading</h4>): (<h4>Update SubCategory</h4>)}
                    <div className='form-group'>
                      <label className='mt-2'>Main Category</label>
                      <select name='category' className='form-control mt-2 ' onChange={(e)=> setParent(e.target.value)}>
                      <option>---Please select category---</option>
                        {categories.length > 0 && categories.map((c)=>{
                            return(
                                <option key={c._id} value={c._id} selected={c._id === parent}>{c.name}</option>
                            )
                        })}
                      </select>
                  </div>
                  <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
            
                </div>
            </div>
        </div>
        </>
      )
}

export default SubCategoryUpdate