import { STORE_Q_PARAMS } from "../action/action";

const INIT_STATE = {
    location:'',
    table_id:''
  };
  
  export const queryParamsReducer = (state = INIT_STATE, action) => {
    switch(action.type){
        case STORE_Q_PARAMS:
            //store in local storage
            localStorage.setItem('query_params',action.payload);
            return {
                ...state,
                location: action.payload.location,
                table_id: action.payload.table_id
            }
            default:
                return state;
    }
  }

  export default queryParamsReducer;