import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdFavorite, MdLocalMall, MdVisibility } from "react-icons/md";
const CardProduct = ({ product }) => {

  const section = product.categories[0].section;

  const category = product.categories[0];

  return (
    <div className="card-product">
      <div className="imgBx">
        <img src={product.thumbnails[0].path} alt="Product Thumbnail" />
        <ul className="action">
          <li>
            <MdFavorite />
            <span>Add to WishList</span>
          </li>
          <li>
            <MdLocalMall />
            <span>Add to cart</span>
          </li>
          <li>
            <Link
              to={
                "/collection/" +
                section.slug +
                "/" +
                category.slug +
                "/" +
                product.slug
              }
            >
              <MdVisibility style={{ color: "white" }} />
              <span>View Detail</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="p_name">
          <h3>{product.title}</h3>
        </div>
        <div className="price_rating">
          <span className="prices">
            <h2
              className={
                product.discount > 0 && product.discount_price
                  ? "actual discount"
                  : "actual"
              }
            >
              {product.price}
            </h2>
            {product.discount > 0 && product.discount_price > 0 && (
              <h2 className="discounted">
                {product.price - product.discount_price}
              </h2>
            )}
          </span>
          <div
            className="bg-success rounded-3 px-1 d-flex justify-content-around align-items-center"
            style={{ width: "50px", height: "25px" }}
          >
            <span>
              <FaStar className="text-warning" size={16} />
            </span>
            <span> 4.6</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardProduct;
