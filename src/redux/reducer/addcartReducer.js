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
        const ItemIndex = state.carts.findIndex(
          (item) => item.item_sku === action.payload.item_sku
        );
  
        if (ItemIndex >= 0) {
          state.carts[ItemIndex].item_qoh += 1;
        } else {
          const temp = { ...action.payload, item_qoh: 1 };
          const updatedCarts = [...state.carts, temp];
          updateLocalStorage(updatedCarts);
  
          return {
            ...state,
            carts: updatedCarts,
          };
        }
  
      case "RMV_CART":
        const data = state.carts.filter(
          (el) => el.item_sku !== action.payload
        );
        updateLocalStorage(data);
  
        return {
          ...state,
          carts: data,
        };
  
      case "RMV_ONE":
        const ItemIndex_dec = state.carts.findIndex(
          (item) => item.item_sku === action.payload.item_sku
        );
  
        if (state.carts[ItemIndex_dec].item_qoh >= 1) {
          state.carts[ItemIndex_dec].item_qoh -= 1;
          updateLocalStorage([...state.carts]);
          return {
            ...state,
            carts: [...state.carts],
          };
        } else if (state.carts[ItemIndex_dec].item_qoh === 1) {
          const data = state.carts.filter(
            (el) => el.item_sku !== action.payload
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
  