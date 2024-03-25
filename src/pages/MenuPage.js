import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/categoris";
import imageNotFound from "../images/not-image.jpg";
import { ADD } from "../redux/action/action";
import { useDispatch } from "react-redux";
import { addParamsToUrl } from "../helper/addParamsToUrl";

const MenuPage = () => {
  const [trackedModifiers,setTrackedModifiers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemModifiers, setSelectedItemModifiers] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [modifierData, setmodifierData] = useState([]);
  const [modifierCategories, setModifierCategories] = useState([]);
  const [modifierImage, setmodifierImage] = useState("");
  const [limit, setLimit] = useState(12);
  const [itemData, setItemData] = useState([]);
  const [selectedItem, setSelectedItem ] = useState([]);
  const [disableAddModifier, setDisableAddModifier ] = useState(null);
  const dispatch = useDispatch();

  const send = (e) => {
    setSelectedItem(e);
    //testing modifier

    const modifiersForItem = modifierData.filter(
      (modifier) => modifier.modifier_sku === e.item_sku
    ).reduce((acc,obj)=>{
      const key=obj.modifier_cat_id;
      if(!acc[key]){
        acc[key]={
          id:key,
          name:obj.modifier_cat_name,
          items:[],
        };
      }
      acc[key]['items'].push(obj);
      return acc;
    },{});

    //update tracked info
    if (Object.keys(modifiersForItem).length > 0) {
      if(!trackedModifiers[e.item_sku]){
        trackedModifiers[e.item_sku]= {};
        for(const [key,_] of Object.entries(modifiersForItem)){
          trackedModifiers[e.item_sku][key] = 0;
        }
      }
      setTrackedModifiers(trackedModifiers);
      setSelectedItemModifiers(modifiersForItem);
      disableAdd(e);
      setmodifierImage(e.item_image_address);
      setShowModal(true);
    } else {
      dispatch(ADD(e));
    }
  };

  const disableAdd= (item)=> {
    if(item.item_sku in trackedModifiers){
      for (const [key, value] of Object.entries(trackedModifiers[item.item_sku])) {
        //avoid checking
        if(modifierCategories[key].modifier_maximum_amount =="0" && modifierCategories[key].modifier_minimum_amount == "0") {
          continue;
        }
        const min = parseInt(modifierCategories[key].modifier_minimum_amount);
        const max = parseInt(modifierCategories[key].modifier_maximum_amount);
        if(!(value <= max && value >= min)) {
          setDisableAddModifier(true);
          return;
        }
      }
      setDisableAddModifier(false);
    }
  }
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItemModifiers(null);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategoryName(category.name);
    setSelectedCategory(category.id); // store the category id
  };

  const getShortenedText = (text, length) => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "...";
  };

  const loadMore = () => {
    const newLimit = limit + limit;
    setLimit(newLimit);
    if (newLimit >= itemData.length) {
      setLimit(itemData.length);
    }
  };

  const  setItemChecked = (item)=>{
    //category -> modifiers
    //         -> max allowed modifiers
    // 1-> item.checking  is it allowed ? yes check, no don;t check, if checked == the max disable the rest, not checking = decrease the count
    const category = modifierCategories[item.modifier_cat_id];
    const checkTrack = !(category.modifier_maximum_amount =="0" && category.modifier_minimum_amount == "0");
    const shallowCopy = {...selectedItemModifiers};
    let items = shallowCopy[item.modifier_cat_id].items;
    item.checked = !item.checked;
    let isMaxAllowedReached=false;
    for(let i=0;i<items.length;i++){
      if(items[i].modifier_id == item.id && items[i].modifier_sku == item.modifier_sku){
         items[i].checked = !items[i].checked;
        break;
      }
    }

    if(checkTrack){
      //add tracker
      if(item.checked){
            trackedModifiers[selectedItem.item_sku][item.modifier_cat_id]++;
      } else {
            trackedModifiers[selectedItem.item_sku][item.modifier_cat_id]--;
      }
      //check max
      isMaxAllowedReached = trackedModifiers[selectedItem.item_sku][item.modifier_cat_id] == parseInt(category.modifier_maximum_amount);
    }
    items = items.map((temp)=>({...temp,disabled:isMaxAllowedReached && !temp.checked}));
    shallowCopy[item.modifier_cat_id].items = items ;

    const mapper={};
    for(const [_,value] of Object.entries(shallowCopy)){
      value.items.forEach(temp=>{
        mapper[temp.modifier_id+'_'+temp.modifier_sku] = temp.checked;
      })
    }
    setSelectedItemModifiers(shallowCopy);
    setmodifierData(modifierData.map(mod=>({...mod,checked:mapper[mod.modifier_id+'_'+mod.modifier_sku]??false})));
    disableAdd(selectedItem);
  }



  const generateRandom = () => btoa(Math.random().toString()).substring(10,15);

  useEffect(() => {
    const fetchItems = async () => {
      try {
          const url = addParamsToUrl(`${process.env.REACT_APP_API_URL}menu`);
          const response = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          //make an object
           setModifierCategories(data.modifier_category.reduce((cat,obj)=>{
            cat[obj.modifier_category_id] = obj;
            return cat;
          },{}));
          setmodifierData(data.modifiers.map(mod=>({...mod,checked:false,disabled:false})));
          setItemData(data.items);
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const slice = itemData.slice(0, limit);
  const baseURL = process.env.REACT_APP_BASE_IMAGE;
  const addModifier = () => {

    const item = itemData.find(sub => sub.item_sku= selectedItemModifiers[0].modifier_sku);
    item && dispatch(ADD({...item,modifieritems : modifierData.filter(selected=>selected.checked).map(selected=>({
      modifier: selected.modifier_id,
      modifier_name:selected.modifier_name,
      modifier_price:selected.modifier_sales_price,
      qty:1
    }))}));
    setShowModal(false);
  }
  return (
    <>
      <Navbar />
      <Categories onCategoryClick={handleCategoryClick} />
      <div className="container">
        <hr className="divider" />
        <h2>
          {" "}
          {selectedCategoryName ? selectedCategoryName : "All Category Items"}
        </h2>
        <div className="row row-cols-2 row-cols-md-2 row-cols-lg-4 g-4 mt-2">
          {slice
            .filter(
              (item) =>
                !selectedCategory || selectedCategory === item.item_category_id
            )
            .map((item) => {
              const hasCustomization = modifierData.some(
                (modifier) => modifier.modifier_sku === item.item_sku
              );
            
              return (
                <div key={generateRandom()} className="col">
                  <div className="card">
                    <img
                      src={
                        item.item_has_picture
                          ? baseURL + item.item_image_address
                          : imageNotFound
                      }
                      className="card-img-top"
                      alt={item.name || "Image not available"}
                      onError={(event) => {
                        event.target.src = imageNotFound;
                      }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {getShortenedText(item.item_name.replace(/&amp;/g, "&"), 35)}
                      </h5>
                      <p className="card-text descri">
                        {getShortenedText(item.item_description, 35)}
                      </p>
                      <div className="d-flex justify-content-between rs-btn-container">
                        <p className="card-text">AED {item.item_sales_price}</p>
                        <div>
                          <button className="ms-3" onClick={() => send(item)}>
                            ADD
                          </button>
                          {hasCustomization && (
                            <p id="customization" className="mt-6">
                              Customization
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <button
            className={`checkout-btn w-50 ${
              limit >= itemData.length ? "d-none" : ""
            }`}
            onClick={() => loadMore()}
          >
            Load More
          </button>
        </div>


        {selectedItemModifiers && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{display: showModal ? "block" : "none"}}
          >
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedItemModifiers.modifier_name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <img
                    src={baseURL + modifierImage}
                    className="option-header-img"
                    alt={modifierImage}
                    onError={(event) => {
                      event.target.src = imageNotFound;
                    }}
                  />

                  <table className="table mt-2">
                    <thead className="table-light">
                      <tr>
                        <th colSpan="3">Select your choice</th>
                        <th scope="col">required</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Object.keys(selectedItemModifiers).map(catKey=>(
                      <>
                      <tr key={catKey}>
                          <td colSpan='4' style={{textAlign:'center',fontWeight:400}}>{selectedItemModifiers[catKey].name} <code>min ({modifierCategories[catKey].modifier_minimum_amount}) max ({modifierCategories[catKey].modifier_maximum_amount})</code></td>
                      </tr>
                    
                          {selectedItemModifiers[catKey].items.map((item) => (
                            <tr key={generateRandom()}>
                              <th scope="row">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={item.checked}
                                  disabled={item.disabled}
                                  onChange={()=>setItemChecked(item)}
                                />
                              </th>

                              <td></td>
                              <td>{item.modifier_name}</td>
                              <td></td>
                            </tr>
                          ))}
                      </>
                    ))}
                     
                    </tbody>
                    
                  </table>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    disabled={disableAddModifier}
                    onClick={addModifier}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MenuPage;
