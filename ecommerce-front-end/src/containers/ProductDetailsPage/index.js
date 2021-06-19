import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailsById } from '../../actions';
import Layout from "../../components/Layout"

const ProductDetailsPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product)

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params : { productId }
        }
        dispatch(getProductDetailsById(payload))
        console.log("ProductId when loading product details Page : ", productId);
        
    }, [])
    
    return (
        <Layout>
            <div>Single Product Page</div>
            <p>{JSON.stringify(product.productDetails.name)}</p>

        </Layout>
    )
}

export default ProductDetailsPage
