import React, { useState, useEffect } from "react";
import axios from "axios";

const getdata = async () => {
  await axios
    .get(`https://graph.facebook.com/v14.0/me?fields=id%2Cname`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const Login1 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getdata();
  }, []);

  return <div>Login</div>;
};
export default Login1;
