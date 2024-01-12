import React, { useState, useEffect } from "react";
import classes from "./Navbarnew.module.css";

import { Link, useNavigate } from "react-router-dom";
import Api from "../../API/Api";

const Navbar = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    Api.get(`/user/login_check`, requestOptions)
      .then((res) => {
        // console.log(res.data);
        console.log(res?.data?.user);
        if (res?.data?.user?.selection == "yes") {
          setUser(res?.data?.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const calllogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
    // alert('successfully Logout!!')
    // <Link to="/SignIn"></Link>
  };
  const scrollToComponent = (e) => {
    e.preventDefault();
    // useNavigate(`${e.target.getAttribute("href")}`);
  };
  const find = () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    Api.get(`/user/login_check`, requestOptions).then((res) => {
      // console.log(res.data);
      // console.log(res?.data?.user);
      if (res?.data?.user) {
        setUser(res?.data?.user);
        return true;
      }
    });
    return false;
  };
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  return (
    <>
      <div className={classes.main_nav}>
        <div className={classes.logo}>
          <a href="/">
            <span className={classes.ktj}>Kgpian</span>
          </a>
        </div>
        <div
          className={
            showMediaIcons
              ? `${classes.menu_link} ${classes.mobile_menu_link}`
              : `${classes.menu_link}`
          }
        >
          <ul>
            <li>
              <a
                href="/#"
                onClick={() => {
                  setShowMediaIcons(false);
                  // scrollToComponent(e);
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a href="/#about" onClick={() => setShowMediaIcons(false)}>
                About Us
              </a>
            </li>

            <li>
              <div className="button">
                {!props.show ? (
                  <>
                    <button className={classes.sign}>
                      <Link to="/Signup">Sign Up</Link>
                    </button>
                    <button className={classes.sign}>
                      <Link to="/SignIn">Sign In</Link>
                    </button>
                  </>
                ) : (
                  <>
                    <button className={classes.sign}>
                      <Link to="/Profile">Profile</Link>
                    </button>
                    <button
                      className={classes.logoutdevice}
                      onClick={calllogout}
                    >
                      {/* {user.first_name} */}
                      logout
                    </button>
                    {/* <button
                    className={classes.sign}>
                    <Link to="/Dashboard">Dashboard</Link>
                  </button> */}
                    {user?.selection === "yes" ? (
                      <button className={classes.sign}>
                        <Link to="/Dashboard">Dashboard</Link>
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Navbar;
