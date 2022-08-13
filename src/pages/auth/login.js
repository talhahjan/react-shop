import {
  FaFacebookF,
  FaGooglePlusG,
  FaInstagram,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import {SocialInstagramLogin,SocialFacebookLogin,SocialGoogleLogin} from "../test";
import { MdFingerprint, MdEmail, MdPersonAdd } from "react-icons/md";
import { useState, useEffect,useCallback } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import spinner from '../../assets/images/spinner.gif'

export default function Register() {
  useEffect(() => {
    document.querySelector("body").classList.remove("wrapper");
    document.querySelector("body").classList.add("login-page");
    const cardLogin = document.querySelector(".card-login");
    setTimeout(() => {
      cardLogin.style.opacity = 1;
    }, 500);

    return () => {
      document.querySelector("body").classList.add("wrapper");
      document.querySelector("body").classList.remove("login-page");
    };
  }, []);
  return (
    <>
      {/* <SideBar /> */}
      <div
        className="page-content"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" +
            process.env.REACT_APP_API_BASE_URL +
            "/assets/images/hd-06.jpg" +
            ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        {/* <!-- Navbar --> */}
        <nav className="navbar navbar-expand mx-auto w-100 navbar-transparent">
          <div className="container">
            <div className="navbar-wrappr">
              <Link className="navbar-brand" to="/">
                Home
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-controls="navigation-index"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon icon-bar"></span>
              <span className="navbar-toggler-icon icon-bar"></span>
              <span className="navbar-toggler-icon icon-bar"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link active">
                    <MdFingerprint size="2rem" />
                    Log in
                  </Link>
                </li>
                <li className="nav-item  active">
                  <Link to="/register" className="nav-link">
                    <MdPersonAdd size="2rem" />
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <!-- End Navbar --> */}


        <div className="card card-mdb mx-2 card-login">
          <div className="card-header card-header-primary">
            <h5 className="text-center">Login With Social Account</h5>
          
          </div>
          <div className="card-body">

          <div className="social-line text-center">
          <SocialInstagramLogin />
            <SocialGoogleLogin />
            <SocialFacebookLogin />
            </div>


            <div className="d-flex justify-content-center text-center">

            </div>
            <p className="text-muted text-center my-2">Or Be Classical</p>

            <LoginForm />

            <div className="py-1">
              <Link to="/register" className="text-dark">
                Dont't have an ID Register ?
              </Link>
            </div>
          </div>
        </div>

        {/* footer star  */}
        <footer className="footer">
          <div className="row m-1">
            <div className="col-sm">
              <p className="policy">Privacy Policy - Terms of Use </p>
            </div>
            <div className="col-sm-auto">
              <p className="copyright">
                &copy 2019 Company name, All rights reserved
              </p>
            </div>
          </div>
        </footer>
        {/* end footer */}
      </div>
    </>
  );
}

const LoginForm = () => {
  const [eye, setEye] = useState(0);
  let disableSubmitBtn = false;

  let Eye = eye ? FaEye : FaEyeSlash;

  const toggleEye = () => {
    eye ? setEye(0) : setEye(1);
    document
      .getElementById("password")
      .setAttribute("type", eye ? "password" : "text");
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required!"),
    password: Yup.string()
      .required("Required!")
      .min(8, "Must be more than 8 characters")
      .max(20, "should not be longer  than 20 character"),
  });

  const onSubmit = async (values, action) => {
    document.getElementById("dots").classList.remove("d-none");
     await axios.post(`api/login`, values).then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.authorisation.token);
          window.location = process.env.REACT_APP_HOME_PAGE;
        } else if (response.status === 201) {
          document.getElementById("dots").classList.remove("d-none");
          action.setFieldError("email", response.data.message);
          disableSubmitBtn = false;
        } else {
          disableSubmitBtn = false;
          document.getElementById("dots").classList.remove("d-none");
        }
    });
  };

  const initialValues = {
    email: "talhah.jan@gmail.com",
    password: "password",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={true}
      >
        {(formik) => {
          return (
            <Form noValidate>
              <div className="container">
                <div className="inputWithIcon inputWithAction my-2">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter Email-Address"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                  />
                  <MdEmail />
                </div>
                <div className="fs-9 text-danger">
                  <ErrorMessage name="email" />
                </div>
                <div className="inputWithIcon inputWithAction my-2">
                  <Field
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter Password"
                    aria-label="Password"
                    id="password"
                    aria-describedby="basic-addon1"
                    autoComplete="off"
                  />
                  <MdFingerprint />
                  <Eye className="action" id="eye" onClick={toggleEye} />
                </div>
                <div className="fs-9 text-danger">
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div className="row justify-content-between my-2 mx-1">
                <div className="col-sm-12 col-md-6">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="flexCheckChecked"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="check">
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6">
                  <a href="password/reset" className="text-form">
                    Forgot Your Password ?
                  </a>
                </div>
              </div>

              <div className="form-group my-2">
                <button
                  id="submitBtn"
                  className="btn col-12 btn-primary"
                  disabled={formik.isDirty || disableSubmitBtn}
                  type="submit"
                  onClick={() => (disableSubmitBtn = true)}
                >
                  Log In
                  <span className="d-none ml-2" id="dots">
                    ... <img src={spinner} width="35" height="35" alt="" />
                  </span>
                </button>
                
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
