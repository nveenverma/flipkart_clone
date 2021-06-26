import React from 'react'
import './style.css'

const Card = ({headerLeft, headerRight, children, ...rest}) => {
    return (
        <div 
            className='card'
            {...rest}
        >
            {(headerLeft || headerRight) && (
                <div className='cardHeader'>                    
                    {
                        headerLeft && <div>{headerLeft}</div>
                    }
                    {
                        headerRight && <div>{headerRight}</div>
                    }
                </div>
                )}
            {children}            
        </div>
    )
}

export default Card
