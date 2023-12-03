import React, { useState } from "react";
import Header from "../components/Header";

import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

import ActionTypes from "../redux/actions/ActionTypes";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useSelector((state) => state);
  const myUser = user.user.find((item) => item.id === params.userId);

  const [form, setForm] = useState(myUser);
  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (form.name === "" || form.surname === "" || form.email=== "") {
      alert("User name, surname and email are compulsory.");
      return;
    }
    if (form.name.length < 2) {
      alert("User name can not be less than 2 characters");
      return;
    }
   axios
      .put(`http://localhost:3004/user/${params.userId}`, form)
      .then((res) => {
        dispatch({ type: ActionTypes.EDIT_USER, payload: form });
        navigate("/");
        window.location.reload('/')
      })
      .catch((err) => {});
  };
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Lydia"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Surname
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Burton"
              value={form.surname}
              onChange={(event) =>
                setForm({ ...form, surname: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="publisher" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="lydiaburton@yahoo.com"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="040539853353"
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: Number(event.target.value) })
              }
            />
          </div>
          
        
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit" >
              Update
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;