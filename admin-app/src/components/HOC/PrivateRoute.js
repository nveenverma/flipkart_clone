import React from "react"
// import { Component } from "react";
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component : Component, ...restProps }) => {
    return <Route {...restProps} component={(props) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            return <Component {...props} />
        } else {
            return <Redirect to={"/signin"} />
        }
    }}/>
}

export default PrivateRoute