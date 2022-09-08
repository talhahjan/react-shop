import SideBar from "../components/sideBar";
import { useEffect } from "react";
import CatsBySection from "../components/catsBySection";
import Skeleton from "react-loading-skeleton";
import CardProduct from "../components/productcard";
import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  useFeaturedProduct,
  useLatestProduct,
  useSections,
  usePopularBrands,
} from "../hooks/fetchData";

const logoSliderSetting = {
  autoplay: true,
  autoplaySpeed: 1000,
  dots: false,
  infinite: true,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};
const productSliderSettings = {
  dots: false,
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const Home = () => {
  const { isLoading: sectionsLoading, data: sectionsData } = useSections();

  const { isLoading: latestLoading, data: latestData } = useLatestProduct();

  const { isLoading: featuredLoading, data: featuredData } =
    useFeaturedProduct();

  const { isLoading: brandsLoading, data: brandsData } = usePopularBrands();

  useEffect(() => {
    document.title = "T.J Shoes Collection :: Best Stop For Shopping";

    let searchForm = document.querySelector(".search-bar");

    window.onscroll = () => {
      searchForm.classList.remove("active");
    };
    return () => {};
  }, []);

  return (
    <>
      {/* <SideBar /> */}
      <SideBar />
      <div className="welcome-page">
        {/* Mega Menu */}

        {/* <!-- carousel starts  --> */}
        <div
          id="carouselExampleIndicators"
          className="carousel slide mt-10 border-circle"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={
                  process.env.REACT_APP_API_BASE_URL +
                  "/assets/images/slide1.jpg"
                }
                className="d-block w-100"
                alt="..."
                style={{ maxHeight: "300px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                style={{ maxHeight: "300px" }}
                src={
                  process.env.REACT_APP_API_BASE_URL +
                  "/assets/images/slide2.jpg"
                }
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                style={{ maxHeight: "300px" }}
                src={
                  process.env.REACT_APP_API_BASE_URL +
                  "/assets/images/slide3.jpg"
                }
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* <!-- carousel ends  --> */}

        <div className="categories shadow">
          {sectionsLoading && (
            <>
              <LoadingSections />
            </>
          )}

          {!sectionsLoading && sectionsData && (
            <>
              {/* {console.log(sectionsData.data)} */}
              <CatsBySection section={sectionsData.data} />
            </>
          )}
        </div>
        {/* popular product slider  */}
        <div className="card my-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6 className="title text-primary">Popular Products</h6>
              <FaArrowRight
                className="text-primary"
                style={{ fontSize: "1.2rem" }}
              />
            </div>
            {featuredLoading && (
              <div className="department-wrapper">
                <Skeleton
                  className="mx-2"
                  height={200}
                  width={150}
                  count={10}
                  inline={true}
                />
              </div>
            )}

            {!featuredLoading && featuredData && (
              <Slider {...productSliderSettings}>
                {featuredData.data.map((curItem) => {
                  return (
                    <div key={curItem.id}>
                      <CardProduct product={curItem} />
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
        {/* popular product slider  */}

        {/* featured products slider  */}
        <div className="card my-2">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h6 className="title text-primary">Featured Products</h6>
              <FaArrowRight
                className="text-primary"
                style={{ fontSize: "1.2rem" }}
              />
            </div>

            {latestLoading && (
              <div className="department-wrapper">
                <div>
                  <Skeleton
                    className="mx-2 rounded-3 shadow"
                    height={200}
                    width={150}
                    count={10}
                    inline={true}
                  />
                </div>
              </div>
            )}

            {!latestLoading && latestData && (
              <Slider {...productSliderSettings}>
                {latestData.data.map((curItem) => {
                  return (
                    <div key={curItem.id}>
                      <CardProduct product={curItem} />
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
        {/* featured products slider  */}

        {/* brads logoo slider  */}
        {/* featured products slider  */}
        <div className="card my-2 brands-slider">
          <div className="card-body">
            <h2 className="title text-primary">Top Brands</h2>

            {brandsLoading && (
              <div className="department-wrapper">
                <div>
                  <Skeleton
                    className="mx-2 shadow"
                    height={100}
                    width={150}
                    count={10}
                    inline={true}
                  />
                </div>
              </div>
            )}

            {!brandsLoading && brandsData && (
              <Slider {...logoSliderSetting}>
                {brandsData.data.map((curItem) => {
                  return (
                    <div key={curItem.id} className="item">
                      <div className="img-container rounded-3 shadow">
                        <img
                          src={
                            process.env.REACT_APP_API_BASE_URL + curItem.logo
                          }
                          alt={curItem.title}
                        />

                        <p className="text-center pt-2 fw-bold">
                          {curItem.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
        {/* featured products slider  */}
        {/* brand logo slider  */}
      </div>
    </>
  );
};

const LoadingSections = () => {
  return (
    <>
      <div>
        <Skeleton
          width={40}
          height={12}
          count={2}
          className="m-1"
          inline={true}
        />
      </div>
      <div>
        <Skeleton className="m-1" width={60} height={1} />
      </div>

      <div className="department-wrapper">
        <Skeleton
          width={60}
          height={25}
          count={6}
          inline={true}
          className="mx-2"
          borderRadius="25px"
        />
      </div>
    </>
  );
};
export default Home;
