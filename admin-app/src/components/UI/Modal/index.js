import React from 'react'
import { Modal, Button} from "react-bootstrap"

// import {}

function CustomModal(props) {

    const {
        show,
        handleClose,
        size,
        modalTitle,
        buttons,
        onSubmit,
        children,
        ...rest
    } = props;
    
    return (
        <Modal animation={false} show={show} onHide={handleClose} size={size}>
            <Modal.Header closeButton>
                <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>   
                {children}                 
            </Modal.Body>
            <Modal.Footer>
                {
                    buttons ? 
                    buttons.map( (btn, index) => 
                        <Button 
                            key={index}
                            variant={btn.color} 
                            onClick={btn.onClick}
                        >
                            {btn.label}
                        </Button>
                    ) : 
                    <>
                        <Button 
                            variant="primary"
                            className="btn-sm" 
                            {...rest}
                            onClick={onSubmit}
                        >
                            Save Changes
                        </Button>
                        <Button 
                            variant="secondary"
                            className="btn-sm"                         
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </>
                }
            </Modal.Footer>
        </Modal> 
    )
}

export default CustomModal
