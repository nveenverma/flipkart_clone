import { categoryConstants } from "../actions/constants"

const initState = {
    categories : [],
    loading : false,
    error : null
}

const buildNewCategories = (parentId, categories, category) => {
    
    let categoriesArray = [];
 
    for (let cat of categories) {

        if (parentId === cat._id) {
            categoriesArray.push({
                ...cat,
                children : cat.children && cat.children.length > 0 ? 
                    buildNewCategories(parentId, [...cat.children, {
                        _id : category._id,
                        name : category.name,
                        slug : category.slug,
                        parentId : category.parentId,
                        categoryImage : category.categoryImage,
                        children : category.children
                    }], category) : []
            })
        } else {
            categoriesArray.push({
                ...cat,
                children : cat.children && cat.children.length > 0 ? 
                    buildNewCategories(parentId, cat.children, category) : []
            })
        }

        }
        return categoriesArray;
}

const categoryReducer =  (state = initState, action) => {

    switch (action.type) {
    
        // Changing the state based on actions dispatched while getting the categories list
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST : 
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS : 
            state = {
                ...state,
                categories : action.payload.categories
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE : 
            state = {
                ...initState,
                error : action.payload.error
            }
            break;
        
        // Changing the state based on actions dispatched while adding a new category
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST : 
            state = {
                ...state,
                loading : true
            }
            break;

        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS :
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log("after new category added..", updatedCategories);

            state = {
                ...state,
                categories : updatedCategories,
                loading : false
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE : 
            state = {
                ...state,
                loading : false,
                error : action.payload.error
            }
            break;

        // State for default action type
        default : {
            state = {
                ...initState
            }
            break;
        }
    }

    return state;
}

export default categoryReducer;