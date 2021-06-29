import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom"

import Layout from '../../components/Layout'
import Input from '../../components/UI/Input'
import { signup } from "../../actions"
 
function Signup() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth)
    const user = useSelector(state => state.user)
    const userReducer = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.loading) {
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
        }        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.loading])

    // This will run on submitting the Signup Form
    const userSignup = e => {
        e.preventDefault();

        const user = { firstName, lastName, email, password };
        dispatch(signup(user));
    }

    // Once the user authenticates themselves, redirect them to Home Page
    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    
    if (userReducer.loading) {
        return <p>Loading ....!</p>
    }

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop : '50px' }}>
                    <Col md={{ span : 6, offset : 3 }}>

                        { userReducer.message }
                        
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col md={{ span : 6 }}>
                                    <Input 
                                        label="First Name"
                                        type="text" 
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={e=>setFirstName(e.target.value)}
                                    />    
                                </Col>
                                <Col md={{ span : 6 }}>
                                    <Input 
                                        label="Last Name"
                                        type="text" 
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={e=>setLastName(e.target.value)}
                                    />    
                                </Col>
                            </Row>

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

export default Signup
