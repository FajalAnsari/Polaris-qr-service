import { combineReducers } from "redux";
import { addcartReducer } from "../reducer/addcartReducer";
import { queryParamsReducer } from "../reducer/queryParamsReducer";


const rootred = combineReducers({
    addcartReducer,
    queryParamsReducer
});

export default rootred