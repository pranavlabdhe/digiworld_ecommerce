import React, { useEffect, useState } from 'react'
import { getProduct,productStar,getRelated } from '../functions/product'
import SingleProduct from '../components/cards/SingleProduct'
import { useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'

const Product = ({match}) => {
    
const [product,setProduct] = useState({})
const {slug} = match.params
const [star,setStar] = useState(0)
const [related,setRelated] = useState([])
//redux
const {user} = useSelector((state)=>({...state}));

useEffect(()=>{
    loadSingleProduct()
},[slug])

useEffect(()=>{
    if(product.ratings && user){
        let existingRatingObject = product.ratings.find(
            (ele) => ele.postedBy.toString() === user._id.toString()
          );
          existingRatingObject && setStar(existingRatingObject.star) // current users star
    }
});
const loadSingleProduct = () =>{
    getProduct(slug).then((res)=>{
        setProduct(res.data)
        // load relatedProducts
        getRelated(res.data._id).then((res=>{
            setRelated(res.data)
        }))
    })
}

    const onStarClick = (newRating,name)=>{
        setStar(newRating)
        // console.log(newRating);
        // console.table(newRating,name)
        productStar(name,newRating,user.token)
        .then((res)=>{
            console.log('Rating',res.data);
            loadSingleProduct()
        })
    }
  return (
    <>
      <div className='conatiner-fluid'>
        <div className='row'>
            <SingleProduct product={product} onStarClick={onStarClick} star={star}/>
        </div> 
        <div className='row'>
            <div className='col text-center pt-5 pb-5'>
                <hr />
                    <h4>Realated Product</h4>
                  
                <hr/>
                {/* {JSON.stringify(related)} */}
            </div>
        </div>
        <div className='row pb-5'>
        
            {related.length ? related.map((r)=>(<div key={r._id} className="col-md-4" >
                <ProductCard p={r} />
            </div>
            )):
            (<div className='text-center'>  
            No related products found</div>
            )}
        </div>
    </div>
    </>
  
  )
}

export default Product