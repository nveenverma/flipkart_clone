import React from 'react'
import {Nav, Navbar} from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { signout } from '../../actions';

function Header () {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const logout = () => {
      dispatch(signout())
    }

    const renderLoggedInLinks = () => {
      return (
          <Nav>
            <li className="nav-item">
              <span className="nav-link">{auth.authenticate && auth.user.firstName}</span>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={logout} style={{ cursor : "pointer", color: "white" }} >Signout</span>
            </li>
          </Nav>
      )
    };

    const renderNonLoggedInLinks = () => {
      return (
          <Nav>
            <li className="nav-item">
              <NavLink to="/signin" className="nav-link">Signin</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/signup" className="nav-link">Signup</NavLink>
            </li>
          </Nav>
      )
    };

    return (
        <Navbar collapseOnSelect fixed="top" expand="lg" className="customBgDark" variant='dark' style={{ zIndex : 1}}>
          <Link to="/" className="navbar-brand">Admin Dashboard</Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>          
              {
                auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks()
              }
          </Navbar.Collapse>
        </Navbar>
    )
}

export default Header 
