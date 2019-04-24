import React from 'react';
import { Button } from 'react-native-elements';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = props => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Button
                icon={<Icon name="shopping-cart" size={15} color="white" />}
                title=" Cargar Productos"
                onPress={() => props.navigation.navigate('AddProducts')}
            />
        </View>
    );
};

export default Home;
