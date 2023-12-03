import React , {useState} from "react"
import Header from "../components/Header";

import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "../redux/actions/ActionTypes";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AddUser = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { user } = useSelector((state) => state);
  const [form, setForm] = useState({
    id: String(new Date().getTime()),
    name: "",
    surname: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form);
    /* validation */
    if (form.name === "" || form.surname === "" || form.phone === "") {
      alert("Name, surname and phone number are compulsory.");
      return;
    }
    if (form.name.length < 2) {
      alert("Name can not be less than 2 characters.");
      return;
    }

    /* request to api && dispatch store */
   axios
      .post(`http://localhost:3004/user`, form)
      .then((res) => {
        dispatch({
          type: ActionTypes.ADD_USER_START,
          payload: form,
        });
        navigate("/")
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
             Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Janet"
              value={form.name}
              onChange={(event) =>
                setForm({ ...form, name: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">
            Surname
            </label>
            <input
              type="text"
              className="form-control"
              id="surname"
              placeholder="Harlez"
              value={form.surname}
              onChange={(event) =>
                setForm({ ...form, surname: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="janetthrlz@gmail.com"
              value={form.email}
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="phone"
              className="form-control"
              id="phone"
              placeholder="5234625432"
              value={form.phone}
              onChange={(event) =>
                setForm({ ...form, phone: Number(event.target.value) })
              }
            />
          </div>
          
        
          <div className="d-flex justify-content-center my-5">
            <button className="btn btn-primary w-50" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddUser