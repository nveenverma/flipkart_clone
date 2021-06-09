import React from 'react'
import { Form } from 'react-bootstrap'

function Input(props) {

    const {
        label,
        type,
        placeholder,
        value,
        handleChange,
        errorMessage,
        ...rest
    } = props;

    return (
        <Form.Group>
            { label && <Form.Label>{ label }</Form.Label> }
            <Form.Control 
                type={type} 
                placeholder={placeholder} 
                value={value}
                onChange={handleChange}
                {...rest}
            />
            <Form.Text className="text-muted">
                {errorMessage}
            </Form.Text>
        </Form.Group>        
    )
}

export default Input
