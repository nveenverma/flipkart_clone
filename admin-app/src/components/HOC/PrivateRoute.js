import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ ...restProps }) => {

    const token = window.localStorage.getItem('token');

    return (
        <>
            {
                token ? 
                <Route {...restProps} /> :
                <Redirect to={"/signin"} />
            }
        </>
    )
}

export default PrivateRoute