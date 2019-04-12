import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './src/components/Home';
import BarcodeScanner from './src/components/BarcodeScanner';

const AppNavigator = createStackNavigator(
    {
        Home: Home,
        BarcodeScanner: BarcodeScanner
    },
    {
        initialRouteName: "Home"
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}