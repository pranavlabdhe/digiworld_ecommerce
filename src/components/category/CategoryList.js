import React, { useEffect, useState } from 'react'
import { getCategories } from '../../functions/category'
import { Link } from 'react-router-dom'
const CategoryList = () => {
    const [categories,setCategories] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        console.log("useEffect");
        getCategories()
        .then((c)=>{
            setCategories(c.data)
            setLoading(false)

        })
    },[])

    const showCategories = () =>
        categories.map((c)=>(
            <div className='col'>
            <Link to={`/category/${c.slug}`} className="col-lg-12 text_color_1 btn btn-secondary ">{c.name} 
                 </Link>   
                 </div>
        ));


  return (

    <div className='container-fluid'>
        <div className='row'>
            {loading ? (<h4 className='text-center'>Loading...</h4>) : (
                showCategories()
                )}
        </div>

    </div>
  )
}

export default CategoryList