import React from "react";
import { Row, Col } from "react-bootstrap";

import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const UpdateCategoriesModal = (props) => {
	const {
		show,
		handleClose,
		onSubmit,
		modalTitle,
		size,
		checkedArray,
		expandedArray,
		handleCategoryInput,
		categoriesList,
	} = props;

	return (
		<Modal
			show={show}
			handleClose={handleClose}
			onSubmit={onSubmit}
			modalTitle={modalTitle}
			size={size}
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
								className="form-control-sm"
								onChange={(e) =>
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
								className="form-control form-control-sm"
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
								{categoriesList.map((item) => (
									<option key={item.value} value={item.value}>
										{item.name}
									</option>
								))}
							</select>
						</Col>
						<Col>
							<select
								className="form-control form-control-sm"
								value={item.type}
								onChange={(e) =>
									handleCategoryInput(
										"type",
										e.target.value,
										index,
										"expanded"
									)
								}
							>
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
								className="form-control-sm"
								onChange={(e) =>
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
								className="form-control form-control-sm"
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
								{categoriesList.map((item) => (
									<option key={item.value} value={item.value}>
										{item.name}
									</option>
								))}
							</select>
						</Col>
						<Col>
							<select
								className="form-control form-control-sm"
								value={item.type}
								onChange={(e) =>
									handleCategoryInput(
										"type",
										e.target.value,
										index,
										"checked"
									)
								}
							>
								<option value="">Select Type</option>
								<option value="store">Store</option>
								<option value="product">Product</option>
								<option value="page">Page</option>
							</select>
						</Col>
					</Row>
				))}
			{/* 
            <input
                type="file"
                name="categoryImage"
                onChange={(e) => setCategoryImage(e.target.files[0])}
                style={{ margin: "20px 0 10px" }}
            /> */}
		</Modal>
	);
};

export default UpdateCategoriesModal;
