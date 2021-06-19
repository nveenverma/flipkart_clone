import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Carousel } from 'react-responsive-carousel'

import { getProductPage } from "../../../actions"
import getParams from '../../../utils/getParams'
import Card from "../../../components/UI/Card"
import "./style.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product)
    const { page } = product;
    
    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = {
            params
        }
        dispatch(getProductPage(payload))
        
    }, [])

    return (
        <div style={{margin: '0 10px'}}>
            <h3>{page.title}</h3>
            <Carousel
                renderThumbs={() => {}}
            >
                {
                    page.banners && page.banners.map((banner, idx) => 
                        <a
                            style={{
                                display: 'block',
                                maxWidth: '1600px',
                                maxHeight: '400px',
                                objectFit: 'cover'

                            }} 
                            key={idx}
                            href={banner.navigateTo}
                        >
                            <img 
                                src={banner.img} 
                                alt=''
                                style={{
                                    objectFit: 'cover'
                                }} 
                            />
                        </a>    
                    )
                }
            </Carousel>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    margin: '10px 0',
                    marginTop: '20px'
                }}
            >
                {
                    page.products && page.products.map((item, idx) => 
                        <Card 
                            key={idx}
                            style={{
                                width: '400px',
                                height: '200px',
                                margin: '5px'
                            }}
                        >
                            <img  
                                style={{
                                    // width: '100%',
                                    // height: '100%'
                                    textAlign: 'center'
                                }}
                                src={item.img} 
                                alt="" 
                            />
                        </Card>
                        
                    )
                }
            </div>
        </div>
    )
}

export default ProductPage