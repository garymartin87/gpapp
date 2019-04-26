import React from 'react';
import { Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = props => {
    return (
        <View style={styles.container}>
            <Button
                icon={<Icon name="shopping-cart" size={15} color="white" />}
                title=" Cargar Petición"
                onPress={() => props.navigation.navigate('AddRequest')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Home;
