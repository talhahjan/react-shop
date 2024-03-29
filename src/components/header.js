import { useContext } from "react";
import { FaBars, FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import {
  MdSearch,
  MdLocalMall,
  MdShoppingCart,
  MdFavorite,
  MdAccountCircle,
  MdDelete,
} from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../index";
import FacebookLogin from "../utils/socialLogin/facebook";
import GoogleLogin from "../utils/socialLogin/google";
const Header = () => {
  const user = useContext(userContext);
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload(false);
  };

  let navigate = useNavigate();
  return (
    <>
      <header>
        <nav className="navbar navbar-expand fixed-top">
          <div className="container">
            <a
              className="btn btn-link"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <FaBars size="15px" />
            </a>
            <Link to="/" className="navbar-brand text-primary">
              T.J Shoes
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-taraget="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="search-bar mx-auto">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="dropdown">
                      <a
                        className="btn btn-primary dropdown-toggle"
                        href="!#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        All
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                        id="categorList"
                      >
                        <li>
                          <a className="dropdown-item" href="!#">
                            Electronic Items
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="!#">
                            Fashion
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="!#">
                            Medicine & HealthCare
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="search-btn"
                    placeholder="search ..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      id="search-btn"
                    >
                      <MdSearch />
                    </button>
                  </div>
                </div>
              </div>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item d-md-none">
                  <button
                    className="btn nav-link"
                    id="search-btn"
                    onClick={() => {
                      let searchForm = document.querySelector(".search-bar");
                      searchForm.classList.toggle("active");
                    }}
                  >
                    <MdSearch />
                  </button>
                </li>
                <li className="nav-item">
                  <div
                    className="dropdown animate user-widget"
                    aria-labelledby="dropDownMenuCart"
                    style={{ zIndex: "100", width: "100%" }}
                  >
                    <a
                      className="nav-link"
                      href="!#"
                      type="button"
                      id="dropDownMenucart"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <MdShoppingCart />
                      <span className="badge bg-secondary text-primary position-absolute top-2 start-60 translate-middle rounded-circle">
                       0
                      </span>
                    </a>

                    { (
                      <>
                        <div
                          className="dropdown-menu slideIn animate user-widget p-2"
                          style={{ width: "400px" }}
                        >
                          <div className="container">
                     
                        </div>

                          <button className="btn w-100 btn-sm  btn-block btn-primary">
                            Check Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </li>

                {/* <li className="nav-item">
                  <a className="nav-link" href="">
                    <MdLocalMall />
                    <span className="badge bg-dark text-primary position-absolute top-2 start-60 translate-middle rounded-circle">
                      {totalUniqueItems}
                    </span>
                  </a>
                </li> */}
                <li className="nav-item">
                  <a className="nav-link" href="!#">
                    <MdFavorite />
                    <span className="d-none d-lg-inline text-nowrap">
                      favorite
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <div
                    className="dropdown animate user-widget"
                    aria-labelledby="dropdownMenuButton1"
                    style={{ zIndex: "100", width: "100%" }}
                  >
                    <a
                      className="nav-link"
                      href="!#"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <MdAccountCircle />
                      <span className="d-none d-md-inline">
                        {!user && <>Guest</>}
                        {user && <>{user.last_name}</>}
                      </span>
                    </a>
                    {!user && (
                      <>
                        <div className="dropdown-menu slideIn animate user-widget">
                          <div className="login">
                            <div>
                              <p className="text-muted mb-2 float-center">
                                Welcome To T.J Shoes
                              </p>
                              <button
                                type="button"
                                className="btn btn-sm btn-block btn-primary col-12 my-2"
                                onClick={() => navigate("/login")}
                              >
                                Sign In
                              </button>
                              <br />
                              <p className="text-muted text-center">
                                Use Social Accounts
                              </p>
                            </div>
                            <div className="social-line text-center">
                              <FacebookLogin
                                cssClass="btn-social btn-outline-facebook small waves-effect waves-light p-1m-1"
                                btnText="Sign In With Facebook"
                                icon={<FaFacebookF />}
                              />

                              <GoogleLogin
                                cssClass="d-inline-block m-1"
                                size="large"
                                width="180px"
                                height="35px"
                              />
                            </div>
                            <br />
                            <p className="text-muted mb-2 text-left">
                              <Link to="/register">New customer ?</Link>
                            </p>
                            <button
                              onClick={() => navigate("/register")}
                              type="button"
                              className="btn btn-primary btn-sm col-12 my-2"
                            >
                              Register
                            </button>
                          </div>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item mx-auto" href="!#">
                            My Orders
                          </a>
                          <a className="dropdown-item mx-auto" href="!#">
                            My Wish list
                          </a>
                          <a className="dropdown-item mx-auto" href="!#">
                            My Favorite Items
                          </a>
                        </div>
                      </>
                    )}
                    {user && (
                      <>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="dropdownMenuButton1"
                        >
                          <div className="login">
                            <div>
                              <div
                                className="d-flex"
                                style={{ userSelect: "none" }}
                              >
                                <div>
                                  <Link to="/user/profile">
                                    <img
                                      src={user.picture}
                                      width="60"
                                      referrerPolicy={
                                        user.provider == "google"
                                          ? "no-referrer"
                                          : null
                                      }
                                      height="60"
                                      className="img-thumbnail rounded-circle shadow"
                                      alt=""
                                    />
                                  </Link>
                                </div>
                                <div className="align-self-center">
                                  Welcome
                                  <h6>{user.first_name}</h6>
                                </div>
                              </div>
                              <button
                                type="button"
                                className="btn btn-sm btn-block btn-primary col-12 my-2"
                                onClick={logout}
                              >
                                Sign Out
                              </button>
                              <br />

                              <div className="dropdown-divider"></div>
                              <a className="dropdown-item mx-auto" href="!#">
                                My Orders
                              </a>
                              <a className="dropdown-item mx-auto" href="!#">
                                My Wish list
                              </a>
                              <a className="dropdown-item mx-auto" href="!#">
                                My Favorite Items
                              </a>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
