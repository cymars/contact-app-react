import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Userlist from './components/Userlist';
import AddUser from './pages/AddUser';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import ActionTypes from "./redux/actions/ActionTypes";
import EditUser from "./pages/EditUser";
import axios from 'axios'; // Axios kütüphanesini ekledik
import store from "./redux/store";


function App() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state)

  useEffect(() => {
    dispatch({ type: ActionTypes.GET_USERS_START });
    
    // Axios ile veriyi alıyoruz
    axios.get('http://localhost:3004/user')
      .then((res) => {
        dispatch({
          type: ActionTypes.GET_USERS_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: ActionTypes.GET_USERS_FAIL,
          payload: "Serverda bir hata oluştu",
        });
      });
  }, []);

  if (user.success === false)
    return null;


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/user" element={<Userlist />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/edit-user/:userId" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;