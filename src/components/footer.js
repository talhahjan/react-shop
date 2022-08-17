import { MdFavorite, MdAccountCircle, MdLocalMall } from "react-icons/md";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";
const FooterSm = () => {
  return (
    <>
      {/* <!-- footer for small screen --> */}
      <footer className="sm fixed-bottom shadow bg-body">
        <ul className="nav justify-content-between departments">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/">
              <MdFavorite />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="!#">
              <MdFavorite />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="!#">
              <MdLocalMall />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="!#">
              <MdAccountCircle />
            </a>
          </li>
        </ul>
      </footer>
      {/* <!-- footer for small screen   --> */}
    </>
  );
};

const FooterLg = () => {
  return (
    <>
      <footer className="bg-primary" id="footer">
        <div className="container">
          <div className="row">
            <aside className="col-md col-6">
              <h6 className="title">Brands</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="!#">Adidas</a>
                </li>
                <li>
                  <a href="!#">Puma</a>
                </li>
                <li>
                  <a href="!#">Reebok</a>
                </li>
                <li>
                  <a href="!#">Nike</a>
                </li>
              </ul>
            </aside>
            <aside className="col-md col-6">
              <h6 className="title">Company</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="!#">About us</a>
                </li>
                <li>
                  <a href="!#">Career</a>
                </li>
                <li>
                  <a href="!#">Find a store</a>
                </li>
                <li>
                  <a href="!#">Rules and terms</a>
                </li>
                <li>
                  <a href="!#">Sitemap</a>
                </li>
              </ul>
            </aside>
            <aside className="col-md col-6">
              <h6 className="title">Help</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="!#">Contact us</a>
                </li>
                <li>
                  <a href="!#">Money refund</a>
                </li>
                <li>
                  <a href="!#">Order status</a>
                </li>
                <li>
                  <a href="!#">Shipping info</a>
                </li>
                <li>
                  <a href="!#">Open dispute</a>
                </li>
              </ul>
            </aside>
            <aside className="col-md col-6">
              <h6 className="title">Account</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="!#"> User Login </a>
                </li>
                <li>
                  <a href="!#"> User register </a>
                </li>
                <li>
                  <a href="!#"> Account Setting </a>
                </li>
                <li>
                  <a href="!#"> My Orders </a>
                </li>
              </ul>
            </aside>
            <aside className="col-md">
              <h6 className="title">Social</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="!#">
                    <FaFacebookF />
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="!#">
                    <FaTwitter /> Twitter
                  </a>
                </li>
                <li>
                  <a href="!#">
                    <FaInstagram /> Instagram
                  </a>
                </li>
                <li>
                  <a href="!#">
                    <FaYoutube />
                    Youtube
                  </a>
                </li>
              </ul>
            </aside>
          </div>
          {/* <!-- row.// --> */}
          {/* <!-- footer-top.// --> */}
          <div className="footer-bottom row">
            <div className="col-md-12 col-lg-6">
              <p className="policy">
                Privacy Policy - Terms of Use - User Information Legal Enquiry
                Guide
              </p>
            </div>
            <div className="col-md-12 col-lg-6">
              <p className="copyright">
                &copy 2019 Company name, All rights reserved
              </p>
            </div>
          </div>
        </div>
        {/* <!-- //container --> */}
      </footer>
    </>
  );
};

const Footer = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [width]);
  if (width > 768) return <FooterLg />;
  else return <FooterSm />;
};

export default Footer;
