import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { addProduct, deleteProductById, getProducts, updateProduct } from "../../actions";
import Layout from "../../components/Layout";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/Input";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

function Products() {
	
	const [show, setShow] = useState(false);
	const [productId, setProductId] = useState("");
	const [productName, setProductName] = useState("");
	const [price, setPrice] = useState("");
	const [quantity, setQuantity] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [productPictures, setProductPictures] = useState([]);
	
	const [productDetails, setProductDetails] = useState(null);
	const [showProductDetailModal, setShowProductDetailModal] = useState(false);
	
	const [showProductEditModal, setShowProductEditModal] = useState(false);
	
	const category = useSelector((state) => state.category);
	const product = useSelector((state) => state.product);
	const dispatch = useDispatch();

	const clearProductInputFields = () => {
		setProductName("");
		setPrice("");
		setQuantity("");
		setDescription("")
		setCategoryId("")
		setProductPictures([]);
	}
	
	useEffect(() => {
		if (showProductEditModal) {
			setProductId(productDetails._id);
			setProductName(productDetails.name);
			setPrice(productDetails.price);
			setQuantity(productDetails.quantity);
			setDescription(productDetails.description)
			setCategoryId(productDetails.category._id)
			setProductPictures(productDetails.productPictures);
		} else {
			clearProductInputFields();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [showProductEditModal])

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
		clearProductInputFields();
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
				size="lg"
			>
				<Row>
					<Col>
						<Input
							label="Product Name"
							value={productName}
							onChange={(e) => setProductName(e.target.value)}
							placeholder={"Enter Product Name"}
						/>
					</Col>

					<Col>
						<Input
							label="Quantity"
							value={quantity}
							onChange={(e) => setQuantity(e.target.value)}
							placeholder={"Enter Quantity"}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Input
							label="Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							placeholder={"Enter Price"}
						/>
					</Col>
					<Col>
						<Input
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder={"Enter Description"}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<label>Choose Category</label>
						<select
							className="form-control"
							value={categoryId}
							onChange={(e) => setCategoryId(e.target.value)}
						>
							<option>Select Category</option>
							{createCategoryList(category.categories).map(
								(item) => (
									<option key={item.value} value={item.value}>
										{item.name}
									</option>
								)
							)}
						</select>
					</Col>
					<Col>
						<label>Product Images</label>
						<input
							type="file"
							name="productPictures"
							onChange={(e) =>
								setProductPictures([
									...productPictures,
									e.target.files[0],
								])
							}
						/>
						{productPictures.length > 0
							? productPictures.map((pic, index) => (
									<div key={index}>{pic.name}</div>
							  ))
							: null}
					</Col>
				</Row>
			</Modal>
		);
	};

	// Display Product Modal and helper Functions //
	// Runs when clicking on any product
	const showProductDetailsModal = (product) => {
		setProductDetails(product);
		setShowProductDetailModal(true);
	};

	const deleteProduct = (id) => {
		const payload = {
			productId: id,
		};
		dispatch(deleteProductById(payload));
		setShowProductDetailModal(false);
	};

	// Rendering Product Details Modal
	const renderProductDetailsModal = () => {
		return (
			<Modal
				show={showProductDetailModal}
				handleClose={() => setShowProductDetailModal(false)}
				modalTitle={"Product Details"}
				size="lg"
				buttons={[
					{
						label: "Edit",
						color: "primary",
						onClick: () => {
							setShowProductEditModal(true);
							setShowProductDetailModal(false);
						},
					},
					{
						label: "Delete",
						color: "danger",
						onClick: () => {
							deleteProduct(productDetails._id);
						},
					},
				]}
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
										(picture, index) => (
											<div
												key={index}
												className="productImgContainer"
												style={{ marginRight: "10px" }}
											>
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

	// Display Edit Product Modal and helper Functions //
	// Runs when submitting Editing Product Form
	const editProductForm = () => {
		const form = new FormData();
		form.append("_id", productId);
		form.append("name", productName);
		form.append("quantity", quantity);
		form.append("price", price);
		form.append("description", description);
		form.append("category", categoryId);

		for (let pic of productPictures) {
			form.append("productPicture", pic);
		}

		dispatch(updateProduct(form));
		dispatch(getProducts());
		clearProductInputFields();
		setShowProductEditModal(false);
	};

	// Rendering Product Edit Modal
	const renderEditProductModal = () => {
		return (
			<Modal
				show={showProductEditModal}
				handleClose={() => setShowProductEditModal(false)}
				onSubmit={editProductForm}
				modalTitle={"Edit Product"}
				size="lg"
			>
				{productDetails ? (
					<>
						<Row>
							<Col>
								<Input
									label="Product Name"
									value={productName}
									onChange={(e) =>
										setProductName(e.target.value)
									}
									placeholder={"Enter Product Name"}
								/>
							</Col>

							<Col>
								<Input
									label="Quantity"
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
									}
									placeholder={"Enter Quantity"}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Input
									label="Price"
									value={price}
									onChange={(e) =>
										setPrice(e.target.value)
									}
									placeholder={"Enter Price"}
								/>
							</Col>
							<Col>
								<Input
									label="Description"
									value={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									placeholder={"Enter Description"}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<label>Choose Category</label>
								<select
									className="form-control"
									value={categoryId}
									onChange={(e) =>
										setCategoryId(e.target.value)
									}
								>
									<option>Select Category</option>
									{createCategoryList(
										category.categories
									).map((item) => (
										<option
											key={item.value}
											value={item.value}
										>
											{item.name}
										</option>
									))}
								</select>
							</Col>
							<Col>
								<label>Product Images</label>
								<input
									type="file"
									name="productPictures"
									onChange={(e) =>
										setProductPictures([
											...productPictures,
											e.target.files[0],
										])
									}
								/>
								{productPictures.length > 0
									? productPictures.map((pic, index) => (
											<div key={index}>{pic.name}</div>
									  ))
									: null}
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
			{renderEditProductModal()}
		</Layout>
	);
}

export default Products;
