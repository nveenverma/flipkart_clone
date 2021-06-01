import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getProductsBySlug } from '../../actions';
import Layout from '../../components/Layout'
import { generatePublicUrl } from "../../urlConfig"
import "./style.css"

function ProductListPage (props) {

    const product = useSelector(state => state.product)
    const dispatch = useDispatch();

    const priceRange = {
        under5K : "under 5000",
        under10K : "under 10000",
        under15K : "under 15000",
        under20K : "under 20000",
        under30K : "under 30000",
        above30K : "above 30000",
    };

    useEffect(() => {
        dispatch(getProductsBySlug(props.match.params.slug))
    }, [])

    return (
        <div>
            <Layout>
                {
                    Object.keys(product.productsByPrice).map((key, index) => {
                        return (
                            <div className="card" key={index}>
                                <div className="cardHeader">
                                    <div>{props.match.params.slug} Mobiles {priceRange[key]}</div>
                                    <button>view all</button>
                                </div>
                                <div className="productParentContainer">
                                    {
                                        product.productsByPrice[key].map( item =>                                         
                                            <div className="productContainer" key={item._id}>
                                                <div className="productImgContainer">                                                    
                                                    <img src={generatePublicUrl(item.productPictures[0].img)} alt="iPhone 12 Pro"/>
                                                </div>
                                                <div className="productInfo" >
                                                    <div className='productTitle' >{item.name}</div>
                                                    <div>
                                                        <span>4.3</span>
                                                        <br />
                                                        <span>3353</span>
                                                    </div>
                                                    <div className='productPrice' >{item.price}</div>
                                                </div>
                                            </div>
                                        )   
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                

            </Layout>
        </div>
    )
}

export default ProductListPage
