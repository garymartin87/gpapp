import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { addProduct, removeProduct } from '../../actions/addRequestFormActions';
import { fetchClients } from '../../actions/clientsActions';
import AddProductsFieldArray from './AddProductsFieldArray';
import ClientSelect from './ClientSelect';
import AddProduct from '../AddProduct';

const checkValidClientNumber = value => {
    const error = value ? undefined : 'El campo es Requerido';
    return error;
};

const checkValidProducts = value => {
    const error =
        value && value.length > 0 ? undefined : 'Cargue al menos un producto';
    return error;
};

let AddRequestForm = props => {
    const {
        handleSubmit,
        onSubmit,
        pristine,
        invalid,
        reset,
        addProductActionCreator,
        removeProductActionCreator,
        fetchClientsActionCreator,
        clients,
    } = props;

    useEffect(() => {
        console.log(clients);
        if (!clients) {
            fetchClientsActionCreator();
        }
    }, []);

    const handleAddProduct = barcode => {
        addProductActionCreator(barcode);
    };

    const handleRemoveProduct = index => {
        removeProductActionCreator(index);
    };

    return (
        <View style={styles.container}>
            {clients === null ? (
                <View>
                    <Text style={styles.placeholder}>Cargando clientes...</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.placeholder}>Cliente</Text>
                    <Field
                        name="clientNumber"
                        validate={[checkValidClientNumber]}
                        clients={clients}
                        component={ClientSelect}
                    />
                </View>
            )}

            <View style={styles.containerProducts}>
                <AddProduct onAddProduct={handleAddProduct} />
                <FieldArray
                    name="products"
                    validate={[checkValidProducts]}
                    component={field =>
                        AddProductsFieldArray({ ...field, handleRemoveProduct })
                    }
                />
            </View>
            <View style={styles.containerButton}>
                <Button
                    disabled={pristine || invalid}
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
    containerProducts: {
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 7,
        flex: 1,
    },
    placeholder: {
        marginLeft: 15,
        marginBottom: 16,
        fontSize: 16,
        color: '#86939e',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
});

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addRequestForm',
    initialValues: {
        clientNumber: 0,
        products: [],
    },
})(AddRequestForm);

const mapStateToProps = state => {
    return {
        clients: state.clients.clients,
    };
};

export default connect(
    mapStateToProps,
    {
        addProductActionCreator: addProduct,
        removeProductActionCreator: removeProduct,
        fetchClientsActionCreator: fetchClients,
    }
)(AddRequestForm);
