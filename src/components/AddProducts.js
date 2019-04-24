import React from 'react';
import { StyleSheet, View } from 'react-native';

import AddProductsForm from './forms/AddProductsForm';

const AddProducts = props => {
    const handleSubmit = () => {
        console.log('AddProduct parent handleSubmit');
    };

    return (
        <View style={styles.container}>
            <AddProductsForm handleSubmit={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default AddProducts;
