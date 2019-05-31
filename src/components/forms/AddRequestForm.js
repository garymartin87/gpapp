import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm } from 'redux-form';

import { addProduct } from '../../actions/AddRequestFormActions';
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
    } = props;

    const handleAddProduct = barcode => {
        addProductActionCreator(barcode);
        // validate if is product exists
        /*
        const product = {
            code: barcode,
            description: Faker.hacker.noun(),
            quantity: 1,
        };

        dispatch(arrayPush('addRequestForm', 'products', product));
        */
        //console.log(products);
        /*
        console.log(products);
        products.forEach(product => {
            console.log(product);
        });
        */
        /*const existingProduct = _.find(products, { code: barcode });
        if (existingProduct) {
            Alert.alert('El producto ya existe');
        } else {
            const product = {
                code: barcode,
                description: Faker.hacker.noun(),
                quantity: 1,
            };

            console.log('ADDING PRODUCT code', product);
            props.pushArray('addRequestForm', 'products', product);
        }
        */
        /*
        const products = fields.getAll();
        const existingProduct = _.find(products, { code: barcode });

        if (existingProduct) {
            Alert.alert('El producto ya existe');
        } else {
            const product = {
                code: barcode,
                description: Faker.hacker.noun(),
                quantity: 1,
            };

            console.log('ADDING PRODUCT code', product);
            this.props.pushArray('addRequestForm', 'products', product);
        }
        */
    };

    return (
        <View style={styles.container}>
            <Field
                component={RenderInput}
                name="clientNumber"
                placeholder="081291051"
                label="Número de cliente"
            />

            <View style={styles.containerProducts}>
                <AddProduct onAddProduct={handleAddProduct} />
                <FieldArray name="products" component={AddProductsFieldArray} />
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
    return {};
};

export default connect(
    mapStateToProps,
    { addProductActionCreator: addProduct }
)(AddRequestForm);
