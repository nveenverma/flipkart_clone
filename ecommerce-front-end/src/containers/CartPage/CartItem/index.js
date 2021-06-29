import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { generatePublicUrl } from "../../../urlConfig";
import { addToCart } from "../../../actions"

import "./style.css";

const CartItem = (props) => {

    const dispatch = useDispatch();
	const { _id, name, price, img } = props.cartItem;
	const [qty, setQty] = useState(props.cartItem.qty);

	const localIncrementFunction = () => {
		setQty(qty + 1);        
		props.onQuantityInc(_id, qty);
	};
    
	const localDecrementFunction = () => {
		if (qty <= 1) return;
		setQty(qty - 1);
		props.onQuantityDec(_id, qty);
	};

	return (
		<div className="cartItemContainer">
			<div className="flexRow">
				<div className="cartProImgContainer">
					<img src={generatePublicUrl(img)} alt={""} />
				</div>
				<div className="cartItemDetails">
					<div>
						<p>{name}</p>
						<p>Rs. {price}</p>
					</div>
					<div>Delivery in 3-5 days</div>
				</div>
			</div>
			<div
				style={{
					display: "flex",
					margin: "5px 0",
				}}
			>
				<div className="quantityControl">
					<button onClick={localDecrementFunction}>-</button>
					<input value={qty} readOnly />
					<button onClick={localIncrementFunction}>+</button>
				</div>
				<button className="cartActionBtn">save for later</button>
				<button 
					className="cartActionBtn"
					onClick={() => props.onRemoveCartItem(_id)}
				>
					Remove
				</button>
			</div>
		</div>
	);
};

export default CartItem;
