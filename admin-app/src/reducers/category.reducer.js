import { categoryConstants } from "../actions/constants"

const initState = {
    categories : [],
    loading : false,
    error : null
}

const buildNewCategories = (parentId, categories, category) => {    
    
    if (parentId === undefined) {
        return [
            ...categories,
            {
                _id : category._id,
                name : category.name,
                slug : category.slug,
                type: category.type,
                children : []
            }
        ];
    }
    
    let categoriesArray = [];

    for (let cat of categories) {

        if (parentId === cat._id) {
            const newCategory = {
                _id : category._id,
                name : category.name,
                slug : category.slug,
                type: category.type,
                parentId : category.parentId,
                children : []
            }
            categoriesArray.push({
                ...cat,
                children : cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            categoriesArray.push({
                ...cat,
                children : cat.children ? 
                    buildNewCategories(parentId, cat.children, category) : []
            })
        }

        }
        return categoriesArray;
}

const categoryReducer =  (state = initState, action) => {

    switch (action.type) {
    
        // Changing the state based on actions dispatched while getting the categories list
        // Getting Categories
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST : 
            state = {
                ...state,
                loading : true
            }
            break;
        
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS : 
            state = {
                ...state,
                categories : action.payload.categories,
                loading : false
            }
            break;
            
            case categoryConstants.GET_ALL_CATEGORIES_FAILURE : 
            state = {
                ...initState,
                error : action.payload.error,
                loading : false
            }
            break;
        
        // Adding Categories
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
                loading : false,
                categories : updatedCategories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE : 
            state = {
                ...state,
                loading : false,
                error : action.payload.error
            }
            break;

            
        // Updating Categories
        case categoryConstants.UPDATE_CATEGORIES_REQUEST : 
            state = {
                ...state,
                loading : true
            }
            break;

        case categoryConstants.UPDATE_CATEGORIES_SUCCESS :
            state = {
                ...state,
                loading : false
            }
            break;

        case categoryConstants.UPDATE_CATEGORIES_FAILURE : 
            state = {
                ...state,
                loading : false,
                error : action.payload.error
            }
            break;

        // Deleting Categories
        case categoryConstants.DELETE_CATEGORIES_REQUEST : 
            state = {
                ...state,
                loading : true
            }
            break;

        case categoryConstants.DELETE_CATEGORIES_SUCCESS :
            state = {
                ...state,
                loading : false
            }
            break;

        case categoryConstants.DELETE_CATEGORIES_FAILURE : 
            state = {
                ...state,
                loading : false,
                error : action.payload.error
            }
            break;
            
        // State for default action type
        default : 
            state = {
                ...state
            }
            break;
    }

    return state;
}

export default categoryReducer;