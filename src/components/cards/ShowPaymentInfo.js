import React from 'react'

const ShowPaymentInfo = ({order}) => {
  return (
    <div className='' >
        <p>
        <span>Order Payment Intent Id {order.paymentIntent.id}</span> &nbsp;&nbsp;
        <span>  Amount {(order.paymentIntent.amount /= 100).toLocaleString('en-US',{
            style:'currency',currency:'inr'

        })}</span> &nbsp;&nbsp;
        <span>Method: {order.paymentIntent.payment_method_types[0]}</span>&nbsp; &nbsp;
        <span>Payment Status: {order.paymentIntent.status.toUpperCase()}</span> &nbsp; &nbsp;
        <span>Ordered on: {new Date(order.paymentIntent.created * 1000).toLocaleString()}</span>
        </p>
    </div>
  )
}

export default ShowPaymentInfo