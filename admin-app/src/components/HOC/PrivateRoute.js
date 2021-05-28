import React from "react"
import { Route, Redirect } from "react-router-dom"

const PrivateRoute = ({ component : Anycomponent, ...restProps }) => {
    return <Route 
                {...restProps} 
                component={
                    (props) => {
                        const token = window.localStorage.getItem('token');

                        if (token) {
                            return <Anycomponent {...props} />
                        } else {
                            return <Redirect to={"/signin"} />
                        }
                    }
                }
            />
}

export default PrivateRoute