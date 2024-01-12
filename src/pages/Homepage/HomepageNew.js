import React, { useEffect, useState } from 'react';
import styles from './HomepageNew.module.css';
import About from '../About/aboutnew';
import Navbar from '../../components/navbar/Navbarnew';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Api from '../../API/Api';

function Home() {

    const [auth, setAuth] = useState(false);
    const[ca_id,setca_id]=useState(null);
    const [app_id, setapp_id] = useState(null);
    const [sel, setSel] = useState("no");

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        };
        Api.get(`/user/login_check`, requestOptions).then((res) => {
            console.log("we are printing on home page ")
            console.log(res.data.user);
            setca_id(res.data.user.ca_id);
            setapp_id(res.data.user.app_id);
            setSel(res.data.user.selection);
            setAuth(true);
        }).catch((err) => {
            console.log(err);
            setAuth(false);
        })


    }, [])


    return (
        <div>
            <Navbar show={auth} />
            <div className={styles.container}>


                <div className={styles.homeMain}>
                    <div className={styles.homeContent}>
                        <h1 className={styles.heading1} >Home Page </h1>
                        <h3 className={styles.heading3} >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum atque quisquam eum voluptates optio dolore, tempora similique dignissimos quasi earum!</h3>
                    </div>
                </div>
                <div id="about" className={styles.scroll}><About /></div>


            </div>
        </div>
    );

}

export default Home;
