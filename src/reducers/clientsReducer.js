import { CLIENTS_FETCH_REQUESTED, CLIENTS_FETCHED } from '../actions/types';

const INITIAL_STATE = {
    clients: null,
    isFetching: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CLIENTS_FETCH_REQUESTED:
            return {
                ...state,
                isFetching: true,
            };
            break;
        case CLIENTS_FETCHED:
            return {
                ...state,
                clients: action.payload,
                isFetching: false,
            };
            break;
        default:
            return state;
    }
};
