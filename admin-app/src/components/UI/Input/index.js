import React from "react";
import { Form } from "react-bootstrap";

function Input(props) {
	const {
		label,
		type,
		placeholder,
		value,
		handleChange,
		errorMessage,
        options,
		...rest
	} = props;

	let input = null;

	switch (type) {
		case "select":
			input = (
				<Form.Group>
					{label && <Form.Label>{label}</Form.Label>}
                    <select
                        className='form-control form-control-sm'
                        value={value}
                        onChange={handleChange}
                    >
                        <option value=''>{placeholder}</option>
                        {
                            options.length > 0 ?
                            options.map((option, index) => 
                            <option key={index} value={option.value}>{option.name}</option>
                            ) : 
                            <option value="">No Option</option>
                        }
                    </select>
                </Form.Group>
			);
            break;

		case "text":
		default:
			input = (
				<Form.Group>
					{label && <Form.Label>{label}</Form.Label>}
					<Form.Control
						type={type}
						placeholder={placeholder}
						value={value}
						onChange={handleChange}
						{...rest}
					/>
					<Form.Text className="text-muted">{errorMessage}</Form.Text>
				</Form.Group>
			);
	}

	return input;
}

export default Input;
