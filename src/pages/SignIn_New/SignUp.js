import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useState } from "react";
import { TailSpin } from "react-loading-icons";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbarnew";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Api from "../../API/Api";



const FormArea = (props) => {
  const [fieldType, setFieldType] = useState("password");
  const toggleVisibility = (e) => {
    console.log(e);
    fieldType === "text" ? setFieldType("password") : setFieldType("text");
  };
  return (
    <div className={styles.formArea}>
      <div className={styles.form__formDiv}>
        {/* <div>&nbsp;</div> */}
        <div className={styles.form + " " + styles.form__formarea}>
          <form
            className={styles.form__group}
            onSubmit={props.handleSubmit}
            target="_blank"
            ref={props.formElement}
          >
            <h2>SIGN UP</h2>
            <div className={styles.signup__flexer}
            >
              <div className={styles.signup__name1div}>
                <label htmlFor="signup__name1" className={styles.form__label}>
                  First Name
                </label>
                <input
                  id="signup__name1"
                  className={styles.form__input}
                  type="text"
                  name="first_name"
                  required="true"
                />
              </div>
              <div className={styles.signup__name2div}>
                <label htmlFor="signup__name2" className={styles.form__label}>
                  Last Name
                </label>
                <input
                  id="signup__name2"
                  className={styles.form__input}
                  type="text"
                  name="last_name"
                />
              </div>
            </div>
            <div className={styles.signup__flexer}>
              <div
                className={styles.signup__name1div}
                style={{ width: "100%", position: 'sticky' }}
              >
                <label
                  htmlFor="signup__gender"
                  className={styles.form__label}
                  style={{ display: "block" }}
                >
                  Gender
                </label>
                <select
                  id="signup__gender"
                  className={styles.signup__selector}
                  name="gender"
                >
                  <option hidden></option>
                  <option>MALE</option>
                  <option>FEMALE</option>
                  <option>OTHER</option>
                </select>
              </div>
               
            </div>
            <div className={styles.signup__flexer}>
              <div className={styles.signup__name1div}>
                <label htmlFor="signup__email" className={styles.form__label}>
                  Email ID
                </label>
                <input
                  id="signup__email"
                  className={styles.form__input}
                  type="email"
                  required="true"
                  name="email"
                />
              </div>

              <div className={styles.signup__name2div}>
                <label
                  htmlFor="signup__password"
                  className={styles.form__label}
                >
                  Password
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <input
                    id="signup__password"
                    className={styles.form__input}
                    type={fieldType}
                    required="true"
                    name="password"
                  />
                  <h6
                    style={{
                      right: -15,
                      display: "inline",
                      cursor: "pointer",
                      transform: "translateX(-130%)",
                      color: "#f542d1",
                      position: "sticky",
                    }}
                    onClick={(e) => toggleVisibility(e)}
                  >
                    <span className="material-symbols-outlined">
                      {fieldType === "password"
                        ? "visibility"
                        : "visibility_off"}
                    </span>
                  </h6>
                </div>
              </div>
            </div>
             
            <button
              className={styles.form__button}
              type="submit"
              onClick={() => props.setShow(true)}
            >
              {props.loading ? (
                <span style={{ marginRight: "9px", marginTop: "5px" }}>
                  <TailSpin width="20" height="12" />
                </span>
              ) : (
                ""
              )}
              <span
                className={styles.form__button}
                style={{ background: "none" }}
              >
                Sign Up
              </span>
            </button>
            <h3 className={styles.form__redirect}>
              ALREADY A MEMBER?{" "}
              <span>
                <Link to="/SignIn">SIGN IN</Link>
              </span>
            </h3>
          </form>
        </div>
      </div>
    </div>
  );
};

const SignUp = (props) => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [isError, setIsError] = useState(true);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const formElement = useRef(null);

  const additionalData = {
    sent: new Date().toISOString(),
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = Array.from(formElement.current)
      .filter((input) => input.name)
      .reduce(
        (obj, input) => Object.assign(obj, { [input.name]: input.value }),
        {}
      );

    if (additionalData) {
      Object.assign(data, additionalData);
    }

    console.log(data);

    setLoading(true);

    Api.post(`/signup`, data)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        setLoading(false);

        setOpen(true);
        setIsError(false);
        setError("Signup Successful");

        navigate("/SignIn", { state: { replace: "true" } });

        console.log("Success");

        return response.json();
      })
      .catch((err) => {
        setLoading(false);

        // setError(err.response.data.message);

        setIsError(true);

        setOpen(true);
        // navigate('/SignUp',{message:true})
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <div>
          <Navbar />

          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error}
          >
            <Alert
              onClose={handleClose}
              severity={isError ? "error" : "success"}
              sx={{ width: "100%" }}
            >
              {error}
            </Alert>
          </Snackbar>

          <FormArea
            handleSubmit={handleSubmit}
            formElement={formElement}
            setShow={setShow}
            loading={loading}
          />
        </div>
  );
};

export default SignUp;

