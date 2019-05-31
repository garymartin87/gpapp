import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import clientsReducer from './clientsReducer';

export default combineReducers({
    form: formReducer,
    clients: clientsReducer,
});
