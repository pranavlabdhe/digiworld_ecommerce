import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// import AdminProductCard from '../../components/cards/AdminProductCard'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import AdminNav from '../../../components/nav/AdminNav'
import { getProductByCount } from '../../../functions/product'
import { removeProduct } from '../../../functions/product'
import { useSelector } from 'react-redux'
const AllProducts = () => {

  const [products,setProducts] =useState([])
  const [loading,setLoading] = useState(false)
  const { user } = useSelector((state)=>({...state}));
  useEffect(()=>{
    loadAllProducts();
  },[])
  const loadAllProducts =()=>{
    setLoading(true)
    getProductByCount(100)
    .then((res)=>{
      setProducts(res.data)
      setLoading(false) 
    })
  
    .catch((err)=>{
      setLoading(false)
      console.log(err)
     
    })
   
  }

  const handleRemove = (slug) =>{
    let answer = window.confirm('Are you sure you want tot delete?')
        if(answer){
            // console.log("deleted",slug);
            removeProduct(slug,user.token)  
            .then((res)=>{
                loadAllProducts();
                toast.error(`${res.data.title} is deleted`)
            })
            .catch((err)=>{
                toast.error('Something went wrong')
            })
        }
  }
  return (
    <>
   <div className='container-fluid'>
        <div className='row'>
            <div className='col-md-2'><AdminNav/></div>
            <div className='col-md-10'>
              {loading ? 
              (<h3 className='text-secondary'>Loading</h3>):
              (<h1>ALL PRODUCTS</h1>
              )}
              <div className='col'>
                <div className='row'>
                {products.map((p)=>{
                return(
                  <div key={p._id}  className='col-md-4 pb-3' >
                   <AdminProductCard product={p}
                   handleRemove={handleRemove}
                   />
                  </div>
                
                )
              })}
                </div>
           </div>
              {/* {JSON.stringify(products)} */}
            </div>
        </div>
    </div>
    </>
  )
}

export default AllProducts