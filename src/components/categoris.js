import React, { useEffect, useState } from "react";
import imageNotFound from "../images/not-image.jpg";
import { addParamsToUrl } from "../helper/addParamsToUrl";

export default function Categories({ onCategoryClick }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState(null);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [imagesCat, setImagesCat] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const url = addParamsToUrl(`${process.env.REACT_APP_API_URL}menu`);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(
        //   "Fetched Categories:",
        //   data.categories.category_image_address
        // );

        setCategories(data.categories);
        setImagesCat(data.items);
        if (data.categories.length > 0) {
          setActiveCategoryId(data.categories[0].category_id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // category image
  // const baseImageURL = "https://cakeaway.polarispos.com/";

  const baseImageURL = process.env.REACT_APP_BASE_IMAGE;

  const getCategoryImage = (itemName) => {
    const filteredImages = imagesCat.filter(
      (item) => !item.item_image_address.includes("#")
    );

    const categoryItem = filteredImages.map(
      (item) => baseImageURL + item.item_image_address
    );

    if (categoryItem.length > 0) {
      // console.log('Image URLs:', categoryItem);
      return categoryItem;
    } else {
      console.log(`No item found for itemName: ${itemName}`);
      return "";
    }
  };

  const handleCategoryClick = async (id) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch the category. Status: ${response.status}`
        );
      }

      const data = await response.json();
      const clickedCategory = data.categories.find(
        (category) => category.category_id === id
      );
      if (!clickedCategory) {
        console.error("Category Not Found");
        return;
      }

      const itemsToShow = data.categories.filter(
        (item) => item.category_parent_id === clickedCategory.category_id
      );

      setSelectedCategoryItems(itemsToShow);
      setSelectedCategoryName(clickedCategory.category_name);
      setActiveCategoryId(id);
      setIsActive(true);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const renderCategories = (category) => {
    // console.log(category.category_image_address);
    // const categoryIsActive = activeCategoryId === category.category_id;
    // const categoryImages = getCategoryImage(category.category_name);

    return (
      <div
        className="cat-box text-center mb-3"
        key={category.category_id}
        onClick={() => handleCategoryClick(category.category_id)}
      >
        <div className="d-flex flex-column align-items-center">
          <div  className="category-item-container">
          <img
            src={
              category.category_image_address !== "#"
                ? baseImageURL + category.category_image_address
                : imageNotFound
            }
            alt={category.name || "Image not available"}
            className="mb-2"
            onError={(event) => {
              event.target.src = imageNotFound;
            }}
          />
          <p className={`mb-0 ${isActive ? "active-text" : ""}`}>
            {category.category_name}
          </p>
          </div>
          
        </div>
      </div>
    );
  };

  const renderSelectedCategoryItems = () => {
    console.log('selected categor',selectedCategoryItems);
    return (
      <div className="subcategory-container d-flex">
        {selectedCategoryItems.length > 0
          ? selectedCategoryItems.map((item) => (
              <div
                key={item.category_id}
                className="cat-box text-center"
                onClick={() =>
                  handleCatItems(item.category_id, item.category_name)
                }
              >
                <img
                  src={
                    item.category_has_picture
                      ? baseImageURL + item.category_image_address
                      : imageNotFound
                  }
                  alt={item.name || "Image not available"}
                  className="mb-2"
                  onError={(event) => {
                    event.target.src = imageNotFound;
                  }}
                
                />
                <p>{item.category_name}</p>
              </div>
            ))
          : null}
      </div>
    );
  };

  const handleCatItems = (id, name) => {
    onCategoryClick({ id, name });
  };

  return (
    <div>
      <div className="container pt-3 mt-5">
        {selectedCategoryName ? (
          <>
            <div className="d-flex">
              <h4 className="mb-3 mt-3">Categories {">"}</h4>
              <h5
                className={`pt-1 mt-3  ${
                  isActive ? "active-text text-bold text-danger" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategoryName(null)}
              >
                {selectedCategoryName}
              </h5>
            </div>
            {renderSelectedCategoryItems()}
          </>
        ) : (
          <>
            <h4 className="mb-3 mt-3">Categories</h4>
            <div className="category-container">
              {categories
                .filter((category) => category.category_parent_id === "0")
                .map((category) => renderCategories(category))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
