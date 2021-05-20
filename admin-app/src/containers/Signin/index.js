import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import Input from "../../components/UI/Input"

function Signin() {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop : '50px' }}>
                    <Col md={{ span : 6, offset : 3 }}>
                        <Form>
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
