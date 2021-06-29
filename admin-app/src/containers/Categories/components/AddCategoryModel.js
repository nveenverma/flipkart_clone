import React from "react";
import { Row, Col } from "react-bootstrap"

import Input from "../../../components/UI/Input";
import Modal from "../../../components/UI/Modal";

const AddCategoryModel = (props) => {
	const {
		show,
		handleClose,
		onSubmit,
		modalTitle,
		categoryName,
		setCategoryName,
		parentCategoryId,
		setParentCategoryId,
		setCategoryImage,
		categoriesList,
	} = props;

	return (
		<Modal
			show={show}
			handleClose={handleClose}
			onSubmit={onSubmit}
			modalTitle={modalTitle}
		>
			<Row>
				<Col>
					<Input
						value={categoryName}
						onChange={(e) => setCategoryName(e.target.value)}
						placeholder={"Enter Category Name"}
						className='form-control-sm'
					/>
				</Col>
				<Col>
					<select
						className="form-control form-control-sm"
						value={parentCategoryId}
						onChange={(e) => setParentCategoryId(e.target.value)}
					>
						<option>Select Category</option>
						{categoriesList.map((item) => (
							<option key={item.value} value={item.value}>
								{item.name}
							</option>
						))}
					</select>
				</Col>
			</Row>
			<Row>
				<Col>
					<input
						type="file"
						name="categoryImage"
						onChange={(e) => setCategoryImage(e.target.files[0])}
						style={{ margin: "0 -8px" }}
						className="btn-sm"
					/>
				</Col>
			</Row>

		</Modal>
	);
};

export default AddCategoryModel;
