import { FaEyeSlash, FaEye } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { MdFingerprint, MdEmail, MdPersonAdd, MdFace } from "react-icons/md";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Login() {
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
            "/assets/images/hd-05.jpg" +
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
                  <Link to="/login" className="nav-link">
                    <MdFingerprint size="2rem" />
                    Log in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/register">
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
            <div className="social-line text-center"></div>
            <p className="text-muted text-center my-2">Or Be Classical</p>

            <LoginForm />

            <div className="py-1">
              <Link to="/login" className="text-dark">
                All ready have an ID Login ?
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
      <ToastContainer />
    </>
  );
}

const LoginForm = () => {
  const location = useLocation();
  let state = location.state;

  if (state)
    toast.warn(
      "Facebook Account did not provide email address please fill the email id tp procced"
    );

  const [eye, setEye] = useState(0);
  let disableSubmitBtn = false;

  let Eye = eye ? FaEye : FaEyeSlash;

  const toggleEye = () => {
    eye ? setEye(0) : setEye(1);
    document
      .getElementById("password")
      .setAttribute("type", eye ? "password" : "text");
    document
      .getElementById("password_confirmation")
      .setAttribute("type", eye ? "password" : "text");
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid Email").required("Required!"),
    first_name: Yup.string().required("Required!").min(3).max(12),
    password: Yup.string()
      .required("Required!")
      .min(8, "Must be more than 8 characters")
      .max(20, "should not be longer  than 20 character"),
    password_confirmation: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const onSubmit = async (values, action) => {
    document.getElementById("dots").classList.add("d-none");
    axios.post("api/register", values).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("token", response.data.authorization.token);
        window.location = process.env.REACT_APP_HOME_PAGE;
      } else if (response.status === 201) {
        disableSubmitBtn = false;
        let errors = response.data.validation_errors;
        document.getElementById("dots").classList.remove("d-none");
        for (const [key, value] of Object.entries(errors)) {
          action.setFieldError(key, value);
        }
      } else {
        disableSubmitBtn = false;
        document.getElementById("dots").classList.remove("d-none");
        toast.error("Api Server Error");
      }
    });
  };

  const initialValues = {
    first_name: state.first_name ? state.first_name : "",
    last_name: state.last_name ? state.last_name : "",
    email: state.email ? state.email : "",
    avatar: state.avatar ? state.avatar : "",
    provider: state.provider ? state.provider : "",
    providerID: state.providerID ? state.providerID : "",
    password: "",
    password_confirmation: "",
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
              {state && state.avatar && (
                <input type="hidden" value={state.avatar} />
              )}

              {state && state.provider && (
                <input type="hidden" value={state.provider} />
              )}
              {state && state.providerID && (
                <input type="hidden" value={state.providerID} />
              )}
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 col-md-12">
                    <div className="inputWithIcon inputWithAction my-2">
                      <Field
                        type="first_name"
                        name="first_name"
                        id="first_name"
                        className="form-control"
                        placeholder="Enter First Name"
                        aria-label="first_name"
                        aria-describedby="basic-addon1"
                      />
                      <MdFace />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="first_name" />
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-12">
                    <div className="inputWithIcon inputWithAction my-2">
                      <Field
                        type="last_name"
                        name="last_name"
                        id="last_name"
                        className="form-control"
                        placeholder="Enter Lasst Name"
                        aria-label="last_name"
                        aria-describedby="basic-addon1"
                      />
                      <MdFace />
                    </div>
                    <div className="fs-9 text-danger">
                      <ErrorMessage name="last_name" />
                    </div>
                  </div>
                </div>

                <div className="inputWithIcon inputWithAction my-2">
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    placeholder="Enter Last Name"
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

                <div className="inputWithIcon inputWithAction my-2">
                  <Field
                    type="password"
                    name="password_confirmation"
                    className="form-control"
                    placeholder="Enter Password"
                    aria-label="password_confirmation"
                    id="password_confirmation"
                    aria-describedby="basic-addon1"
                    autoComplete="off"
                  />
                  <MdFingerprint />
                </div>
                <div className="fs-9 text-danger">
                  <ErrorMessage name="password_confirmation" />
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
              </div>

              <div className="form-group my-2">
                <button
                  id="submitBtn"
                  className="btn col-12 btn-primary"
                  disabled={formik.isDirty || disableSubmitBtn}
                  type="submit"
                  onClick={() => (disableSubmitBtn = true)}
                >
                  Register
                  <span className="d-none ml-2" id="dots">
                    ... <img src="/spinner.gif" width="25" height="25" alt="" />
                  </span>
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <ToastContainer />
    </>
  );
};
