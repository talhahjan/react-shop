import SideBar from "../components/sideBar";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {emptyCart } from "../container/redux/actions/actions";
const Cart = ({cart}) => {
const dispatch=useDispatch()
  useEffect(() => {
    console.log(cart)
    document.title = `T.J Shoes Collection :: Shopping Cart `;
    let searchForm = document.querySelector(".search-bar");
    document.querySelector("#search-btn").onclick = () => {
      searchForm.classList.toggle("active");
    };

    window.onscroll = () => {
      searchForm.classList.remove("active");
    };
    window.onscroll = () => {
      searchForm.classList.remove("active");
    };
    document.querySelector("body").classList.add("page-product-detail");
    return () => {
      document.querySelector("body").classList.remove("page-product-detail");
    };
  },[]);

  return (
    <>
      {/* <SideBar /> */}
      <SideBar />
      <main className="product-detail">
        <div className="container-fluid">
              {/* <!-- breadcrumb start  --> */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-capitalize"
                    aria-current="page"
                  >
                    Shopping Cart
                  </li>
                </ol>
              </nav>
              {/* <!-- breadcrumb ends  --> */}
              {/* <!-- category title  --> */}
              <div className="category-title">
                <h6 className="text-center my-2 py-2 bg-light text-dark text-uppercase ">
                 Shopping Cart
                </h6>
              </div>
              {/* <!-- category title  --> */}

              <div className="container">
                <button className="btn btn-danger" onClick={()=>dispatch({type:"EMPTY_CART"})}>Clear cart</button>
                Shopping Cart
              </div>
        </div>
      </main>
      <ToastContainer />
    </>
  );
};


function mapStateToProps(state) {
  const { cart } = state
  return { cart }
}





export default connect(mapStateToProps)(Cart)

