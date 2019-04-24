import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reactThunk from 'redux-thunk';

import reducers from './src/reducers';
import Home from './src/components/Home';
import BarcodeScanner from './src/components/BarcodeScanner';
import AddProducts from './src/components/AddProducts';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        BarcodeScanner: BarcodeScanner,
        AddProducts: AddProducts,
    },
    {
        initialRouteName: 'Home',
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
