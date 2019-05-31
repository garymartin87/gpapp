import _ from 'lodash';
import { formValueSelector, arrayPush, arrayRemove, change } from 'redux-form';

import gpAppApi from '../apis/gpapp';
import { alertUser } from './AlertUserActions';
import {
    ADD_PRODUCT_REQUESTED,
    ADD_PRODUCT_DOESNT_EXIST,
    ADD_PRODUCT_SUCCEDED,
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
        dispatch(
            alertUser(
                'Producto ya agregado',
                'El producto ya existe en la lista'
            )
        );
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
            dispatch(
                alertUser(
                    'Producto inexistente',
                    'El producto no existe en la base de datos'
                )
            );
        }
    }
};

export const removeProduct = index => async (dispatch, getState) => {
    dispatch(arrayRemove('addRequestForm', 'products', index));
};
