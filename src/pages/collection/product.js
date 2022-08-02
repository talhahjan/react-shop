import SideBar from "../../components/sideBar";
import { useEffect, useState } from "react";
import { FaStar, FaRupeeSign, FaPen } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdShoppingCart, MdFavorite, MdShare } from "react-icons/md";
import Parser from "html-react-parser";
import Collapsable from "../../components/collapsable";
import { useProduct } from "../../hooks/fetchData";
// import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useParams, Link } from "react-router-dom";
const Product = () => {
  let { section, category, product } = useParams();

  const { isLoading, data, isError } = useProduct(product);

  const [size, setSize] = useState(null);
  const notify = (type, msg) => {
    switch (type) {
      case "error":
        toast.error(msg);
        break;
      case "success":
        toast.success(msg);
        break;
      case "warn":
        toast.warn(msg);
        break;
      case "info":
        toast.info(msg);
        break;
      default:
        toast(msg);
    }
  };

  useEffect(() => {
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
  });
  const addToCart = () => {
    const sizes = document.querySelector(".sizes");
    if (!size) {
      sizes.classList.add("shake");
      // Buttons stops to shake after 2 seconds
      notify("error", "Please Select Size");
      setTimeout(() => sizes.classList.remove("shake"), 1000);
    } else {
      notify("success", "result Added Successfuly");
    }
  };
  useEffect(() => {
    document.querySelector("body").classList.add("page-product-detail");
    return () => {
      document.querySelector("body").classList.remove("page-product-detail");
    };
  }, []);
  const selectSize = (e) => {
    const sizesClass = document.querySelectorAll(".size");
    for (let i = 0; i < sizesClass.length; i++) {
      sizesClass[i].classList.remove("active");
    }
    document.getElementById(`size_${e}`).classList.add("active");
    setSize(e);
  };
  return (
    <>
      {/* <SideBar /> */}
      <SideBar />
      <main className="product-detail">
        <div className="container-fluid">
          {isLoading && (
            <>
              <div className="">
                <div className="py-4">loading</div>
                <div className="py-4">Loding ..</div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">Loading ..</div>
                  <div className="col-md-12 col-lg-6">Loading ..</div>
                </div>
              </div>
            </>
          )}
          {!isLoading && !isError && data && (
            <>
              {/* <!-- breadcrup start  --> */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item text-capitalize">
                    <Link to={"/collection/" + section}>{section}</Link>
                  </li>
                  <li className="breadcrumb-item text-capitalize">
                    <Link to={"/collection/" + section + "/" + category}>
                      {category}
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-capitalize"
                    aria-current="page"
                  >
                    {data.data.title}
                  </li>
                </ol>
              </nav>
              {/* <!-- breadcrumb ends  --> */}
              {/* <!-- category title  --> */}
              <div className="category-title">
                <h6 className="text-center my-2 py-2 bg-light text-dark text-uppercase ">
                  {data.data.title}
                </h6>
              </div>
              {/* <!-- category title  --> */}

              <div className="container">
                <div className="card-product">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="card">
                        <div className="card-body">
                          {/* <!-- card thumbnails  --> */}
                          <img
                            src={data.data.thumbnails[0].path}
                            style={{ maxHeight: "400px", maxWidth: "300px" }}
                            alt=""
                          />
                          {/* <!-- card thumbnails  --> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                      <div className="card">
                        <div className="card-body">
                          <span className="share">
                            <a href="!#" className="btn" role="button">
                              <MdShare />
                            </a>
                            <a href="!#" className="btn" role="button">
                              <MdFavorite />
                            </a>
                          </span>
                          <div className="my-1">
                            <a href="!#" className="product-link">
                              T.J Shoes
                            </a>
                          </div>
                          <h5>
                            {data.data.title}
                            <span className="badge text-danger">new</span>
                          </h5>
                          <span className="stock text-success">
                            <FaPen /> In stock
                          </span>
                          <div className="reviews">
                            <ul className="stars">
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar />
                              </li>
                              <li>
                                <FaStar style={{ color: "gray" }} />
                              </li>
                            </ul>
                            <span>(64 reviews)</span>
                          </div>
                          <div className="p-list">
                            <FaRupeeSign style={{ fontSize: "0.9rem" }} />
                            {data.data.discount > 0 && (
                              <span>
                                <del className="text-danger">
                                  {data.data.price}
                                </del>
                                <small>
                                  {data.data.price - data.data.discount_price}
                                </small>
                              </span>
                            )}
                            {!data.data.discount && (
                              <span>
                                <h2>{data.data.price}</h2>
                              </span>
                            )}
                          </div>
                          <div className="color my-2">
                            Color : <span> {data.data.color} </span>
                          </div>

                          <span>Size </span>
                          <div className="sizes">
                            {JSON.parse(data.data.stock).map((curItem) => {
                              let [size, pairs] = curItem;
                              let disabled = pairs < 0 ? " disabled" : "";
                              return (
                                <div
                                  key={size}
                                  className={"btn btn-sm size" + disabled}
                                  id={`size_${size}`}
                                  onClick={() => {
                                    selectSize(size);
                                  }}
                                >
                                  {size}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {data.data.description && (
                        <Collapsable title="Description">
                          <p> {Parser(data.data.description)} </p>
                        </Collapsable>
                      )}
                      {console.log(process.env)}
                      <Collapsable title="More Details">
                        {data.data.article && (
                          <div className="py-1">
                            <span>
                              <b>Article # :</b>
                            </span>
                            <span className="d-inline-block mx-2 text-capitalize">
                              {data.data.article}
                            </span>
                          </div>
                        )}
                        {data.data.warranty && (
                          <div>
                            <span>
                              <b>Warranty :</b>
                            </span>
                            <span className="d-inline-block mx-2 text-capitalize">
                              {data.data.warranty
                                ? data.data.warranty
                                : "No Warranty"}
                            </span>
                          </div>
                        )}

                        {data.data.features && (
                          <div className="py-1">
                            <ul className="list-inline list-unstyled">
                              <b>Features : </b>
                              {JSON.parse(data.data.features).map((curItem) => {
                                return (
                                  <li
                                    className="list-inline-item text-capitalize"
                                    key={curItem}
                                  >
                                    {curItem}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                        {data.data.materials && (
                          <div className="py-1">
                            <ul className="list-inline list-unstyled">
                              <b>Materials : </b>
                              {JSON.parse(data.data.materials).map(
                                (curItem) => {
                                  return (
                                    <li
                                      className="list-inline-item text-capitalize"
                                      key={curItem}
                                    >
                                      {curItem}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        )}
                      </Collapsable>
                      <div className="d-flex bd-highlight btn-buy my-2">
                        <div className="w-100 p-1 bd-highlight">
                          <button
                            id="btn-buy"
                            onClick={() => addToCart()}
                            className="btn btn-primary btn-block w-100"
                          >
                            <MdShoppingCart /> Add To Cart
                          </button>
                        </div>
                        <div className="p-1 flex-shrink-1 bd-highlight">
                          <a href="!#" className="btn btn-primary btn-block">
                            <MdFavorite />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <ToastContainer />
    </>
  );
};

export default Product;
