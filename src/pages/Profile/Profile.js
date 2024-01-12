import React, { useState, useEffect } from 'react'
import styles from './Profile.module.css';
import Navbar from '../../components/navbar/Navbarnew';
import Api from '../../API/Api';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false)
  let navigate = useNavigate();
  useEffect(() => {

    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    };
    Api.get(`/user/login_check`, requestOptions).then((res) => {

      setUser(res.data.user)
      setAuth(true);
    }).catch((err) => {
      window.location.href = '/';
      console.log(err);
      setAuth(false);
    })
  }, [])

  return (
    <div className={styles.profilebody}>
      <Navbar show = {auth} />
      
      <div className={styles.profile}>
        <div ><h1>NAME : {auth? user.first_name : ""} {auth? user.last_name : ""}</h1></div>
        <div ><h1>GENDER- {auth? user.gender : ""} </h1>
        <h1> EMAIL-ID : {auth? user.email : ""}</h1>
        </div>
      </div>
    </div>
  )
}

export default Profile
