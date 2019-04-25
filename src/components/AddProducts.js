import React from 'react';
import { StyleSheet, View } from 'react-native';

import AddProductsForm from './forms/AddProductsForm';

const AddProducts = props => {
    const onSubmit = values => {
        console.log('AddProduct parent handleSubmit', values);
    };

    return (
        <View style={styles.container}>
            <AddProductsForm onSubmit={onSubmit} />
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
