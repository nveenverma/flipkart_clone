import React from "react";

import Layout from "../../components/Layout";
import heroImg from "../../images/hero1.jpg";

import "./style.css";

function Homepage() {
	return (
		<div>
			<Layout />
			<div
				style={{
					backgroundImage: `url(${heroImg})`,
					backgroundColor: "#cccccc",
					height: "600px",
					backgroundPosition: "top",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					position: "relative",
					filter: "blur(0.8px)",
					// -webkit-filter: blur(8px);
				}}
			></div>
			<div className="overview">
                <div className="innerContainer">
                    <p className="title">
                        Project Name & Features:
                    </p>
                    <ol>
                        <li>
                            <strong>E-Commerce Store</strong> :
                            <ul>
                                <li>User Signup / Login</li>
                                <li>Adding / Deleting items from Cart</li>
                                <li>Add / Edit / Select Address for delivery</li>
                                <li>Order Placement after Checkout </li>
                                <li>Order Summary and Tracking</li>
                            </ul>
                        </li> 
                        <br />
                        <li>
                            <strong>Content Management System (CMS)</strong> :
                            <ul>
                                <li>Admin Signup / Login</li>
                                <li>Provide High Level Statistics</li>
                                <li>Adding / Updating / Deleting Products</li>
                                <li>Adding / Updating / Deleting Categories</li>
                                <li>Update Order Tracking Details</li>
                            </ul>
                        </li>
                    </ol>                
                </div>
                <div className="innerContainer">
                    <p className="title">
                        Languages and Tools Used
                    </p>
                    <ol>
                        <li>
                            <strong>For building Frontend :</strong>
                            <ul>
                                <li>HTML</li>
                                <li>CSS</li>
                                <li>JavaScript</li>
                                <li>ReactJS</li>
                                <li>Redux</li>
                            </ul>
                        </li> 
                        <br />
                        <li>
                            <strong>For building Backend :</strong>
                            <ul>
                                <li>NodeJS</li>
                                <li>ExpressJS</li>
                                <li>Mongoose + MongoDB</li>
                                <li>Postman</li>
                                <li>AWS + Heroku</li>
                            </ul>
                        </li>
                    </ol>                
                </div>
			</div>
		</div>
	);
}

export default Homepage;
