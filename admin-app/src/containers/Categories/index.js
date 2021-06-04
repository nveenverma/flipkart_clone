import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";

import { 
	addCategory, 
	getAllCategory, 
	updateCategories, 
	deleteCategoriesAction 
} from "../../actions";
import Layout from "../../components/Layout";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

import "./style.css";
import {
	MdCheckBoxOutlineBlank,
	MdIndeterminateCheckBox,
	MdCheckBox,
	MdKeyboardArrowRight,
	MdKeyboardArrowDown,
} from "react-icons/md";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

function Categories() {
	const [show, setShow] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [parentCategoryId, setParentCategoryId] = useState("");
	const [categoryImage, setCategoryImage] = useState("");

	const [showUpdateCategoryModal, setShowUpdateCategoryModal] = useState(false);
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);

	const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	// Common Functions //
	// Function to add all of the categories into an array in a nested format based on their parent category
	const renderCategories = (categories) => {
		let categoriesArray = [];

		for (let category of categories) {
			categoriesArray.push({
				label: category.name,
				value: category._id,
				children:
					category.children.length > 0 &&
					renderCategories(category.children),
			});
		}

		return categoriesArray;
	};

	// Function to add all of the categories into an array in a linear format
	const createCategoryList = (categories, options = []) => {
		for (let category of categories) {
			options.push({
				value: category._id,
				name: category.name,
				parentId: category.parentId,
			});
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	// Function to add categories into checked or expanded arrays
	const addToCheckedOrExpanded = () => {
		
		const categories = createCategoryList(category.categories);
		const checkedArray = [];
		const expandedArray = [];

		checked.length > 0 &&
			checked.forEach((categoryId, index) => {
				const catObject = categories.find(
					(cat) => categoryId === cat.value
				);
				catObject && checkedArray.push(catObject);
			});
		setCheckedArray(checkedArray);

		expanded.length > 0 &&
			expanded.forEach((categoryId, index) => {
				const catObject = categories.find(
					(cat) => categoryId === cat.value
				);
				catObject && expandedArray.push(catObject);
			});
		setExpandedArray(expandedArray);
	};


	// Add Category Modal and helper Functions //
	// Runs when submitting Add Category Form
	const addCategoriesForm = () => {
		const form = new FormData();
		const cat = {
			categoryName,
			parentCategoryId,
			categoryImage,
		};

		form.append("name", categoryName);
		form.append("parentId", parentCategoryId);
		form.append("categoryImage", categoryImage);
		dispatch(addCategory(form));

		console.log(cat);
		setShow(false);
	};

	// Displays modal for adding categories
	const renderAddCategoryModal = () => {
		return (
			<Modal
				show={show}
				handleClose={() => setShow(false)}
				onSubmit={addCategoriesForm}
				modalTitle={"Add New Category"}
				footer={"Save Changes"}
			>
				<Input
					value={categoryName}
					handleChange={(e) => setCategoryName(e.target.value)}
					placeholder={"Enter Category Name"}
				/>

				<select
					className="form-control"
					value={parentCategoryId}
					onChange={(e) => setParentCategoryId(e.target.value)}
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
					name="categoryImage"
					onChange={(e) => setCategoryImage(e.target.files[0])}
					style={{ margin: "20px 0 10px" }}
				/>
			</Modal>
		);
	};

	// Update Category Modal and helper Functions //
	// Runs on clicking the Edit Button
	const updateCategory = () => {
		setShowUpdateCategoryModal(true);
		addToCheckedOrExpanded();
	}

	// Function to change the state based on changes done in the update Category Form
	const handleCategoryInput = (key, value, index, type) => {
		if (type === "checked") {
			const updatedCheckedArray = checkedArray.map((item, _index) =>
				_index === index ? { ...item, [key]: value } : item
			);
			setCheckedArray(updatedCheckedArray);
		} else if (type === "expanded") {
			const updatedExpandedArray = expandedArray.map((item, _index) =>
				_index === index ? { ...item, [key]: value } : item
			);
			setExpandedArray(updatedExpandedArray);
		}
	};

	// Runs when submitting Update Categories Form
	const updateCategoriesForm = () => {
		const form = new FormData();
		expandedArray.forEach((item) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("type", item.type);
			form.append("parentId", item.parentId ? item.parentId : "");
		});

		checkedArray.forEach((item) => {
			form.append("_id", item.value);
			form.append("name", item.name);
			form.append("type", item.type);
			form.append("parentId", item.parentId ? item.parentId : "");
		});

		dispatch(updateCategories(form)).then((result) => {
			if (result) {
				dispatch(getAllCategory());
			}
		});
		setShowUpdateCategoryModal(false);
	};

	// Displays modal for updating the categories
	const renderUpdateCategoriesModal = () => {
		return (
			<Modal
				show={showUpdateCategoryModal}
				handleClose={() => setShowUpdateCategoryModal(false)}
				onSubmit={updateCategoriesForm}
				modalTitle={"Update Categories"}
				size="lg"
				footer={"Save Changes"}
			>
				<Row>
					<Col>
						<h6>Expanded Categories</h6>
					</Col>
				</Row>
				{expandedArray.length > 0 &&
					expandedArray.map((item, index) => (
						<Row key={index}>
							<Col>
								<Input
									value={item.name}
									handleChange={(e) =>
										handleCategoryInput(
											"name",
											e.target.value,
											index,
											"expanded"
										)
									}
									placeholder={"Category Name"}
								/>
							</Col>
							<Col>
								<select
									className="form-control"
									value={item.parentId}
									onChange={(e) =>
										handleCategoryInput(
											"parentId",
											e.target.value,
											index,
											"expanded"
										)
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
								<select className="form-control">
									<option value="">Select Type</option>
									<option value="store">Store</option>
									<option value="product">Product</option>
									<option value="page">Page</option>
								</select>
							</Col>
						</Row>
					))}

				<Row>
					<Col>
						<h6>Checked Categories</h6>
					</Col>
				</Row>
				{checkedArray.length > 0 &&
					checkedArray.map((item, index) => (
						<Row key={index}>
							<Col>
								<Input
									value={item.name}
									handleChange={(e) =>
										handleCategoryInput(
											"name",
											e.target.value,
											index,
											"checked"
										)
									}
									placeholder={"Category Name"}
								/>
							</Col>
							<Col>
								<select
									className="form-control"
									value={item.parentId}
									onChange={(e) =>
										handleCategoryInput(
											"parentId",
											e.target.value,
											index,
											"checked"
										)
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
								<select className="form-control">
									<option value="">Select Type</option>
									<option value="store">Store</option>
									<option value="product">Product</option>
									<option value="page">Page</option>
								</select>
							</Col>
						</Row>
					))}

				<input
					type="file"
					name="categoryImage"
					onChange={(e) => setCategoryImage(e.target.files[0])}
					style={{ margin: "20px 0 10px" }}
				/>
			</Modal>
		);
	};

	// Update Category Modal and helper Functions //
	// Runs on clicking the Delete Button
	const deleteCategory = () => {
		addToCheckedOrExpanded();
		setShowDeleteCategoryModal(true);
	}

	const confirmDeleteCategories = () => {
		const checkedIdsArray = checkedArray.map(item => ({_id : item.value}));
		const expandedIdsArray = expandedArray.map(item => ({_id : item.value}))		
		const idsArray = checkedIdsArray.concat(expandedIdsArray);

		dispatch(deleteCategoriesAction(idsArray)).then((result) => {
			if (result) {
				dispatch(getAllCategory());
				setShowDeleteCategoryModal(false);
			}
		});
		// console.log(idsArray);
	}

	// Displays modal for updating the categories
	const renderDeleteCategoryModal = () => {
		return (
			<Modal
				show={showDeleteCategoryModal}
				modalTitle={"Confirm"}
				handleClose={() => setShowDeleteCategoryModal(false)}	
				buttons={[
					{
						label : "No",
						color : "primary",
						onClick : () => {setShowDeleteCategoryModal(false)}
					},
					{
						label : "Yes",
						color : "danger",
						onClick : confirmDeleteCategories
					}
				]}			
			>
				<Row>
					<Col>
						<h6>Expanded Categories</h6>
					</Col>
				</Row>
				{ expandedArray.map( (item, index) => <span key={index}>{item.name}</span>)}

				<Row className='marginTop'>
					<Col>
						<h6>Checked Categories</h6>
					</Col>
				</Row>
				{ checkedArray.map( (item, index) => <span key={index}>{item.name}</span>)}

			</Modal>
		)
	}

	// Main JSX //	
	return (
		<Layout sidebar>
			<Row className="marginBottom">
				<Col md={12}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<h3>Category</h3>
						<Button
							variant="outline-primary"
							onClick={() => setShow(true)}
						>
							Add
						</Button>
					</div>
				</Col>
			</Row>

			<Row className="marginBottom">
				<Col md={12}>
					<CheckboxTree
						nodes={renderCategories(category.categories)}
						checked={checked}
						expanded={expanded}
						onCheck={(checked) => setChecked(checked)}
						onExpand={(expanded) => setExpanded(expanded)}
						icons={{
							uncheck: <MdCheckBoxOutlineBlank />,
							halfCheck: <MdIndeterminateCheckBox />,
							check: <MdCheckBox />,
							expandClose: <MdKeyboardArrowRight />,
							expandOpen: <MdKeyboardArrowDown />,
						}}
					/>
				</Col>
			</Row>

			<Row className="marginBottom">
				<Col>
					<Button
						variant="outline-secondary"
						onClick={updateCategory}
						className="marginRight"
					>
						Update
					</Button>
					<Button 
						variant="outline-danger"
						onClick={deleteCategory}
					>
						Delete
					</Button>
				</Col>
			</Row>

			{renderAddCategoryModal()}
			{renderUpdateCategoriesModal()}
			{renderDeleteCategoryModal()}
		</Layout>
	);
}

export default Categories;
