import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import Header from "../Header"
import "./style.css"

function Layout ({ children, sidebar='' }) {
    return (
        <>
          <Header />  
          {
            sidebar ?
            <Container fluid>
                <Row>
                    <Col md={2} className="sidebar">
                        <ul>
                            <li> <NavLink exact to={'/'}>Home</NavLink> </li>
                            <li> <NavLink to={'/categories'}>Categories</NavLink> </li>
                            <li> <NavLink to={'/products'}>Products</NavLink> </li>
                            <li> <NavLink to={'/orders'}>Orders</NavLink> </li>
                            <li> <NavLink to={'/page'}>Promotion Pages</NavLink> </li>
                        </ul>    
                    </Col>           
                    <Col md={10} style={{ marginLeft : 'auto', paddingTop : '70px', paddingRight : '30px' }}>{ children }</Col>           
                </Row>
            </Container> 
            : 
            <div style={{ paddingTop : '70px'}}>
                { children }
            </div>                       
          }
        </>
    )
}

export default Layout
