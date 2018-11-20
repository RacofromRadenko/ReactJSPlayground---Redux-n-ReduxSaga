import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import * as actionTypes from '../action';

export function* watcherSaga() {
	yield takeLatest(actionTypes.GET_ALL_PRODUCTS_MAKE_API_REQUEST, workerSaga);
	console.log(yield takeLatest(actionTypes.GET_ALL_PRODUCTS_MAKE_API_REQUEST, workerSaga));
}

function fetchAllProducts() {
	return axios({
		method: 'GET',
		url: 'https://sandboxapi.g2a.com/v1/products',
		headers: {
			Authorization: 'qdaiciDiyMaTjxMt, 74026b3dc2c6db6a30a73e71cdb138b1e1b5eb7a97ced46689e2d28db1050875',
			'Content-Type': 'application/json'
		},
		processData: false,
		params: {
			page: 1,
			minPriceFrom: 0,
			minPriceTo: 1000
		}
	});
}

function* workerSaga() {
	try {
		const response = yield call(fetchAllProducts);
		const data = response.data;

		yield put({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST_SUCCESS, data });
		console.log(yield put({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST_SUCCESS, data }));
	} catch (error) {
		yield put({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST_FAILURE });

		console.log(yield put({ type: actionTypes.GET_ALL_PRODUCTS_REQUEST_FAILURE }));
	}
}

export function* rootSaga() {
	yield all([ watcherSaga() ]);
}

export default rootSaga;
