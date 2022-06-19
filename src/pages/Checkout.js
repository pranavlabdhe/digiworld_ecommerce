import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getUserCart, saveUserAddress } from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [usersToken,setUserToken] = useState('')
  const dispatch = useDispatch();

  // console.log(user.token);
  useEffect(() => {
    getUserCart(user.token)
    .then((res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      console.log('checkout useEffect');
    });
    setUserToken(user.token)
    console.log(usersToken);
  },[]);

  const saveAddressToDb = () => {
    // console.log(address);
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  return (
    <div className="row checkout_body">
      <div className="col-md-6">
        <h4 className="m-3 display-4">Delivery Address</h4>
        <br />
        <br />
        <ReactQuill theme="snow" value={address} onChange={setAddress} style={{height:'300px'}}/>
        <button className="btn btn-primary mt-5 ms-3" onClick={saveAddressToDb}>
          Save
        </button>
      </div>

      <div className="col-md-6">
        <h4 className="display-5">Order Summary</h4>
        <hr />
        <p className="display-6">{products.length} Product(s) </p>
        <hr />
        {products.map((p, i) => (
          <div key={i}>
            <p className="display-6 fw-bold">
              {p.product.title} ({p.color}) x {p.count} ={" "}
              {p.product.price * p.count}
            </p>
          </div>
        ))}
        <hr />
        <p>Cart Total: {total}</p>

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push("/payment")}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
