import store from '../store';

export const addParamsToUrl= (url) =>{
    const state=store.getState();
    return `${url}?location=${state.queryParams.location}&table_id=${state.queryParams.table_id}`;
}