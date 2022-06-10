import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/home";
import {Switch,Route} from 'react-router-dom'
import Header from "./components/nav/Header";
import {ToastContainer} from 'react-toastify'
import RegisterComplete from "./pages/auth/RegisterComplete";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import ForgetPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import { currentUser } from './functions/auth'
import UserRoute from '../src/components/routes/UserRoute'
import AdminRoute from '../src/components/routes/AdminRoute'
import Password from "./pages/user/Password";
import Wishlist from "./pages/user/Wishlist";
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCategory from "./pages/admin/sub/SubCategory";
import SubCategoryUpdate from "./pages/admin/sub/SubCategoryUpdate";

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
    <>
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

      <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
      <AdminRoute exact path="/admin/category" component={CategoryCreate}/>
      <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
      <AdminRoute exact path="/admin/sub" component={SubCategory}/>
      <AdminRoute exact path="/admin/sub/:slug" component={SubCategoryUpdate}/>

      {/* <Route exact path="/admin/dashboard" component={AdminDashboard}/> 
      <Route exact path="/admin/category" component={CategoryCreate}/>
      <Route exact path="/admin/category/:slug" component={CategoryUpdate}/>
      <Route exact path="/admin/sub" component={SubCategory}/>
      <Route exact path="/admin/sub/:slug" component={SubCategoryUpdate}/> */}

    </Switch>

    </>
  );
}

export default App;
