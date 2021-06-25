import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAddress } from "../../actions";
import Layout from "../../components/Layout";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI"
import AddressForm from "./AddressForm";
import "./style.css"

const CheckoutStep = (props) => {
	return (
		<div className="checkoutStep">
			<div onClick={props.onClick} className={`checkoutHeader ${props.active && "active"}`}>
				<div>
					<span className="stepNumber">{props.stepNumber}</span>
					<span className="stepTitle">{props.title}</span>
				</div>
			</div>
            {props.body && props.body}
		</div>
	);
};

const CheckoutPage = (props) => {
	const user = useSelector((state) => state.user);
	const auth = useSelector((state) => state.auth);
    const [addressArray, setAddressArray] = useState([])
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [addressConfirmed, setAddressConfirmed] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState(null)
	const dispatch = useDispatch();

    
	useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        !auth.authenticate && setAddressArray([]);
	}, [auth.authenticate]);
    
    useEffect(() => {
        const addresses = user.address.map(adr => ({ ...adr, selected : false, edit : false}))        
        setAddressArray(addresses)
    }, [user.address])
    
    const onAddressSubmit = () => {};
    
    const chooseAddress = (addr) => {
        const updatedAddress = addressArray.map(adr => 
            addr._id === adr._id ? { ...adr, selected : true } : { ...adr, selected : false }
        )
        setAddressArray(updatedAddress);   
        console.log(addr)
    };

    const confirmDeliveryAddress = (addr) => {
        setAddressConfirmed(true)
        setSelectedAddress(addr)
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

                            auth.authenticate ?
							<div className="loggedInId">
								<span style={{ fontWeight: 500 }}>
									{auth.user.fullName}
								</span>
								<span style={{ margin: "0 5px" }}>
									{auth.user.email}
								</span>
							</div> : 
                            <div>
                                <MaterialInput
                                    label="Email"
                                />
                            </div>
						}
					/>
					<CheckoutStep
						stepNumber={"2"}
						title={"DELIVERY ADDRESS"}
						active={ !addressConfirmed }
						body={
							<>
								{
                                    addressConfirmed ? JSON.stringify(selectedAddress) : 
                                    (addressArray || []).map((adr, index) => (
                                        <div className="flexRow addressContainer">
                                            <div>
                                                <input
                                                    name="address"
                                                    type="radio"
                                                    onClick={() => chooseAddress(adr)}
                                                />
                                            </div>
                                            <div className="flexRow sb addressinfo">
                                                <div>
                                                    <div>
                                                        <span>{adr.name}</span>
                                                        <span>{adr.addressType}</span>
                                                        <span>{adr.mobileNumber}</span>
                                                    </div>
                                                    <div>{adr.address}</div>
                                                    {
                                                        adr.selected &&
                                                        <MaterialButton
                                                            title='DELIVER HERE'
                                                            style={{
                                                                width: '250px'
                                                            }}
                                                            onClick={() => confirmDeliveryAddress(adr)}
                                                        />
                                                    }                                                
                                                </div>
                                                {
                                                    adr.selected && <div>Edit</div>
                                                }
                                            </div>
                                        </div>
                                    ))}
							</>
						}
					/>

                    {
                        addressConfirmed ? null :
                        showNewAddressForm ? 
                        <AddressForm
                            onSubmit={onAddressSubmit}
                            onCancel={() => {}}
                        /> : 
                        <CheckoutStep
                            stepNumber={'+'}
                            title={'ADD NEW ADDRESS'}
                            active={false}
                            onClick={() => setShowNewAddressForm(true)}
                        />
                    }

					<CheckoutStep
                        stepNumber={'3'}
                        title={'ORDER SUMMARY'}
                        active={false}
                        body={<></>}
                    />
                    <CheckoutStep
                        stepNumber={4}
                        title={'PAYMENT OPTIONS'}
                        active={false}
                        body={<></>}
                    />
				</div>
			</div>
		</Layout>
	);
};

export default CheckoutPage;
