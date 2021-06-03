import React from 'react'
import { Modal, Button} from "react-bootstrap"

// import {}

function CustomModal(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose} size={props.size}>
            <Modal.Header closeButton>
                <Modal.Title>{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>   
                {props.children}                 
            </Modal.Body>
            {
                props.footer ?
                <Modal.Footer>
                    <Button variant="primary" onClick={props.onSubmit}>
                        {props.footer}
                    </Button>
                </Modal.Footer> : null
            }
        </Modal> 
    )
}

export default CustomModal
