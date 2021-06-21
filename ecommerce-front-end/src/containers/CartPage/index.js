import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import "./style.css"

import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import CartItem from "./CartItem"

const CartPage = () => {
    
    const cart = useSelector(state => state.cart);
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems)    
    }, [cart.cartItems])

    return (
        <Layout>
            <div className='cartContainer' style={{ alignItems : 'flex-start' }}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                >
                    {
                        Object.keys(cartItems).map((item, index) => 
                            <CartItem
                                key={index}
                                cartItem={cartItems[item]}
                            />
                        )
                    }
                </Card>
                <Card
                    headerLeft="Price"
                    style={{
                        width:'500px'
                    }}
                >                 
                </Card>
            </div>
        </Layout>
    )
}

export default CartPage
