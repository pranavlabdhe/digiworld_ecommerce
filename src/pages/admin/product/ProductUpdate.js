// O
import React from 'react'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import AdminNav from '../../../components/nav/AdminNav'
import { createProduct, updateProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { getCategories,getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import { getProduct } from '../../../functions/product'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const initialState  = {
    title:'',
    description:'',
    price:'',
    // categories:[],
    category:'',
    subs:[],
    shipping:'',
    quantity:'',
    images:[],
    colors:["Black","Brown","Silver","Blue","White"],
    brands:["Apple","Lenovo","Samsung","Microsoft","Asus"],
    color:'',
    brand:'',

};


const ProductUpdate = ({match,history}) =>{
const {slug} = match.params
//state
const [values,setValues] = useState(initialState)
const [categories,setCategories] = useState([])
const [subOptions,setSubOptions] = useState([])
const [ArrayOfSubIds,setArraysOfSubIds] =useState([])
const [loading,setLoading] = useState(false)
    //redux 
    const { user } = useSelector((state)=>({...state}))

    useEffect(()=>{
        loadProduct()
        loadCategories();
    },[])

    const loadProduct = () =>{
        getProduct(slug)
        .then((p)=>{
            // console.log('Single product',res);
            
            setValues({...values,...p.data})
            getCategorySubs(p.data.category._id)
            .then((res)=>{
                setSubOptions(res.data)  
            });
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            console.log("ARR",arr);
            setArraysOfSubIds((prev)=>arr); 
        })
    }

    const loadCategories = () => {
        getCategories().then((c)=>{
            setCategories(c.data)
        });
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
        // if user clicks back to the original category 
        //show originals sub categories
        if(values.category._id === e.target.value){
            loadProduct();
        }
        setArraysOfSubIds([]);
    }


    const handleSubmit =(e)=>{
        e.preventDefault()
        setLoading(true)
        values.subs = ArrayOfSubIds;
        updateProduct(slug, values, user.token)
        .then((res)=>{
            setLoading(false)
            toast.success(`${res.data.title} updated`)
            history.push("/admin/products");
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false)
            toast.error(`${err.message}`)
        })

    }

    const handleChange = (e) =>{ 
        setValues({...values,[e.target.name]:e.target.value})
    }
    return  (
    <div className='container-fluid'>
    <div className='row'>
        <div className='col-md-2'>
            <AdminNav />
             </div>
        <div className='col-md-10'>
        <h4>Product Update</h4>
            <hr/>
            {/* {JSON.stringify(values)} */}
            <div className='p-3'>
            <FileUpload values={values} setValues={setValues} 
            setLoading={setLoading}/>
        </div>
            <ProductUpdateForm 
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            categories={categories}
            subOptions={subOptions}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            ArrayOfSubIds={ArrayOfSubIds}
            setArraysOfSubIds={setArraysOfSubIds}
        />
        </div>
        </div>
        </div>
        )
}
export default ProductUpdate