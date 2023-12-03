import { createStore,combineReducers } from "redux";
import thunk from 'redux-thunk'
import Reducer from "./reducers/Reducer";

const rootReducer=combineReducers({
    user:Reducer} 
    );

const store=createStore(rootReducer)

export default store