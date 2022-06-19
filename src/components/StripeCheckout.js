import React, { useEffect, useState } from 'react'
import {CardElement, useStripe,useElements } from '@stripe/react-stripe-js'
import { createPaymentIntent } from '../functions/stripe'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder, emptyUserCart } from '../functions/user'
const StripeCheckout = ({history}) => {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>({...state}));
    const [succeded,setSucceded] = useState(false)
    const [error,setError] = useState(null)
    const [processing,setProcessing] = useState('')
    const [disabled,setDisabled] = useState(true)
    const [clientSecret,setClientSecret] = useState("")
    const stripe = useStripe();
    const elements = useElements();

    useEffect(()=>{
        createPaymentIntent(user.token)
        .then((res)=>{
            console.log('create payment intent',res.data);
            setClientSecret(res.data.clientSecret)
        })
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setProcessing(true)
        const payload = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card:elements.getElement(CardElement),
                billing_details:{
                    name:e.target.name.value,
                },
            },
        });
        if(payload.error){
            setError(`Payment failed ${payload.error.message}`)
            setProcessing(false)
        }else{
            // here get result after sucessful payment
            // create order and save in database for admin to process
            // ********
            createOrder(payload,user.token)
            .then((res)=>{
                if(res.data.ok){
                    //empty cart ffrom local storage
                    if(typeof window !== 'undefined') localStorage.removeItem('cart')
                    // empty from redux
                    dispatch({
                        type:'ADD_TO_CART',
                        payload:[],
                    });
                    // empty from database
                    emptyUserCart(user.token);
                }
            })
            // emty user cart from redux store and local storage
            console.log(JSON.stringify(payload,null,4));
            setError(null)
            setProcessing(false)
            setSucceded(true)
        }
    }
    const handleChange = async (e) =>{
        
        setDisabled(e.empty) //disable pay button if errors
        setError(e.error ? e.error.message:"")


    }
    const cardStyle = {
        style: {
          base: {
            color: "#32325d",
            fontFamily: "Arial, sans-serif",
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d",
            },
          },
          invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
          },
        },
      };
  return (
    <div className='stripe_checkout_footer'>
        <p className={succeded ? 'result-message':'result-message hidden'}>Payment Successful &nbsp;
        <Link to="/user/history">See it in your purchase history</Link>
        </p>
        <p>Just for testing purpose please use card no. 4242 4242 4242 4242 MM/YY.12/23  CVV-158  Pin code.400058</p>
        <form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
            <CardElement id='card-element' options={cardStyle} onChange={handleChange}/>
        <button className='stripe-button' disabled={processing || disabled || succeded}>
            <span id="button-text">
                {processing ? <div className='spinner' id='spinner'>
                </div>:'Pay'}
            </span>
            </button>            
        </form>
        {error && <div className='card-error'role="alert">
            {error}
            </div>}
    </div>
  )
}

export default StripeCheckout