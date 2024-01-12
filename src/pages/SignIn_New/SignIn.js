import React from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbarnew";
import axios from "axios";
import { TailSpin } from "react-loading-icons";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Api from "../../API/Api";
import { useLocation } from "react-router-dom";

const FormArea = (props) => {
  const [fieldType, setFieldType] = useState("password");
  const toggleVisibility = (e) => {
    console.log(e);
    fieldType === "text" ? setFieldType("password") : setFieldType("text");
  };
  return (
    <div className={styles.formArea}>
      <div className={styles.form__formDiv}>
        <div className={styles.form__imgDiv}>&nbsp;</div>
        <div className={styles.form + " " + styles.form__formarea}>
          <form className={styles.form__group}>
            <div>
              <h2>{props.forget ? "RESET PASSWORD" : "SIGN IN"}</h2>
            </div>
            <div>
              {" "}
              <label htmlFor="signin__email" className={styles.form__label}>
                Email-ID
              </label>
              <input
                id="signin__email"
                className={styles.form__input}
                type="email"
                onChange={(e) => {
                  props.forget
                    ? props.setEmail(e.target.value)
                    : props.setEmail(e.target.value);
                }}
              />
            </div>
            {props.forget || (
              <div>
                {" "}
                <label
                  htmlFor="signin__password"
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
                    id="signin__password"
                    className={styles.form__input}
                    type={fieldType}
                    onChange={(e) => {
                      props.setPassword(e.target.value);
                    }}
                  />
                  <h6
                    style={{
                      right: 15,
                      display: "inline",
                      cursor: "pointer",
                      transform: "translateX(-150%) translateY(2.5px)",
                      color: "#f542d1",
                      position: "sticky",
                    }}
                    onClick={(e) => toggleVisibility(e)}
                  >
                    <span class="material-symbols-outlined">
                      {fieldType === "password"
                        ? "visibility"
                        : "visibility_off"}
                    </span>
                  </h6>
                </div>
              </div>
            )}
            <div className={styles.form_remforgot}>
              <p className={styles.form_remforgot_forgotp}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    props.setForget(!props.forget);
                  }}
                >
                  {props.forget ? "Sign In" : "Forgot password ?"}
                </span>
              </p>
            </div>
            <div>
              {props.forget ? (
                <button
                  className={styles.form__button}
                  onClick={props.handleForgetSubmit}
                >
                  {props.loading ? (
                    <span style={{ marginRight: "9px", marginTop: "5px" }}>
                      <TailSpin width="20" height="12" /> Processing
                    </span>
                  ) : (
                    ""
                  )}
                  <span className={styles.form__button}> Reset Password </span>
                </button>
              ) : (
                <button
                  className={styles.form__button}
                  onClick={props.handleSubmit}
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
                    {" "}
                    Sign In{" "}
                  </span>
                </button>
              )}
            </div>
            <div>
              <h3 className={styles.form__redirect}>
                NEW HERE ?{" "}
                <span>
                  <Link to="/SignUp">SIGN UP</Link>
                </span>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [rep, setRep] = useState(false);
  const [forget, setForget] = useState(false);
  const [femail, setFemail] = useState("");
  const [text, setText] = useState("");

  const location = useLocation();

  const { replace } = location.state || { replace: false };

  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    setLoading(true);

    Api.post(`/signin/`, user)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        setError(false);
        setLoading(false);

        setError("Login Successful");
        setOpen(true);

        console.log(response);
        navigate("/");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      })
      .catch((err) => {
        // setMessage(err.toString());

        console.log(err.response.data.message);
        setLoading(false);
        setError(err.response.data.message);
        setOpen(true);
        console.log(err);
        // setStatus("error");
      });
  };

  const handleForgetSubmit = (e) => {
    e.preventDefault();
    const user = { email: femail };

    setLoading(true);

    Api.post(`/user/updatePassword/`, user)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.status);
        }

        setError(false);
        setLoading(false);

        setError("Check Mail");
        setFemail("");
        setOpen(true);
        setText("Check your mail. It may take upto a minute.");
        console.log(response);
      })
      .catch((err) => {
        console.log(err?.response?.data?.message);
        console.log(err?.response?.status);
        // setMessage(err.toString());
        setError("could not reset password");
        if (err.response.status == 401) setText("No Account Found. Try Again");
        else setText("Server busy. Click again after 5 minutes");
        setOpen(true);
        setLoading(false);
        console.log(err);
        // setStatus("error");
      });
  };

  return (
    <div>
      {replace && !error ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You are Successfully Registered Now Login
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      <Navbar />

      {error ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      ) : (
        ""
      )}

      <FormArea
        forget={forget}
        loading={loading}
        handleForgetSubmit={handleForgetSubmit}
        handleSubmit={handleSubmit}
        setPassword={setPassword}
        setEmail={setEmail}
        setFemail={setFemail}
        setForget={setForget}
      />
    </div>
  );
};

export default SignIn;
