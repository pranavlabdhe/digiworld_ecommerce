import { useEffect,lazy, Suspense } from "react";
import {ToastContainer} from 'react-toastify'
import { auth } from './firebase'
import {Switch,Route} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { currentUser } from './functions/auth'
import'react-toastify/dist/ReactToastify.css';
import {LoadingOutlined} from '@ant-design/icons'
// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";
// import Home from "./pages/Home";
// import {Switch,Route} from 'react-router-dom'
// import Header from "./components/nav/Header";
// import {ToastContainer} from 'react-toastify'
// import RegisterComplete from "./pages/auth/RegisterComplete";
// import 'react-toastify/dist/ReactToastify.css';
// import { auth } from './firebase'
// import { useDispatch } from 'react-redux'
// import ForgetPassword from "./pages/auth/ForgotPassword";
// import History from "./pages/user/History";
// import { currentUser } from './functions/auth'
// import UserRoute from '../src/components/routes/UserRoute'
// import AdminRoute from '../src/components/routes/AdminRoute'
// import Password from "./pages/user/Password";
// import Wishlist from "./pages/user/Wishlist";
// import AdminDashboard from './pages/admin/AdminDashboard'
// import CategoryCreate from "./pages/admin/category/CategoryCreate";
// import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
// import SubCategory from "./pages/admin/sub/SubCategory";
// import SubCategoryUpdate from "./pages/admin/sub/SubCategoryUpdate";
// import ProductCreate from "./pages/admin/product/ProductCreate";
// import AllProducts from "./pages/admin/product/AllProducts";
// import ProductUpdate from "./pages/admin/product/ProductUpdate";
// import Product from "./pages/Product";
// import CategoryHome from "./pages/category/CategoryHome";
// import CategoryList from "./components/category/CategoryList";
// import SubHome from "./pages/sub/SubHome";
// import Shop from "./pages/Shop";
// import Cart from "./pages/Cart";
// import Checkout from './pages/Checkout'
// import Payment from "./pages/Payment";

//using lazy

const Login = lazy(()=>import("./pages/auth/Login"))
const Register = lazy(()=>import("./pages/auth/Register"))  
const Home= lazy(()=>import("./pages/HomePage"));
const Header=lazy(()=>import("./components/nav/Header")) ;

const RegisterComplete = lazy(()=>import("./pages/auth/RegisterComplete")); 

const ForgetPassword =  lazy(()=>import("./pages/auth/ForgotPassword"));
const History = lazy(()=>import("./pages/user/History"));
const UserRoute = lazy(()=>import("../src/components/routes/UserRoute"));
const AdminRoute = lazy (()=>import('../src/components/routes/AdminRoute'));
const Password = lazy (()=>import("./pages/user/Password"));
const Wishlist = lazy (()=>import("./pages/user/Wishlist"));
const AdminDashboard = lazy(()=>import("./pages/admin/AdminDashboard"));
const CategoryCreate = lazy(()=>import( "./pages/admin/category/CategoryCreate"));
const CategoryUpdate= lazy (()=>import("./pages/admin/category/CategoryUpdate"));
const SubCategory = lazy(()=>import("./pages/admin/sub/SubCategory"));
const SubCategoryUpdate = lazy(()=>import("./pages/admin/sub/SubCategoryUpdate"));

const ProductCreate=lazy(()=>import("./pages/admin/product/ProductCreate"));
const AllProducts = lazy (()=>import("./pages/admin/product/AllProducts"))
const ProductUpdate = lazy(()=>import("./pages/admin/product/ProductUpdate"));
const Product = lazy(()=>import("./pages/Product"));
const CategoryHome = lazy(()=>import("./pages/category/CategoryHome"))
const CategoryList =lazy(()=>import("./components/category/CategoryList"))
const SubHome = lazy(()=>import("./pages/sub/SubHome"));
const Shop = lazy(()=>import("./pages/Shop"))
const Cart = lazy(()=>import("./pages/Cart"))
const Checkout = lazy(()=>import("./pages/Checkout"))
const Payment = lazy(()=>import("./pages/Payment"))
const Footer = lazy(()=>import('../src/components/nav/Footer'))

function App() {

  const dispatch = useDispatch()

  // to check firebase auth state

  useEffect(()=>{
      const unsubcribe = auth.onAuthStateChanged(async (user)=>{
        if(user) {
            const idTokenResult = await user.getIdTokenResult()
            // console.log("user",user);
            currentUser(idTokenResult.token)//send the idTokenResult to the backend
            .then((res)=>{
              //getting all info from mongoDb and dispatching it.
              dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                  name:res.data.email.split('@')[0],
                  email:res.data.email,
                  token:idTokenResult.token,
                  role:res.data.role,
                  _id:res.data._id
                },
              });
            })
            .catch(err => console.log(err))
        }
      });

      //cleanup
      return () => unsubcribe();
  },[])

  return (
    <Suspense fallback={
    <div className="col text-center p-5">
      Digital World Store<LoadingOutlined />
    </div>
  }>
    <Header />
    <ToastContainer />
  
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/register/complete" component={RegisterComplete}/>
      <Route exact path="/forgot/password" component={ForgetPassword}/>
      {/* Private Routes */}
      <UserRoute exact path="/user/history" component={History}/>
      <UserRoute exact path="/user/password" component={Password}/>
      <UserRoute exact path="/user/wishlist" component={Wishlist}/>

      {/* <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/> */}
      <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
      <AdminRoute exact path="/admin/sub" component={SubCategory}/>
      <AdminRoute exact path="/admin/sub/:slug" component={SubCategoryUpdate}/>
      <AdminRoute exact path="/admin/product" component={ProductCreate}/>
      <AdminRoute exact path="/admin/products" component={AllProducts}/>
      <AdminRoute exact path="/admin/product/:slug" component={ProductUpdate}/>
      {/* <Route exact path="/admin/dashboard" component={AdminDashboard}/> 
      <Route exact path="/admin/category" component={CategoryCreate}/>
      <Route exact path="/admin/category/:slug" component={CategoryUpdate}/>
      <Route exact path="/admin/sub" component={SubCategory}/>
      <Route exact path="/admin/sub/:slug" component={SubCategoryUpdate}/> */}
      <Route exact path="/product/:slug" component={Product} />
      <Route exact path="/category/:slug" component={CategoryHome} />
      <Route exact path="/sub/:slug" component={SubHome} />
      <Route exact path="/shop" component={Shop} />
      <Route exact path="/cart" component={Cart} />
      <UserRoute exact path="/checkout" component={Checkout} />
      <UserRoute exact path="/payment" component={Payment} />
    </Switch>
    <Footer />
    </Suspense>
  );
}

export default App;
