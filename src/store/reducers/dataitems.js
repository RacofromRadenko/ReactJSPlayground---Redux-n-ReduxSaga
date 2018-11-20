import * as actionTypes from '../action';

const initialState = {
	data: null,
	error: null,
	fetching: false
};

export function dataItemsReducer(state = initialState, action) {
	switch (action) {
		case actionTypes.GET_ALL_PRODUCTS_MAKE_API_REQUEST:
			return {
				...state,
				fetching: true,
				error: null
			};

		case actionTypes.GET_ALL_PRODUCTS_REQUEST_SUCCESS:
			return {
				...state,
				fetching: false,
				data: action.data
			};
			console.log(state);
			console.log(action);

		case actionTypes.GET_ALL_PRODUCTS_REQUEST_FAILURE:
			return {
				...state,
				fetching: false,
				error: action.error
			};
		default:
			return state;
	}
}

export default dataItemsReducer;
