import { combineReducers } from "redux";
import { addcartReducer } from "../reducer/addcartReducer";

const rootred = combineReducers({
    addcartReducer,
});

export default rootred