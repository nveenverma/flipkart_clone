import React from 'react'

import Layout from '../../components/Layout'
import ProductStore from './ProductStore'
import ProductPage from './ProductPage'
import getParams from "../../utils/getParams"
import "./style.css"

function ProductListPage (props) {

    const renderProducts = () => {
        
        const params = getParams(props.location.search);
        let content = null;

        switch (params.type) {
            case 'store' :
                 content  = <ProductStore {...props} />
                break;
            case 'page' :
                 content  = <ProductPage {...props} />
                break;
            default :
                break;
        }

        return content
    }

    return (
        <Layout>
            { renderProducts() }
        </Layout>
    )
}

export default ProductListPage
