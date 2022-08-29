import { MdHome } from "react-icons/md";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function Error({ error }) {
  const location = useLocation();
  let { status, statusText, code, message } = location.state;

  useEffect(() => {
    document.title = `T.J Shoes Collection ::  ${message}`;
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold"> {status}</h1>
          <h3> {statusText}</h3>
          <h4> {code}</h4>
          <p> {message}</p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            <MdHome /> Go To Homage
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;
