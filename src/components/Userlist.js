import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActionTypes from "../redux/actions/ActionTypes";
import { Link } from "react-router-dom";
import store from "../redux/store";
import Reducer from "../redux/reducers/Reducer";
import axios from "axios";
import CustomModal from "./CustomModal";
import AddUser from "../pages/AddUser";




const Userlist = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state )=> state);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [willDeleteUser, setWillDeleteUser] = useState("");
    const [searchText, setSearchText] = useState("");
    const [filteredUser, setFilteredUser] = useState(user.user);


    useEffect(() => {
        const temp = user.user.filter(
            (item) =>
                item.name.toLowerCase().includes(searchText.toLowerCase()) === true ||
                item.surname.toLowerCase().includes(searchText.toLowerCase()) === true
        );
        setFilteredUser(temp);
    }, [searchText, user.user]);

    const deleteUser = (id) => {
        dispatch({ type: ActionTypes.DELETE_USER_START })
        axios.delete(`http://localhost:3004/user/${id}`)
            .then((res) => {
                dispatch({
                    type: ActionTypes.DELETE_USER_SUCCESS,
                    payload: id,
                });
            })
            .catch((err) => {
                dispatch({
                    type: ActionTypes.DELETE_USER_FAIL,
                    payload: "An error occurred while deleting the contact",
                });
            });
    };





    return (
        <div className="container my-5 text-center">
            <div className="d-flex justify-content-between" >
                <input
                    className="form-control w-75"
                    type="text"
                    placeholder="Search the contact name..."
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                    
                />

             
            </div>
            <div className="card">
                <div className="card-header d-flex justify-content-between" >
                    <h2>My Contacts</h2>    {user.user.length === 0 ? (
                    <Link to={"/add-user"}>Add a contact first</Link>
                ) :(
                    <Link to={"/add-user"} className="btn btn-primary">
                      Add Contact
                    </Link>
                  ) }
                </div>
                
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th >Code </th>
                                <th>Name </th>
                                <th>Surname</th>
                                <th>Email </th>
                                <th>Phone </th>

                                <th>Action </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {filteredUser.map((user, index) => (

                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.name} </td>
                                    <td>{user.surname} </td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>
                                        <button
                                            onClick={() => {
                                                setShowDeleteModal(true);
                                                setWillDeleteUser(user.id);
                                            }}
                                            className="btn btn-sm btn-danger">
                                            Delete

                                        </button>
                                        <Link to={`/edit-user/${user.id}`} className="mx-3 btn btn-sm btn-primary">
                                            Edit
                                        </Link>


                                    </td>
                                </tr>

                            ))}
                        </tbody>

                    </table>
                    {showDeleteModal === true && (
                        <CustomModal
                            title="Deletion "
                            message="Are you sure you want to delete the contact?"
                            onCancel={() => setShowDeleteModal(false)}
                            onConfirm={() => {
                                deleteUser(willDeleteUser);
                                setShowDeleteModal(false);
                            }}
                        />
                    )}
                </div>
            </div>

        </div>
    );

};
export default Userlist