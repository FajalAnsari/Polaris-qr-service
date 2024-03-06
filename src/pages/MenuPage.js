import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Categories from "../components/categoris";
import optionImg from "../images/cat (2).png";
import { ADD } from "../redux/action/action";
import { useDispatch } from "react-redux";

const MenuPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [modifierData, setmodifierData] = useState("");
  const [modifierImage, setmodifierImage] = useState("");
  const [limit, setLimit] = useState(12);
  const [itemData, setItemData] = useState([]);
  console.log("ss", selectedItem);

  const dispatch = useDispatch();

  // const handleCustomize = (item) => {
  //   setSelectedItem(item);
  //   setShowModal(true);
  // };

  const send = (e) => {
    //testing modifier
    const modifiersForItem = modifierData.filter(
      (modifier) => modifier.modifier_sku === e.item_sku
    );
    if (modifiersForItem.length > 0) {
      console.log(modifiersForItem);
      // Display modal with modifiers
      setSelectedItem(modifiersForItem);
      setmodifierImage(e.item_image_address);
      setShowModal(true);
    } else {
      dispatch(ADD(e));
      console.log("no modifier");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
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

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://apidev.polarispos.com/table_menu/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);

        // test
        const itemData = data.items;
        setmodifierData(data.modifier_category);
        // if (relevantModifier) {
        //   const relevantModifierCategory = data.modifiers.find(category => category.modifier_category_id === relevantModifier.modifier_id);

        //   if (relevantModifierCategory) {
        //     console.log("Relevant Modifier Data:", relevantModifier);
        //     console.log("Relevant Modifier Category Data:", relevantModifierCategory);
        //   } else {
        //     console.log("Modifier category not found for modifier_id:", relevantModifier.modifier_id);
        //   }
        // } else {
        //   console.log("Modifier not found for item_sku:", itemData.item_sku);
        // }
        //test
        setItemData(data.items);
      } catch (error) {
        console.log("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const slice = itemData.slice(0, limit);
  const baseURL = "https://cakeaway.polarispos.com/";

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
            .map((item, index) => (
              <div key={index} className="col">
                <div className="card">
                  <img
                    src={baseURL + item.item_image_address}
                    className="card-img-top"
                    alt={item.name}
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
                        {item.customize && item.customize > 0 && (
                          <p id="customization" className="mt-6">
                            Customization
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
        {selectedItem && (
          <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div
              className="modal-dialog modal-dialog-scrollable"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedItem.modifier_name}</h5>
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
                  />
                  <table class="table mt-2">
                    <thead className="table-light">
                      <tr>
                        <th colspan="3">Select your choice</th>
                        <th scope="col">required</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItem.map((item, index) => (
                        <tr>
                          <th scope="row">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="option1"
                              id="flexRadioDefault1"
                            />
                          </th>
                          <td></td>
                          <td>{item.modifier_name}</td>
                          <td>{item.modifier_id}</td>
                        </tr>
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
                    onClick={handleCloseModal}
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
