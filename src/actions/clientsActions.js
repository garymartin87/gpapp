import _ from 'lodash';

import gpAppApi from '../apis/gpapp';
import { CLIENTS_FETCH_REQUESTED, CLIENTS_FETCHED } from './types';

import { alertUser } from './alertUserActions';

export const fetchClients = () => async (dispatch, getState) => {
    dispatch({ type: CLIENTS_FETCH_REQUESTED });

    try {
        const { data } = await gpAppApi.get('/rm00101');

        const parsedData = _.map(data, client => {
            return {
                code: client.custnmbr.trim(),
                name: client.custname.trim(),
            };
        });

        const action = {
            type: CLIENTS_FETCHED,
            payload: parsedData,
        };

        dispatch(action);
    } catch (err) {
        dispatch(alertUser('Verifique su conexión a internet', err.message));
        console.log(err);
    }
};
