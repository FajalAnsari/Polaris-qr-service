
export const addParamsToUrl= (url) =>{
    const params=JSON.parse(localStorage.getItem('query_params'));
    return `${url}?location=${params.location}&table_id=${params.table_id}`;
}