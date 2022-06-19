import React from 'react'

import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories,getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'


const initialState  = {
    title:'Lenovo Yoga',
    description:'Laptop',
    price:'400',
    categories:[],
    category:'',
    subs:[],
    shipping:'Yes',
    quantity:'50',
    images:[],
    colors:["Black","Brown","Silver","Blue","White"],
    brands:["Apple","Lenovo","Samsung","Microsoft","Asus","Hp"],
    color:'silver',
    brand:'Lenovo',
};
const ProductCreate = () =>{
    const [values,setValues] = useState(initialState)
    const [subOptions,setSubOptions] = useState([])
    const [showSub,setShowSub] = useState(false)
    //redux 
    const { user } = useSelector((state)=>({...state}))
    const [loading,setLoading] = useState(false)
    useEffect(()=>{
        loadCategories();
    },[])

    const loadCategories = () => {
        getCategories().then((c)=>setValues({...values,categories:c.data}));
    }



    const handleSubmit = (e) =>{
        e.preventDefault();   
        createProduct(values,user.token)
        .then((res)=>{
            console.log(res);
            window.alert(`${res.data.title} created`)
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
            toast.error(`${err.message}`)
        })
    }
    const handleChange = (e) =>{ 
        setValues({...values,[e.target.name]:e.target.value})
    }

    const handleCategoryChange = (e) =>{
        e.preventDefault();
        setValues({...values,subs:[],category:e.target.value})
        console.log('Clicked category',e.target.value);
        getCategorySubs(e.target.value)
        .then((res)=>{
            console.log('SUBS OPTIONS ON CLICK',res);
            setSubOptions(res.data)
        })
        setShowSub(true)
    }

    return  (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-md-2'>
            <AdminNav />
             </div>
        <div className='col-md-10'>
          
        {loading ? <LoadingOutlined className='text-secondary h1'/> : <h4>Product Create</h4>}
            <hr/>
            {JSON.stringify(values.images)}
        <div className='p-3'>
            <FileUpload values={values} setValues={setValues} 
            setLoading={setLoading}/>
        </div>
        <ProductCreateForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} handleCategoryChange={handleCategoryChange} 
        setSubOptions={setSubOptions} 
        showSub={showSub} 
        subOptions={subOptions}
        setValues={setValues}
        />

        
        </div>
        </div>
        </div>
        )
}
export default ProductCreate