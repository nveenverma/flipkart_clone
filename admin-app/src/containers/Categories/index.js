import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CheckboxTree from "react-checkbox-tree";
import {
	MdCheckBoxOutlineBlank,
	MdIndeterminateCheckBox,
	MdCheckBox,
	MdKeyboardArrowRight,
	MdKeyboardArrowDown,
	MdFolder,
	MdFolderOpen,
	MdAdd,
	MdEdit,
	MdDelete,
	MdInsertDriveFile,
} from "react-icons/md";

import {
	addCategory,
	updateCategories,
	deleteCategoriesAction,
} from "../../actions";
import Layout from "../../components/Layout";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModel";
import DeleteCategoryModal from "./components/DeleteCategoryModal";

import "react-checkbox-tree/lib/react-checkbox-tree.css";
import "./style.css";

function Categories() {
	const [show, setShow] = useState(false);
	const [categoryName, setCategoryName] = useState("");
	const [parentCategoryId, setParentCategoryId] = useState("");
	const [categoryImage, setCategoryImage] = useState("");

	const [showUpdateCategoryModal, setShowUpdateCategoryModal] =
		useState(false);
	const [checked, setChecked] = useState([]);
	const [expanded, setExpanded] = useState([]);
	const [checkedArray, setCheckedArray] = useState([]);
	const [expandedArray, setExpandedArray] = useState([]);

	const [showDeleteCategoryModal, setShowDeleteCategoryModal] =
		useState(false);

	const category = useSelector((state) => state.category);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!category.loading) {
			setShow(false)
		}
	}, [category.loading])

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
				type: category.type
			});
			if (category.children.length > 0) {
				createCategoryList(category.children, options);
			}
		}
		return options;
	};

	const categoriesList = createCategoryList(category.categories);
	
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

	// Add Category helper Functions //
	// Runs when hiding Add Category Modal
	const hideAddCategoryModal = () => {
		setCategoryImage("");
		setCategoryName("");
		setParentCategoryId("");
		setShow(false);
	};

	// Runs when submitting Add Category Form
	const addCategoriesForm = () => {
		const form = new FormData();

		if (categoryName === "") {
			setShow(false)
			alert("Category Name Required")
			return;
		}

		form.append("name", categoryName);
		form.append("parentId", parentCategoryId);
		form.append("categoryImage", categoryImage);
		dispatch(addCategory(form));

		setCategoryImage("");
		setCategoryName("");
		setParentCategoryId("");
		hideAddCategoryModal();
	};

	// Update Category helper Functions //
	// Runs on clicking the Edit Button
	const updateCategory = () => {
		setShowUpdateCategoryModal(true);
		addToCheckedOrExpanded();
	};

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

		dispatch(updateCategories(form));
		setShowUpdateCategoryModal(false);
	};

	// Delete Category helper Functions //
	// Runs on clicking the Delete Button
	const deleteCategory = () => {
		addToCheckedOrExpanded();
		setShowDeleteCategoryModal(true);
	};



	// Runs when user confirms that they want to delete the  selected categories
	const confirmDeleteCategories = () => {
		const checkedIdsArray = checkedArray.map((item) => ({
			_id: item.value,
		}));

		if (checkedIdsArray.length > 0) {
			dispatch(deleteCategoriesAction(checkedIdsArray));
		}
		setShowDeleteCategoryModal(false);
	};

	const categoriesHeader = () => {
		return (
			<Row className="marginBottom">
				<Col md={12}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<h3>Category</h3>
						<div className="actionBtnsDiv">
							<Button
								variant="outline-primary"
								onClick={() => setShow(true)}
							>
								<MdAdd className="marginRight" />
								Add
							</Button>
							<Button
								variant="outline-secondary"
								onClick={updateCategory}
								className="alignItems"
							>
								<MdEdit className="marginRight" />
								Edit
							</Button>
							<Button
								variant="outline-danger"
								onClick={deleteCategory}
								className="alignItems"
							>
								<MdDelete className="marginRight" />
								Delete
							</Button>
						</div>
					</div>
				</Col>
			</Row>
		);
	};

	// Main JSX //
	return (
		<Layout sidebar>
			{categoriesHeader()}
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
							parentClose: <MdFolder />,
							parentOpen: <MdFolderOpen />,
							leaf: <MdInsertDriveFile />,
						}}
					/>
				</Col>
			</Row>

			{/* Displays modal for adding categories */}
			<AddCategoryModal
				show={show}
				handleClose={hideAddCategoryModal}
				onSubmit={addCategoriesForm}
				modalTitle={"Add New Category"}
				categoryName={categoryName}
				setCategoryName={setCategoryName}
				parentCategoryId={parentCategoryId}
				setParentCategoryId={setParentCategoryId}
				setCategoryImage={setCategoryImage}
				categoriesList={categoriesList}
			/>

			{/*  Displays modal for updating the categories */}
			<UpdateCategoriesModal
				show={showUpdateCategoryModal}
				handleClose={() => setShowUpdateCategoryModal(false)}
				onSubmit={updateCategoriesForm}
				modalTitle={"Update Categories"}
				size="lg"
				checkedArray={checkedArray}
				expandedArray={expandedArray}
				handleCategoryInput={handleCategoryInput}
				categoriesList={categoriesList}
			/>

			{/*  Displays modal for deleting the categories */}
			<DeleteCategoryModal
				show={showDeleteCategoryModal}
				modalTitle={"Confirm"}
				handleClose={() => setShowDeleteCategoryModal(false)}
				buttons={[
					{
						label: "No",
						color: "primary",
						onClick: () => {
							setShowDeleteCategoryModal(false);
						},
					},
					{
						label: "Yes",
						color: "danger",
						onClick: confirmDeleteCategories,
					},
				]}
				checkedArray={checkedArray}
				expandedArray={expandedArray}
			/>
		</Layout>
	);
}

export default Categories;
