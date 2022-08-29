import { useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import Filter from "../../components/filter";
import { MdTune } from "react-icons/md";
import CardProduct from "../../components/productcard";
import { useCategory } from "../../hooks/fetchData";
import spinner from "../../assets/images/spinner.gif";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Category = () => {
  let { section, category } = useParams();
  const {
    isLoading,
    isError,
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useCategory(category);
  useEffect(() => {
    document.title = `T.J Shoes Collection :: ${section}  > ${category}`;
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

    const sorting = document.querySelectorAll(".sorting");
    const sortSelect = document.querySelector("#SortMenuButton");

    for (let i = 0; i < sorting.length; i++) {
      sorting[i].addEventListener("click", function (event) {
        document.querySelector("#SortMenuButton").innerHTML = this.innerText;
      });
    }

    for (let i = 0; i < sortSelect.length; i++) {
      sortSelect[i].addEventListener("click", function (event) {
        document.querySelector("#SortMenuButton").innerHTML = this.innerText;
      });
    }

    document.querySelector("body").classList.add("page-product-listing");
    return () => {
      document.querySelector("body").classList.remove("page-product-listing");
    };
  }, []);

  return (
    <>
      {/* <SideBar /> */}
      <Filter />
      <main className="product-listing">
        <div className="container-fluid">
          {/* <!-- breadcrup start  --> */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-start">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={"/collection/" + section}>{section}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {category}
              </li>
            </ol>
          </nav>
          {/* <!-- breadcrumb ends  --> */}
          {/* <!-- category title  --> */}
          <div className="category-title">
            <h6 className="text-center my-2 py-2 bg-light text-dark text-uppercase ">
              {category}
            </h6>
          </div>
          {/* <!-- category title  --> */}

          {/* <!-- filter options sort  --> */}
          <div className="filter-sort">
            <div className="d-flex justify-content-between mx-auto mt-2 px-2">
              <div className="filter-btn">
                <button
                  className="btn btn-outline-primary btn-sm"
                  data-bs-toggle="offcanvas"
                  href="#filterOptions"
                  aria-controls="filterOptions"
                  id="filter"
                >
                  <MdTune />
                  <span>Filter</span>
                </button>
              </div>
              <div className="sort">
                <div className="d-none d-lg-flex align-items-center">
                  <span
                    className="text-primary mr-2"
                    style={{ fontWeight: "700" }}
                  >
                    Sort By :&nbsp;
                  </span>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button className="btn btn-outline-primary btn-sm">
                      Trending
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      Latest
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      Popular
                    </button>
                    <button className="btn btn-outline-primary btn-sm">
                      featured
                    </button>
                  </div>
                </div>
                <div className="dropdown d-flex d-lg-none">
                  <button
                    className="btn btn-outline-primary btn-sm dropdown-toggle"
                    type="button"
                    id="SortMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="SortMenuButton"
                    id="categorList"
                  >
                    <li>
                      <a className="dropdown-item sorting" href="!#">
                        Trending
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item sorting" href="!#">
                        Latest
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item sorting" href="!#">
                        Popular
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item sorting" href="!#">
                        Featured
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {isLoading && !isError && (
            <>
              <div>
                <Skeleton
                  baseColor="#fafafa"
                  highlightColor="#eaeaea"
                  className="m-1"
                  height={200}
                  width={180}
                  count={10}
                  inline={true}
                />
              </div>
            </>
          )}

          <div className="products my-2">
            {!isLoading &&
              !isError &&
              data?.pages.map((groups, i) => {
                return (
                  <Fragment key={i}>
                    {groups.data.data.map((product) => (
                      <CardProduct
                        key={product.id}
                        product={product}
                        category={category}
                      />
                    ))}
                  </Fragment>
                );
              })}
          </div>

          {!isLoading && (
            <>
              <button
                disabled={!hasNextPage}
                className="btn btn-outline-primary d-block mx-auto"
                onClick={fetchNextPage}
              >
                Load more
              </button>

              <div className="p-2">
                {isFetching && isFetchingNextPage ? (
                  <img src={spinner} className="mx-auto d-block" alt="" />
                ) : null}
                {!hasNextPage && (
                  <div className="alert alert-dark mb-1" role="alert">
                    You have seen all results want to see more consider remove
                    filter options
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Category;
