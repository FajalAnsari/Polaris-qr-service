import { combineReducers } from "redux";
import { addcartReducer } from "../reducer/addcartReducer";
import { queryParamsReducer } from "../reducer/queryParamsReducer";
import itemsReducer from "../reducer/itemsReducer";


const rootred = combineReducers({
    addcartReducer,
    queryParamsReducer,
    itemsReducer
});

export default rootred