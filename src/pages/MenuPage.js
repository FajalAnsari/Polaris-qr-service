import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/categoris";
import imageNotFound from "../images/not-image.jpg";
import { ADD } from "../redux/action/action";
import { useDispatch } from "react-redux";
import { addParamsToUrl } from "../helper/addParamsToUrl";

const MenuPage = () => {
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
  const [trackedModifiers,setTrackedModifiers] = useState({}); 
  const dispatch = useDispatch();

 


  const send = (e) => {
    console.log('current item',e);
    setSelectedItem(e);
    //testing modifier
    const modifiersForItem = modifierData.filter(
      (modifier) => modifier.modifier_sku === e.item_sku
    ).reduce((acc,obj)=>{
      const key=obj.modifier_cat_id;
      if(!acc[key]){
        acc[key]={
          name:'',
          items:[],
          id:key
        };
      }
      acc[key]['id']=obj.modifier_cat_id;
      acc[key]['name']=obj.modifier_cat_name;
      acc[key]['items'].push(obj);
      return acc;
    },{});

    if (Object.keys(modifiersForItem).length > 0) {
 
      setSelectedItemModifiers(modifiersForItem);
      setmodifierImage(e.item_image_address);
      setShowModal(true);
    } else {
      dispatch(ADD(e));
    }
  };

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

  const setItemChecked = (item) =>{
    // console.log(item);
    // //disable or disable the rest of the options based on the number of allowed extras on each item
    // if(!category) return;
    // //see how much the allowed limit is
    // 
    // let disableAll=false;
    
    // if(!noCheckLimits){
    //     if(trackedModifiers[selectedItem.item_sku]){
    //       //it is allowed to add more modifiers
    //       if(trackedModifiers[selectedItem.item_sku][category.modifier_category_id] < parseInt(category.modifier_maximum_amount)) {
    //         trackedModifiers[selectedItem.item_sku][category.modifier_category_id]++;
    //       } else {
    //         disableAll=true;
    //       }
    //     // a new record
    //     }  else {
    //       trackedModifiers[selectedItem.item_sku]={};
    //       trackedModifiers[selectedItem.item_sku][category.modifier_category_id]=1;
    //     }
    // }
  
    // //if it is already disabled
    // //do not do any thing
    // if(trackedModifiers[selectedItem.item_sku]==category.modifier_maximum_amount){
    //   disableAll=true;
    // }
    const category=modifierCategories.find(cat=>cat.modifier_category_id == item.modifier_cat_id);
    if(!category) return;
    //do not check tack in this case
    const checkTrack = !(category.modifier_maximum_amount =="0" && category.modifier_minimum_amount == "0");

    const toggleCheckedAndDisabled = (mod,isMaxAllowedReached)=>({...mod,checked:!mod.checked,disabled: isMaxAllowedReached && mod.modifier_cat_id == category.modifier_category_id && !mod.checked});
    //check if there is a need to check tracker 
    if(checkTrack)  {
      //check keys in the objects
        if(selectedItem.item_sku in trackedModifiers) {
          if(item.modifier_cat_id in trackedModifiers[selectedItem.item_sku]){
            trackedModifiers[selectedItem.item_sku][item.modifier_cat_id]++;
          } else {
            trackedModifiers[selectedItem.item_sku][item.modifier_cat_id]=1;
          }
        } else {
          trackedModifiers[selectedItem.item_sku]={};
          trackedModifiers[selectedItem.item_sku][item.modifier_cat_id]=1;
      }
      const isMaxAllowedReached= trackedModifiers[selectedItem.item_sku][item.modifier_cat_id]==parseInt(category.modifier_maximum_amount);
        setmodifierData(modifierData.map(mod=>toggleCheckedAndDisabled(mod,isMaxAllowedReached))); 
        selectedItemModifiers[item.modifier_cat_id].items = selectedItemModifiers[item.modifier_cat_id].items.map(sub=>toggleCheckedAndDisabled(sub,isMaxAllowedReached));
    }
  }


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
        setModifierCategories(data.modifier_category);
        setmodifierData(data.modifiers.map(mod=>({...mod,checked:false})));
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
            .map((item, index) => {
              const hasCustomization = modifierData.some(
                (modifier) => modifier.modifier_sku === item.item_sku
              );
            
              return (
                <div key={index} className="col">
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
                        {getShortenedText(item.item_name, 35)}
                        {item.item_category_id}
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
            className={`checkout-btn w-25 ${
              limit >= itemData.length ? "d-none" : ""
            }`}
            onClick={() => loadMore()}
          >
            Load More
          </button>
        </div>

        {/* Modifiers  */}
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
                      <tr key={selectedItemModifiers[catKey].id}>
                          <td colSpan='4' style={{textAlign:'center',fontWeight:400}}>{selectedItemModifiers[catKey].name}</td>
                      </tr>
                    
                          {selectedItemModifiers[catKey].items.map((item) => (
                            <tr key={item.modifier_id+'_'+item.modifier_sku}>
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
