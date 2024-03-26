import {STORE_MODIFIER_ACTION, STORE_SELECTED_ITEM_MODIFIERS_ACTION} from "../action/items_action";

const INIT_STATE=[];
export const itemsReducer=(state = INIT_STATE, action)=>{
    switch(action.type){
        case STORE_MODIFIER_ACTION: {
            return {...state,modifiersData: action.payload}
        }
        case STORE_SELECTED_ITEM_MODIFIERS_ACTION : {
            return {...state,selectedItemsModifiers:action.payload}
        }
        default:
            return state;
    }
}

export default itemsReducer;