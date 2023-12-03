import React, { useEffect, useState } from "react";

import Header from "../components/Header";

import { useParams, Link } from "react-router-dom";
import axios from "axios";

const userDetail = () => {
  const params = useParams();
  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    /* http://localhost:3004/Users/2 */
    axios.get(`http://localhost:3004/${params.userId}`)
      .then((resUser) => {
        console.log(resUser.data);
    
      })
      .catch((err) => {});
  }, []);
  if (myUser === null ) return null;
  return (
    <div>
      <Header />
      <div className="container my-5">
        <h3>Name: {myUser.name}</h3>
        <h3>Role: {myUser.role}</h3>
        <h3>Email: {myUser.email} &#8378;</h3>
        <h3>Phone: {myUser.phone}</h3>
        <Link to={"/"}>Geri</Link>
      </div>
    </div>
  );
};

export default userDetail;