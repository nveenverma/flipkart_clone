import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

function Input({ label, type, placeholder, errorMessage="", ...restProps}) {

    const [value, setValue] = useState("");
    const handleChange = e => {
        setValue(e.target.value);
    }
    return (
        <Form.Group controlId="formBasicEmail">
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
