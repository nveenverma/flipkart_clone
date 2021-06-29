import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { getAllCategory } from "../../actions"
import './style.css'

function MenuHeader () {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Below function is used to display all the categories
    const renderCategories = (categories) => {
        let categoriesArray = [];

        for (let category of categories) {
            categoriesArray.push(
                <li key={category._id}>
                    {
                        category.parentId ? 
                        <a href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>{category.name}</a> : 
                        <span>{category.name}</span>                        
                    }

                    {
                        category.children.length > 0 ? 
                        <ul>{renderCategories(category.children)}</ul> : 
                        null
                    }
                </li>
            )
        }
        return categoriesArray;
    }

    return (
        <div className="menuHeader">
            <ul>
                {
                    category.categories.length > 0 ?
                    renderCategories(category.categories) : null
                }
            </ul>
            
        </div>
    )
}

export default MenuHeader 
