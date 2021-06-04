import React, { useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addProduct } from "../../actions";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

function Products() {
	const [show, setShow] = useState(false);
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);

	const [showProductDetailModal, setShowProductDetailModal] = useState(false);
	const [productDetails, setProductDetails] = useState(null);

	const category = useSelector((state) => state.category);
	const product = useSelector((state) => state.product);
	const dispatch = useDispatch();

	// Common Functions //
	// Function to add all of the categories into an array in a linear format
	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({ value: category._id, name: category.name });
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	// Add Product Modal and helper Functions //
	// Runs when submitting Add Product Form
	const addProductForm = () => {
		const form = new FormData();

		form.append("name", productName);
		form.append("quantity", quantity);
		form.append("price", price);
		form.append("description", description);
		form.append("category", categoryId);

		for (let pic of productPictures) {
			form.append("productPicture", pic);
		}

		dispatch(addProduct(form));

		setShow(false);
	};

	// Displays modal for adding products
	const renderAddProductModal = () => {
		return (
			<Modal
				show={show}
				handleClose={() => setShow(false)}
				onSubmit={addProductForm}
				modalTitle={"Add New Product"}
			>
				<Input
					label="Product Name"
					value={productName}
					handleChange={(e) => setProductName(e.target.value)}
					placeholder={"Enter Product Name"}
				/>

				<Input
					label="Quantity"
					value={quantity}
					handleChange={(e) => setQuantity(e.target.value)}
					placeholder={"Enter Quantity"}
				/>

				<Input
					label="Price"
					value={price}
					handleChange={(e) => setPrice(e.target.value)}
					placeholder={"Enter Price"}
				/>

				<Input
					label="Description"
					value={description}
					handleChange={(e) => setDescription(e.target.value)}
					placeholder={"Enter Description"}
				/>

				<select
					className="form-control"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					<option>Select Category</option>
					{createCategoryList(category.categories).map((item) => (
						<option key={item.value} value={item.value}>
							{item.name}
						</option>
					))}
				</select>

				<input
					type="file"
					name="productPictures"
					onChange={(e) =>
						setProductPictures([
							...productPictures,
							e.target.files[0],
						])
					}
					style={{ margin: "20px 0 10px" }}
				/>

				{productPictures.length > 0
					? productPictures.map((pic, index) => (
							<div key={index}>{pic.name}</div>
					  ))
					: null}
			</Modal>
		);
	};

	// Display Product Modal and helper Functions //
	// Runs when clicking on any product
	const showProductDetailsModal = (product) => {
		setProductDetails(product);
		setShowProductDetailModal(true);
		console.log(product);
	};

	// Rendering Product Details Modal
	const renderProductDetailsModal = () => {
		return (
			<Modal
				show={showProductDetailModal}
				handleClose={() => setShowProductDetailModal(false)}
				modalTitle={"Product Details"}
				size="lg"
			>
				{productDetails ? (
					<>
						<Row>
							<Col md="6">
								<label className="key">Name</label>
								<p className="value">{productDetails.name}</p>
							</Col>
							<Col md="6">
								<label className="key">Price</label>
								<p className="value">{productDetails.price}</p>
							</Col>
						</Row>
						<Row>
							<Col md="6">
								<label className="key">Quantity</label>
								<p className="value">
									{productDetails.quantity}
								</p>
							</Col>
							<Col md="6">
								<label className="key">Category</label>
								<p className="value">
									{productDetails.category.name}
								</p>
							</Col>
						</Row>
						<Row>
							<Col>
								<label className="key">Product Pictures</label>
								<div style={{ display: "flex" }}>
									{productDetails.productPictures.map(
										(picture) => (
											<div className="productImgContainer">
												<img
													src={generatePublicUrl(
														picture.img
													)}
													alt={productDetails.name}
												/>
											</div>
										)
									)}
								</div>
							</Col>
						</Row>
					</>
				) : null}
			</Modal>
		);
	};

	// Display all the Products //
	const renderProducts = () => {
		return (
			<Table
				striped
				bordered
				responsive="sm"
				style={{ marginTop: "50px", fontSize: "12px" }}
			>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{product.products.length > 0
						? product.products.map((item) => (
								<tr
									onClick={() =>
										showProductDetailsModal(item)
									}
									key={item._id}
								>
									<td>{item.name}</td>
									<td>{item.price}</td>
									<td>{item.quantity}</td>
									<td>{item.category.name}</td>
								</tr>
						  ))
						: null}
				</tbody>
			</Table>
		);
	};

	// Main JSX //
	return (
		<Layout sidebar>
			<Row>
				<Col md={12}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<h3>Product</h3>
						<Button variant="primary" onClick={() => setShow(true)}>
							Add
						</Button>
					</div>
				</Col>
			</Row>
			<Row>
				<Col>{renderProducts()}</Col>
			</Row>
			{renderAddProductModal()}
			{renderProductDetailsModal()}
		</Layout>
	);
}

export default Products;
