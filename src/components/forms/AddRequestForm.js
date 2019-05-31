import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Select, Option } from 'react-native-select-lists';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { addProduct, removeProduct } from '../../actions/addRequestFormActions';
import { fetchClients } from '../../actions/clientsActions';

import RenderInput from '../RenderInput';
import AddProductsFieldArray from './AddProductsFieldArray';
import AddProduct from '../AddProduct';

let AddRequestForm = props => {
    const {
        handleSubmit,
        onSubmit,
        pristine,
        reset,
        addProductActionCreator,
        removeProductActionCreator,
        fetchClientsActionCreator,
        clients,
    } = props;

    useEffect(() => {
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
            {/*
            <Field
                component={RenderInput}
                name="clientNumber"
                placeholder="081291051"
                label="Número de cliente"
            />
            */}

            {clients === null ? (
                <View>
                    <Text>Loading...</Text>
                </View>
            ) : (
                <Field
                    name="clientNumber"
                    component={({ input: { value, onChange } }) => {
                        return (
                            <Select
                                onSelect={value => {
                                    console.log(value);
                                    onChange(value);
                                }}
                            >
                                {clients.map((client, index) => {
                                    return (
                                        <Option key={index} value={client.code}>
                                            {client.name}
                                        </Option>
                                    );
                                })}
                            </Select>
                        );
                    }}
                />
            )}

            <View style={styles.containerProducts}>
                <AddProduct onAddProduct={handleAddProduct} />
                <FieldArray
                    name="products"
                    component={props =>
                        AddProductsFieldArray({ ...props, handleRemoveProduct })
                    }
                />
            </View>
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
    containerProducts: {
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 7,
        flex: 1,
    },
});

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addRequestForm',
    initialValues: {
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
