import React from 'react'
import Card from '../UI/Card'

const PriceDetails = (props) => {
    return (
        <Card
            headerLeft={"PriceDetails"}
            style={{maxWidth : "380px"}}
        >
            <div
                style={{
                    padding: "20px",
                    boxSizing: "border-box"
                }}
            >
                <div className="flexRow sb" style={{ margin : "10px 0" }}>
                    <div>Price ({props.totalItems} Items)</div>
                    <div>{props.totalPrice}</div>
                </div>
                <div className="flexRow sb" style={{ margin : "10px 0" }}>
                    <div>Delivery Charges</div>
                    <div>FREE</div>
                </div>
                <div className="flexRow sb" style={{ margin : "10px 0" }}>
                    <div>Total Amount</div>
                    <div>{props.totalPrice}</div>
                </div>
            </div>

        </Card>
    )
}

export default PriceDetails
