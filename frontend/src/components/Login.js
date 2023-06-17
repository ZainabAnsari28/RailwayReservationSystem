import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import "./Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  username: Yup.string().required("username is required!"),
});

const Login = ({ onLogin }) => {
  /**To Show Add Toastify Text */
  const notify = (type, message) => {
    toast[type](message, {
      position: "top-center",
      autoClose: 2000,
    });
  };

  /**To Show Error Toastify Text */
  const error = () => {
    toast.error("Invalid Credentials!!!", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const fromUrl = _get(location, "state.from.pathname");
  const signInSuccess = (userData) => {
    localStorage.setItem("token", JSON.stringify(userData.response));
    localStorage.setItem("admin", JSON.stringify(true));
    onLogin(true);

    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/admindashboard");
    }
  };

  const signInFailure = (userData) => {
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      error();
      history.push("/login");
    }
  };

  const login = (userData) => {
    fetch("http://localhost:9005/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: userData.username,
        password: userData.password,
      }),
    })
      .then((response) => {
        if (response.status === 401) {
          response.json().then((data) => notify("error", data.response));
          console.log("error occured");
        } else if (response.ok) {
          response.json().then((data) => {
            console.log("success");
            notify("success", "Successfully logged in!");
            signInSuccess(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = { ...values };
          resetForm();
          login(userData);
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form>
          <div className="booking-container">
            <h1 className="booking">ADMIN LOGIN</h1>
            <hr></hr>
            <div className="inner">
              <label>
                <b>User Name</b>
              </label>
              <Field name="username" type="text" placeholder="Enter username" />
              <label>
                <b>Password</b>
              </label>
              <Field name="password" type="password" placeholder="Password" />
              {/* <Link to="/adminDashboard"> */}
              <button
                className="btn btn-success"
                type="submit"
                onClick={() => {}}
              >
                Sign In
              </button>
              {/* </Link> */}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
