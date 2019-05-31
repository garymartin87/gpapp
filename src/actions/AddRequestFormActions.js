import _ from 'lodash';
import { formValueSelector, arrayPush, arrayRemove } from 'redux-form';

import gpAppApi from '../apis/gpapp';
import {
    ADD_PRODUCT_REQUESTED,
    ADD_PRODUCT_ALREADY_EXISTS,
    ADD_PRODUCT_DOESNT_EXIST,
    ADD_PRODUCT_SUCCEDED,
    ADD_PRODUCT_FAILED,
} from './types';

export const addProduct = code => async (dispatch, getState) => {
    console.log('ACTION CREATOR addProduct');

    dispatch({
        type: ADD_PRODUCT_REQUESTED,
    });

    const selector = formValueSelector('addRequestForm');
    const state = getState();
    const products = selector(state, 'products');
    console.log('products', typeof products);

    const existingProduct = _.find(products, product => {
        return product.code == code.toUpperCase();
    });
    console.log('existingProduct', existingProduct);

    if (existingProduct) {
        dispatch(addProductAlreadyExist());
    } else {
        try {
            const { data } = await gpAppApi.get(`/iv00101/${code}`);
            console.log('product found', data);
            dispatch(
                arrayPush('addRequestForm', 'products', {
                    code: data.itemnmbr.trim(),
                    description: data.itemnmbr.trim(),
                })
            );

            dispatch({ type: ADD_PRODUCT_SUCCEDED });
        } catch (err) {
            //ToDo: Check if was an error or if was an 401 status code
            dispatch(addProductDoesntExist());
            console.log('product NOT FOUND', err);
        }
    }
};

export const addProductAlreadyExist = (dispatch, getState) => {
    console.log('ACTION CREATOR addProductAlreadyExist');
    const action = {
        type: ADD_PRODUCT_ALREADY_EXISTS,
    };

    return action;
};

export const addProductDoesntExist = () => async (dispatch, getState) => {
    const action = {
        type: ADD_PRODUCT_DOESNT_EXIST,
    };

    return action;
};

export const removeProduct = index => async (dispatch, getState) => {
    dispatch(arrayRemove('addRequestForm', 'products', index));
};
