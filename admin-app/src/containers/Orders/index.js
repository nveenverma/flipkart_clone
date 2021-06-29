import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions";
import { Button } from "react-bootstrap";

import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";

const Orders = (props) => {
	const order = useSelector((state) => state.order);
	const [type, setType] = useState("");
	const dispatch = useDispatch();

	const onOrderUpdate = (orderId) => {
		const payload = {
			orderId,
			type,
		};

		console.log("payload : ", payload);
		dispatch(updateOrder(payload));
	};

	const formatDate = (date) => {
		if (date) {
			const d = new Date(date);
			return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
		}
		return "";
	};

	return (
		<Layout sidebar>
			{order.orders && order.orders.map((orderItem, index) => (
				<Card
					style={{
						margin: "10px 0",
					}}
					key={index}
					headerLeft={`Order ID : ${orderItem._id}`}
					headerRight={`User : ${orderItem.user.firstName} ${orderItem.user.lastName}`}
				>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							padding: "25px",
							alignItems: "center",
						}}
					>
						<div>
							<div className="title">Items</div>
							{orderItem.items.map((item, index) => (
								<div className="value" key={index}>
									{item.productId.name}
								</div>
							))}
						</div>
						<div>
							<span className="title">Total Price</span>
							<span className="value">
								{orderItem.totalAmount}
							</span>
						</div>
						<div>
							<span className="title">Payment Type</span>
							<span className="value">
								{orderItem.paymentType}
							</span>
						</div>
						<div>
							<span className="title">Payment Status</span>
							<span className="value">
								{orderItem.paymentStatus}
							</span>
						</div>
					</div>
					<div
						style={{
							boxSizing: "border-box",
							padding: "50px",
							display: "flex",
							alignItems: "center",
							marginLeft: "20px",
						}}
					>
						<div className="orderTrack">
							{orderItem.orderStatus.map((status, index) => (
								<div
									className={`orderStatus ${
										status.isCompleted ? "active" : ""
									}`}
									key={index}
								>
									<div
										className={`point ${
											status.isCompleted ? "active" : ""
										}`}
									></div>
									<div className="orderInfo">
										<div className="status">
											{status.type}
										</div>
										<div className="date">
											{formatDate(status.date)}
										</div>
									</div>
								</div>
							))}
						</div>

						{               
                (orderItem.orderStatus[3].isCompleted) ?
                  null :
                (
                  <>
						<div
							style={{
								padding: "0 50px",
								margin: "0 20px",
								boxSizing: "border-box",
							}}
						>
							<select
								className="form-control form-control-sm"
								onChange={(e) => setType(e.target.value)}
                defaultValue={'DEFAULT'}
                // value = {type || 'DEFAULT'}
							>
								<option value={"DEFAULT"}>select status</option>
								{
                  
                  orderItem.orderStatus.filter(status => !status.isCompleted)
                  .map((status, index) => (                  
                    <option key={index} value={status.type}>
                      {status.type}
                    </option>                  
                  ))
                }
							</select>
						</div>
						<div
							style={{
								padding: "0 50px",
								boxSizing: "border-box",
							}}
						>
							<Button
								variant="outline-success"
								onClick={() => onOrderUpdate(orderItem._id)}
							>
								Confirm
							</Button>
						</div>
						</>
                )
              }
					</div>
				</Card>
			))}
		</Layout>
	);
};

export default Orders;
