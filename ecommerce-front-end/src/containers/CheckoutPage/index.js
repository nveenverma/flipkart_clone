import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addOrder, getAddress, getCartItems, getOrders } from "../../actions";
import Layout from "../../components/Layout";
import {
	Anchor,
	MaterialButton,
	// MaterialInput,
} from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
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
	
	const user = useSelector((state) => state.user);
	const auth = useSelector((state) => state.auth);
    const cart = useSelector(state => state.cart);
	const [address, setAddress] = useState([]);
	const [showNewAddressForm, setShowNewAddressForm] = useState(false);
	const [confirmAddress, setConfirmAddress] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [orderSummary, setOrderSummary] = useState(false);
	const [orderConfirmation, setOrderConfirmation] = useState(false);
	const [paymentOption, setPaymentOption] = useState(false);
	const [confirmOrder, setConfirmOrder] = useState(false);
	const dispatch = useDispatch();
	
	useEffect(() => {
		if (auth.token) {
			auth.authenticate && dispatch(getAddress());
			auth.authenticate && dispatch(getCartItems());
		}
		!auth.authenticate && setAddress([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
	
	const userOrderConfirmation = () => {
		setOrderSummary(false);
		setOrderConfirmation(true);
		setPaymentOption(true);
	}

	const onConfirmOrder = () => {
		setPaymentOption(false);
		
		const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
			const {price, qty} = cart.cartItems[key];                        
			return totalPrice + (price*qty);
		}, 0)

		const items = Object.keys(cart.cartItems).map(key => ({
			productId : key,
			payablePrice : cart.cartItems[key].price,
			purchasedQty : cart.cartItems[key].qty
		}))

		const payload = {
			addressId : selectedAddress._id,
			totalAmount,
			items,
			paymentStatus : "pending",
			paymentType: "cod"
		}
		
		console.log(payload);
		dispatch(addOrder(payload))
		setConfirmOrder(true);
	}

	if (confirmOrder) {
		dispatch(getOrders());
		props.history.push('/account/orders');
	}

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
								<div className="stepCompleted">
									<span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
									<span style={{ margin: "0 5px" }}>{auth.user.email}</span>
								</div>
							) : (
								<div style={{
									padding: '20px'
								}}>
									{/* <MaterialInput label="Email" /> */}
									Kindly login to proceed
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
									<div className="stepCompleted">{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
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
						body={ 
							orderSummary ? 
							<CartPage onlyCartItems={true} /> : 
							orderConfirmation ? (
								<div className='stepCompleted'>
									{Object.keys(cart.cartItems).length} items
								</div>
							) :
							null
						}
					/>

					{ 
						orderSummary && 
						<Card style={{ margin: "10px 0" }}>
							<div 
								className="flexRow sb" 
								style={{
									padding: '10px 10px 10px 25px',
									alignItems: 'center',
								}}
							>
								<p>Order confirmation email will be sent to <strong>{auth.user.email}</strong></p>
								<MaterialButton
									title="Continue"
									style={{ width: "200px" }}	
									onClick={userOrderConfirmation}						
								/>
							</div>
						</Card>
					}

					<CheckoutStep
						stepNumber={4}
						title={"PAYMENT OPTIONS"}
						active={paymentOption}
						body={
							paymentOption && 
							<div 
								className="flexRow sb"
								style={{
									alignItems : "center",
									padding: '20px'
								}}
							>
								<div className="flexRow" style={{
									alignItems : "center",									
								}}>
									<input 
									style={{
										marginBottom: '3px',
										marginRight: '10px'
									}} 
									type='radio' name='paymentOption' value='cod' />
									<div>Cash on Delivery</div>
								</div>
								<MaterialButton
									title="CONFIRM ORDER"
									style={{ width: "200px" }}	
									onClick={onConfirmOrder}
								/>
							</div>
						}
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
