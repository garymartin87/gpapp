import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import RenderInput from '../RenderInput';
import AddProductsFieldArray from './AddProductsFieldArray';

let AddRequestForm = props => {
    const { handleSubmit, onSubmit, pristine, reset } = props;

    return (
        <View style={styles.container}>
            <Field
                component={RenderInput}
                name="clientNumber"
                placeholder="081291051"
                label="Número de cliente"
            />

            <FieldArray name="products" component={AddProductsFieldArray} />

            <View style={styles.containerButton}>
                <Button
                    disabled={pristine}
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
        padding: 5,
    },
    containerButton: {
        justifyContent: 'flex-end',
    },
    submitButton: {
        fontSize: 20,
    },
});

const mapDispatchToProps = {};

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addRequestForm',
    initialValues: {
        products: [],
    },
})(AddRequestForm);

export default connect(
    null,
    mapDispatchToProps
)(AddRequestForm);
