import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reactThunk from 'redux-thunk';

import reducers from './src/reducers';
import Home from './src/components/Home';
import BarcodeScanner from './src/components/BarcodeScanner';
import AddRequest from './src/components/AddRequest';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        BarcodeScanner: BarcodeScanner,
        AddRequest: AddRequest,
    },
    {
        initialRouteName: 'AddRequest',
    }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = [reactThunk];
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(...middlewares))
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}
