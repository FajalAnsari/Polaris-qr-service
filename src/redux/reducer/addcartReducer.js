// reducers/cartReducer.js
const updateLocalStorage = (carts) => {
    localStorage.setItem('cart', JSON.stringify(carts));
  };
  const getLocalStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };
  
  const INIT_STATE = {
    carts:getLocalStorage(),
  };
  
  export const addcartReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
      case "ADD_CART":
        //add random id generate for each item 
        //if the item has modifiers
        let updatedCarts=[];
        if(action.payload.modifieritems){
          //if the item has modifier
         if(action.payload.uuid){ 
            const ItemIndex = state.carts.findIndex(
              (item) => item.uuid === action.payload.uuid
            );
            if (ItemIndex >= 0) {
              state.carts[ItemIndex].item_qoh += 1;
              updatedCarts = [...state.carts];
            } else {  
              const temp = { ...action.payload, item_qoh: 1 };
              updatedCarts = [...state.carts, temp];
            }
          } else {
            const temp = {...action.payload, item_qoh: 1,uuid: Math.random().toString(36).substring(2,6)};
            updatedCarts = [...state.carts, temp];
          }
        } else {
          //if it is a normal without modifiers
          const ItemIndex = state.carts.findIndex(
            (item) => item.item_sku === action.payload.item_sku
          );
          if (ItemIndex >= 0) {
            state.carts[ItemIndex].item_qoh += 1;
            updatedCarts = [...state.carts];
          } else {
            const temp = { ...action.payload, item_qoh: 1 };
            updatedCarts = [...state.carts, temp];
          }
        }
        updateLocalStorage(updatedCarts);
        return {
          ...state,
          carts: updatedCarts,
        };
  
      case "RMV_ONE":
      
        //remove items with modifiers
        if(action.payload.modifieritems){
           const itemIndex = state.carts.findIndex(item=>item.uuid == action.payload.uuid);
           console.log('item',action.payload);
           if(state.carts[itemIndex].item_qoh > 1 ){
            state.carts[itemIndex].item_qoh --;
           } else {
            state.carts = state.carts.filter(item=>item.uuid != action.payload.uuid);
          }
           updateLocalStorage([...state.carts]);
           return {
            ...state,
            carts: [...state.carts],
          };
        } 
        //no modifiers 
        const ItemIndex_dec = state.carts.findIndex(
          (item) => item.item_sku === action.payload.item_sku
        );
  
        if (state.carts[ItemIndex_dec].item_qoh > 1) {
          state.carts[ItemIndex_dec].item_qoh -- ;
          updateLocalStorage([...state.carts]);
          return {
            ...state,
            carts: [...state.carts],
          };
        } else  {
          const data = state.carts.filter(
            (el) => el.item_sku !== action.payload.item_sku
          );
          updateLocalStorage(data);
          return {
            ...state,
            carts: data,
          };
        }
        
      case "SET_CART":
        return {
          ...state,
          carts: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default addcartReducer;
  