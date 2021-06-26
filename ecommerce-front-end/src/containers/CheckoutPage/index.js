import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAddress, getCartItems } from "../../actions";
import Layout from "../../components/Layout";
import {
	Anchor,
	MaterialButton,
	MaterialInput,
} from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import "./style.css";
import CartPage from "../CartPage";

const CheckoutStep = (props) => {
	return (
		<div className="checkoutStep">
			<div
				onClick={props.onClick}
				className={`checkoutHeader ${props.active && "active"}`}
			>
				<div>
					<span className="stepNumber">{props.stepNumber}</span>
					<span className="stepTitle">{props.title}</span>
				</div>
			</div>
            {props.body && props.body}
		</div>
	);
};

const Address = ({
	chooseAddress,
	enableAddressEditForm,
	confirmDeliveryAddress,
	onAddressSubmit,
	adr
}) => {
	return (
		<div className="flexRow addressContainer">
			<div>
				<input
					name="address"
					onClick={() => chooseAddress(adr)}
					type="radio"
				/>
			</div>
			<div className="flexRow sb addressinfo">
				{!adr.edit ? (
					<div style={{ width: "100%" }}>
						<div className="addressDetail">
							<div>
								<span className="addressName">{adr.name}</span>
								<span className="addressType">{ adr.addressType }</span>
								<span className="addressMobileNumber">{ adr.mobileNumber }</span>
							</div>
							{adr.selected && (
								<Anchor
									name="EDIT"
									onClick={() => enableAddressEditForm(adr)}
									style={{
										fontWeight: "500",
										color: "#2874f0",
									}}
								/>
							)}
						</div>
						<div className="fullAddress">
							{adr.address} <br />{" "}
							{`${adr.state} - ${adr.pinCode}`}
						</div>
						{adr.selected && (
							<MaterialButton
								title="DELIVER HERE"
								onClick={() => confirmDeliveryAddress(adr)}
								style={{
									width: "200px",
									margin: "10px 0",
								}}
							/>
						)}
					</div>
				) : (
					<AddressForm
						withoutLayout={true}
						onSubmitForm={onAddressSubmit}
						initialData={adr}
						onCancel={() => {}}
					/>
				)}
			</div>
		</div>
	)
}

const CheckoutPage = (props) => {

	//   const [orderConfirmation, setOrderConfirmation] = useState(false);
	//   const [paymentOption, setPaymentOption] = useState(false);
	//   const [confirmOrder, setConfirmOrder] = useState(false);

	const user = useSelector((state) => state.user);
	const auth = useSelector((state) => state.auth);
    const cart = useSelector(state => state.cart);
	const [address, setAddress] = useState([]);
	const [showNewAddressForm, setShowNewAddressForm] = useState(false);
	const [confirmAddress, setConfirmAddress] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [orderSummary, setOrderSummary] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.authenticate && dispatch(getAddress());
		auth.authenticate && dispatch(getCartItems());
		!auth.authenticate && setAddress([]);
	}, [auth.authenticate]);

	useEffect(() => {
		const addresses = user.address.map((adr) => ({
			...adr,
			selected: false,
			edit: false,
		}));
		setAddress(addresses);
	}, [user.address]);

	const onAddressSubmit = (addr) => {
        setConfirmAddress(true);
        setSelectedAddress(addr);
		setOrderSummary(true)
    };
	
	const chooseAddress = (addr) => {
		const updatedAddress = address.map((adr) =>
		addr._id === adr._id
				? { ...adr, selected: true }
				: { ...adr, selected: false }
				);
				setAddress(updatedAddress);
		console.log(addr);
	};

	const enableAddressEditForm = (addr) => {
		const updatedAddress = address.map((adr) =>
			addr._id === adr._id
				? { ...adr, edit: true }
				: { ...adr, edit: false }
		);
		setAddress(updatedAddress);
	};
		
	const confirmDeliveryAddress = (addr) => {
		setConfirmAddress(true);
		setSelectedAddress(addr);
		setOrderSummary(true);
	};

	return (
		<Layout>
			<div className="cartContainer" style={{ alignItems: "flex-start" }}>
				<div className="checkoutContainer">
					<CheckoutStep
						stepNumber={"1"}
						title={"LOGIN"}
						active={!auth.authenticate}
						body={
							auth.authenticate ? (
								<div className="loggedInId">
									<span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
									<span style={{ margin: "0 5px" }}>{auth.user.email}</span>
								</div>
							) : (
								<div>
									<MaterialInput label="Email" />
								</div>
							)
						}
					/>
					<CheckoutStep
						stepNumber={"2"}
						title={"DELIVERY ADDRESS"}
						active={!confirmAddress && auth.authenticate}
						body={
							<>
								{confirmAddress ? (
									<div className="loggedInId">{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
								) : (
									address.map((adr) => (
										<Address 
											chooseAddress={chooseAddress}
											enableAddressEditForm={enableAddressEditForm}
											confirmDeliveryAddress={confirmDeliveryAddress}
											onAddressSubmit={onAddressSubmit}
											adr={adr}
										/>
									))
								)}
							</>
						}
					/>

					{/* AddressForm */}
					{confirmAddress ? null : showNewAddressForm ? (
						<AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
					) : auth.authenticate ? (
						<CheckoutStep
						stepNumber={"+"}
						title={"ADD NEW ADDRESS"}
						active={false}
						onClick={() => setShowNewAddressForm(true)}
						/>
					) : null}

					<CheckoutStep
						stepNumber={"3"}
						title={"ORDER SUMMARY"}
						active={orderSummary}
						body={ orderSummary ? <CartPage onlyCartItems={true} /> : null}
					/>
					<CheckoutStep
						stepNumber={4}
						title={"PAYMENT OPTIONS"}
						active={false}
						body={<></>}
					/>
				</div>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce((totalQty, key) => {
                        return totalQty + cart.cartItems[key].qty
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const {price, qty} = cart.cartItems[key];                        
                        return totalPrice + (price*qty);
                    }, 0)}
                />
			</div>
		</Layout>
	);
};

export default CheckoutPage;
