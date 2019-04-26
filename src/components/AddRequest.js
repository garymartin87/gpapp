import React from 'react';
import { StyleSheet, View } from 'react-native';

import AddRequestForm from './forms/AddRequestForm';

const handleSubmit = values => {
    console.log('AddRequest handleSubmit', values);
};

const AddRequest = props => {
    return (
        <View style={styles.container}>
            <AddRequestForm onSubmit={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default AddRequest;
