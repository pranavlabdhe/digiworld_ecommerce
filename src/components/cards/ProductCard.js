import React, { useState } from 'react'
import { Card,Skeleton,Tooltip } from 'antd'
import laptop_default from '../../images/default_image.jpg'
import { showAverage } from '../../functions/rating'
import { EyeOutlined,ShoppingCartOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

const { Meta } = Card;

const ProductCard = ({p}) => {
  const {images,title,description,slug,price} = p
  const [tooltip,setTooltip] = useState('ADD TO CART')

//   redux
   const {user,cart} = useSelector((state)=>({...state}));
   const dispatch = useDispatch()
   

  const handleAddToCart = () =>{
   let cart = []
   if(typeof window !== 'undefined'){
      // if cart is in local Storage
      if(localStorage.getItem('cart')){
         cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product to cart 
      cart.push({
       ...p,count:1
      })
      // remove duplicates
      let unique = _.uniqWith(cart,_.isEqual)


      // save to local storage
      // console.log('unique',unique)
      localStorage.setItem('cart',JSON.stringify(unique))

      setTooltip('Added')
      // Add to redux

      dispatch({
         type:"ADD_TO_CART",
         payload:unique,
      })
   }
  }
  return (
   <> {p && p.ratings && p.ratings.length>0? showAverage(p):'Not Rated'}
    <Card cover={
      <img src={images && images.length ? images[0].url:laptop_default} style={{height:'150px',objectFit:'cover'}}
      className="p-1"
      alt=''/>
   }
      actions={[
         <Link to={`/product/${slug}`}>
            <EyeOutlined className='text-warning' /><br/> View Product
         </Link>,
      <Tooltip title={tooltip}>  
      <a onClick={handleAddToCart}>
         <ShoppingCartOutlined className='text-danger' /><br/>Add to cart</a>
         </Tooltip> 
      ]}
      
   >
      {/* {let rupee = "	&#8377;" } */}
      <Meta title={`${title} --  \u20B9${price}`} 
      
      description={`${description && description.substring(0,40)}...`}>
      
      </Meta>
   </Card>
   </>
  ) 
}

export default ProductCard