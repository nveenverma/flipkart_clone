import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./style.css"

import Layout from '../../components/Layout'
import Card from '../../components/UI/Card'
import { MaterialButton } from "../../components/MaterialUI"
import PriceDetails from "../../components/PriceDetails"
import CartItem from "./CartItem"
import { addToCart, getCartItems } from '../../actions'

const CartPage = (props) => {
    
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

    if (props.onlyCartItems) {
        return (
            <div style={{ padding : '10px 0' }}>
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
            
            </div>
        )
    }

    return (
        <Layout>
            <div className='cartContainer' style={{ alignItems : 'flex-start' }}>
                <Card
                    headerLeft={`My Cart`}
                    headerRight={<div>Deliver to</div>}
                    style={{ 
                        width : 'calc(100% - 400px)', 
                        overflow : 'hidden',
                    }}
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
                    <div style={{
                        width : '100%',
                        display : 'flex',
                        background : 'fff',
                        justifyContent : 'flex-end',
                        boxShadow : '0 0 10px 10px #eee',
                        padding : '10px',
                        boxSizing : 'border-box'
                    }}>
                        <div style={{ width : '250px' }} >
                            <MaterialButton 
                                title='PLACE ORDER'
                                onClick={() => props.history.push('/checkout')}                                
                            />
                        </div>
                    </div>                    
                </Card>
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce((totalQty, key) => {
                        return totalQty + cart.cartItems[key].qty
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const {price, qty} = cart.cartItems[key];                        
                        return totalPrice + (price*qty);
                    }, 0)}
                />
            </div>
        </Layout>
    )
}

export default CartPage
