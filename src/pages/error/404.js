import { useEffect } from "react";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function NotFound() {
  useEffect(() => {
    document.title = "T.J Shoes Collection :: 404 Error page not found ";
  }, []);
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <h3> Not Found</h3>
          <h4>the page could not be found</h4>
          <p>ERR_BAD_REQUEST</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            <MdHome /> Go To Homape
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
