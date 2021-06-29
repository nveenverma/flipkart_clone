import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from 'react-router'

import Layout from '../../components/Layout'
import Input from "../../components/UI/Input"
import { login } from "../../actions"

function Signin() {

    // React Hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    // const [error, setError] = useState('');

    // This will run on submitting the Signin Form
    const userLogin = e => {
        e.preventDefault();
        
        const user = { email, password };
        dispatch(login(user));
    }

    // Once the user authenticates themselves, redirect them to Home Page
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }

    // Render below JSX from this component
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}                                                           
                            />

                            <Input 
                                label="Password"
                                type="password"
                                placeholder="Password"                  
                                value={password} 
                                onChange={e => setPassword(e.target.value)}              
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
