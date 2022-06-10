import React from 'react';
import { useState } from 'react';
import {Menu} from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined,LoginOutlined,UserAddOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';

import firebase from "firebase/compat/app";
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
const { SubMenu,Item } = Menu


const Header = ()=>{
    const [current,setCurrent] = useState('')
    let dispatch =useDispatch()
    let history =useHistory()
    let { user } =useSelector((state)=> ({...state}));
    // let state =useSelector((state)=> state)//get user from state
    function handleClick(e){
        setCurrent(e.key)
        console.log(e.key);
    }
    const logout =()=>{
      firebase.auth().signOut();
      dispatch({
        type:"LOGOUT",
        payload:null
      });
      history.push('/login');
   
    };

    return( 
        <>
        <Menu onClick={handleClick} mode="horizontal" defaultSelectedKeys={['home']} >
        <Item key="home" icon={<AppstoreOutlined />}> 
        <Link to="/">Home</Link></Item>

        {!user && (
          <Item key="register" icon={<UserAddOutlined/>} className='float-end'>
          <Link to="/register">Register</Link>
          </Item>
        )}
       {!user && (
          <Item key="login" icon={<UserOutlined />} className='float-end'>
          <Link to="/login">Login</Link>
          </Item>
       )}

       {user && (
                 <SubMenu key="Username" title={user.email && user.email.split('@')[0]} icon={<SettingOutlined />} className="float-end" >

                   {user && user.role === 'subscriber' && (<Item key="two" icon={<AppstoreOutlined />}>
                  <Link to="/user/history"> Dashboard</Link>
                 </Item>)}

                 {user && user.role === 'admin' && (<Item key="two" icon={<AppstoreOutlined />}>
                  <Link to="/admin/dashboard"> Dashboard</Link>
                 </Item>)}
               
                 <Item icon={<LogoutOutlined />} onClick={logout}>
                   Logout
                 </Item>
               </SubMenu>
       )}

      </Menu>

      </>
    )
}
export default Header