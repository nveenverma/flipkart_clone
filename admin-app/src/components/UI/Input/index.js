import React from 'react'
import { Form } from 'react-bootstrap'

function Input({ label, type, placeholder, errorMessage="", value, handleChange, ...restProps}) {

    return (
        <Form.Group>
            <Form.Label>{ label }</Form.Label>
            <Form.Control 
                type={type} 
                placeholder={placeholder} 
                value={value}
                onChange={handleChange}
            />
            <Form.Text className="text-muted">
                {errorMessage}
            </Form.Text>
        </Form.Group>        
    )
}

export default Input
