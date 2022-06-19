import React from 'react'
import { Card,Tabs,Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { HeartOutlined,ShoppingCartOutlined } from '@ant-design/icons'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ProductListItems from './ProductListItems'
import StarRating from 'react-star-ratings'
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../functions/rating';
import _ from 'lodash'
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
const { TabPane } = Tabs
//this is child component of Product page
const SingleProduct = ({product,onStarClick,star}) => {
    const {title,images,description,brand,_id} = product
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
        ...product,count:1
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
    <>
  
        <div className='col-md-7'>
           <Carousel showArrows={true} autoPlay infiniteLoop>
                {images && images.map((i)=>{
                    return (
                        <img key={i.public_id} src={i.url} />
                    )
                })}
           </Carousel>
           <Tabs type='card'>
            <TabPane tab="Description" key="1">
            <h4 className='p-2'>
                {description && description}
                </h4>
            </TabPane>
            <TabPane tab="Contact" key="2">
                <h4 className='p-2'>
                {(`Visit www.${brand}.com to know more`).toLowerCase()}
                </h4>
            </TabPane>
           </Tabs>
        </div>
        <div className='col-md-5'>
        <h1 className='bg-dark text-color p-3'>{title}
        </h1>
        {product && product.ratings && product.ratings.length>0? showAverage(product):'Not Rated'}
       
            <Card 
             actions={[
                <>
                
                <Tooltip title={tooltip}>  
                <a onClick={handleAddToCart}>
                    <ShoppingCartOutlined className='text-danger' /><br/>Add to cart</a>
                    </Tooltip> 
                </>,
                // <Link to="/">
                //  <HeartOutlined className='text-info'/><br/>
                //   Add to Wishlist
                // </Link>,
                <RatingModal>
                <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor='#e5ad06'
                />
            </RatingModal>
            ]}
            >
                <ProductListItems product={product} />
            </Card>
        </div>
    </>
  )
}

export default SingleProduct