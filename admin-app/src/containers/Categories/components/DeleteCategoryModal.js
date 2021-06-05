import React from "react";
import { Row, Col } from "react-bootstrap";

import Modal from "../../../components/UI/Modal";

const DeleteCategoryModal = (props) => {
	const {
		show,
		modalTitle,
		handleClose,
		buttons,
		checkedArray,
		// expandedArray
	} = props;

	return (
		<Modal
			show={show}
			modalTitle={modalTitle}
			handleClose={handleClose}
			buttons={buttons}
		>
			{/* <Row>
				<Col>
					<h6>Expanded Categories</h6>
				</Col>
			</Row>
			{expandedArray.map((item, index) => (
				<span key={index}>{item.name}</span>
			))} */}

			{checkedArray.length > 0 ? (
				<>
					<Row className="marginTop">
						<Col>
							<h6>Following Categories will be deleted:</h6>
						</Col>
					</Row>
					<ul>
						{checkedArray.map((item, index) => (
							<li key={index}>{item.name}</li>
						))}
					</ul>
				</>
			) : (
				<h6>Add Categories to Delete</h6>
			)}
		</Modal>
	);
};

export default DeleteCategoryModal;
