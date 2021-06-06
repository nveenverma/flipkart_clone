import axios from "../helpers/axios";
import { categoryConstants } from "./constants";

// Action to get all the categories
const getAllCategory = () => {
	return async dispatch => {
		dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
		const res = await axios.get("category/get");

		if (res.status === 200) {
			const { categoryList } = res.data;
			dispatch({
				type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
				payload: { categories: categoryList },
			});
		} else {
			dispatch({
				type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
				payload: { error: res.data.error },
			});
		}
	};
};

// Action to add a category
export const addCategory = (form) => {
	return async dispatch => {
		dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
		const res = await axios.post("category/create", form);

		if (res.status === 200 || res.status === 201) {
			dispatch({
				type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
				payload: { category: res.data.category },
			});
		} else {
			dispatch({
				type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
				payload: { error: res.data.error },
			});
		}
		console.log(res);
	};
};

// Action to update categories
export const updateCategories = (form) => {
	return async dispatch => {
		dispatch({ type : categoryConstants.UPDATE_CATEGORIES_REQUEST })
		const res = await axios.post("category/update", form);

		if (res.status === 201) {
			dispatch({ type : categoryConstants.UPDATE_CATEGORIES_SUCCESS })
			dispatch(getAllCategory())
		} else {
			const { error } = res.data;
			dispatch({
				type : categoryConstants.UPDATE_CATEGORIES_FAILURE,
				payload : { error }
			})
		}
	};
};

// Action to delete categories
export const deleteCategoriesAction = (ids) => {
	return async dispatch => {
		dispatch({ type : categoryConstants.DELETE_CATEGORIES_REQUEST })
		const res = await axios.post("category/delete", {
			payload: {
				ids,
			},
		});
		if (res.status === 201) {
			dispatch({ type : categoryConstants.DELETE_CATEGORIES_SUCCESS })
			dispatch(getAllCategory())
		} else {
			const { error } = res.data;
			dispatch({ 
				type : categoryConstants.DELETE_CATEGORIES_FAILURE,
				payload : { error }
			})
		}
	};
};

export {
	getAllCategory
}