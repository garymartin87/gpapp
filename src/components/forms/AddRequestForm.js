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

    const renderClientSelectOptions = () => {
        let options = clients.map((client, index) => {
            return (
                <Option key={index + 1} value={client.code}>
                    {client.name}
                </Option>
            );
        });

        options.unshift(
            <Option key={0} value={0}>
                - Seleccione un cliente -
            </Option>
        );

        return options;
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
                    <Text style={styles.placeholder}>Cargando clientes...</Text>
                </View>
            ) : (
                <View>
                    <Text style={styles.placeholder}>Cliente</Text>
                    <Field
                        name="clientNumber"
                        component={({ input: { value, onChange } }) => {
                            return (
                                <Select
                                    caret="down"
                                    caretSize={10}
                                    caretColor="#86939e"
                                    selectStyle={styles.select}
                                    listHeight={300}
                                    listStyle={styles.selectList}
                                    onSelect={value => {
                                        onChange(value);
                                    }}
                                >
                                    {renderClientSelectOptions()}
                                </Select>
                            );
                        }}
                    />
                </View>
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
    select: {
        marginLeft: 15,
        marginRight: 10,
    },
    placeholder: {
        marginLeft: 15,
        marginBottom: 16,
        fontSize: 16,
        color: '#86939e',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    selectList: {
        zIndex: 999,
        position: 'absolute',
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
