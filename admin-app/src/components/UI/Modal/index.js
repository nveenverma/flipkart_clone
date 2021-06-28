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
        <Modal show={show} onHide={handleClose} size={size}>
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
                    <Button 
                        variant="dark"
                        className="btn-sm" 
                        {...rest}
                        onClick={onSubmit}
                    >
                        Save Changes
                    </Button>
                }
            </Modal.Footer>
        </Modal> 
    )
}

export default CustomModal
