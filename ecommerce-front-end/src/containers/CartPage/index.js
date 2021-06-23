import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./style.css"

import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import CartItem from "./CartItem"
import { addToCart, getCartItems } from '../../actions'

const CartPage = () => {
    
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems)    
    }, [cart.cartItems])

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems)
        }
    }, [auth.authenticate])

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        console.log("params from onQuantityIncrement function from CartPage : ", {_id, qty})
        dispatch(addToCart({ _id, name, price, img }, 1));
    }
    
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        console.log("params from onQuantityDecrement function from CartPage : ", {_id, qty})
        dispatch(addToCart({ _id, name, price, img }, -1));
    }

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
                                onQuantityInc={onQuantityIncrement}
                                onQuantityDec={onQuantityDecrement}
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
