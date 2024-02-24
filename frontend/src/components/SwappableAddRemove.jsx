/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const SwappableAddRemove = (props) => {
  const [items, setItems] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/image");
      const data = await response.json();
      const images = data.images;

      setItems(
        images.map((i, key, list) => ({
          i: i,
          x: 0, // Center the elements
          y: images.length,
          w: 2,
          h: 1, // Set height to 1
        }))
      );
    };

    fetchData();
  }, []);

  const onRemoveItem = (i) => {
    console.log("removing", i);
  };

  const createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer",
    };
    const itemKey = el.i._id;
    const imgURL = el.i.imgURL;

    return (
      <div key={itemKey} data-grid={el}>
        {
          <span className="text">
            <img height="100%" src={"http://localhost:5000/" + imgURL} />
          </span>
        }
        <span
          className="remove"
          style={removeStyle}
          onClick={() => onRemoveItem(itemKey)}
        >
          x
        </span>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    console.log("called");
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      const addedImg = await fetch("http://localhost:5000/image", {
        method: "POST",
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
        body: formData,
      });
      const response = await fetch("http://localhost:5000/image");
      const data = await response.json();
      const images = data.images;

      setItems(
        images.map((i, key, list) => ({
          i: i,
          x: 0, // Center the elements
          y: images.length,
          w: 2,
          h: 1, // Set height to 1
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(items);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button type="submit">Add Item</button>
      </form>
      <ResponsiveReactGridLayout {...props}>
        {items?.map((el) => createElement(el))}
      </ResponsiveReactGridLayout>
    </div>
  );
};

export default SwappableAddRemove;
