import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./contextreducer";
export default function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceoptions = Object.keys(options);
  let data = useCart();
  const priceRef = useRef();
  let foodItem = props.item;
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleQty = (e) => {
    setQty(parseInt(e.target.value));
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };
  let finalPrice = qty*parseInt(options[size]);
  const handleAddToCart = async () => {
    let food = [];
    for(const item of data){
      if(item.id === props.foodItem._id){
        food = item;
        break;
      }
    }
    if(food !== []){
      if(food.size ===size){
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
        return
      }
      else if(food.size !== size){
        await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
        return
      }return
    }
    await dispatch({type:"ADD",id:props.foodItem._id,name:props.foodItem.name,price:finalPrice,qty:qty,size:size})
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div
        className="card card mt-3"
        style={{ width: "18rem", maxHeight: "360px" }}
      >
        <img
          className="card-img-top"
          src={props.foodItem.img}
          style={{ height: "200px", objectFit: "fill" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={handleQty}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  bg-success rounded"
              ref={priceRef}
              onChange={handleOptions}
            >
              {priceoptions.map((i) => {
                return (
                  <option key={i} value={i}>
                    {i}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className={"btn btn-success justify-center ms-2"}
            onClick={handleAddToCart}
            onChange={handleOptions}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
