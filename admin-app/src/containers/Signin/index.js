import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch } from "react-redux"

import Layout from '../../components/Layout'
import Input from "../../components/UI/Input"
import { login } from "../../actions"

function Signin() {

    const dispatch = useDispatch();

    const userLogin = e => {

        e.preventDefault();
        
        const user = { email : 'user@gmail.com', password : '123456'};
        dispatch(login(user));
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop : '50px' }}>
                    <Col md={{ span : 6, offset : 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input 
                                label="Email address"
                                type="email" 
                                placeholder="Enter email"
                                errorMessage="We'll never share your email with anyone else."                                                                
                            />

                            <Input 
                                label="Password"
                                type="password" 
                                placeholder="Password"                                
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>            
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signin
