export const ADD_CART = 'ADD_CART';
export const RMV_CART = 'RMV_CART';
export const RMV_ONE = 'RMV_ONE';
export const SET_CART = 'SET_CART';
export const STORE_Q_PARAMS='STORE_Q_PARAMS';

export const ADD = (item) => {
    return {
        type:'ADD_CART',
        payload:item
    }
}

export const DLT = (item) => {
    return {
        type:'RMV_CART',
        payload:item
    }
}

export const REMOVE = (item) => {
    return {
        type:'RMV_ONE',
        payload:item
    }
}

export const setCart = (cartData) => {
    return {
      type: SET_CART,
      payload: cartData,
    };
  };


  export const StoreQueryParams = (queryParams) => {
    return {
        type:STORE_Q_PARAMS,
        payload: queryParams
    }
  }