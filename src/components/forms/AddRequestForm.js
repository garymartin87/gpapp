import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';

import AddProduct from '../AddProduct';
import RenderInput from '../RenderInput';

const handleAddProduct = product => {
    console.log('ADD PRODUCT code', product);
};

let AddRequestForm = props => {
    const { handleSubmit, onSubmit } = props;

    return (
        <View style={styles.container}>
            <Field
                component={RenderInput}
                name="clientNumber"
                placeholder="081291051"
                label="Número de cliente"
            />

            <AddProduct onAddProduct={handleAddProduct} />

            <View style={styles.containerButton}>
                <Button
                    style={styles.submitButton}
                    icon={{
                        name: 'check-circle',
                        size: 20,
                        color: 'white',
                    }}
                    onPress={handleSubmit(onSubmit)}
                    title="Cargar Petición"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
    },
    containerButton: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'flex-end',
    },
    submitButton: {
        fontSize: 20,
    },
});

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addProduct',
})(AddRequestForm);

export default AddRequestForm;
