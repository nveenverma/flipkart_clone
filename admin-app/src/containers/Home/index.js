import React from 'react';
// import { Col, Container, Row } from 'react-bootstrap';
// import { NavLink } from "react-router-dom"
import StatsCard from '../../components/UI/StatsCard';

import Layout from "../../components/Layout";
// import './style.css';

function Home() {
    return (
        <Layout sidebar>
            {/* Home Page */}
            <StatsCard></StatsCard>
        </Layout>
    )
}

export default Home
