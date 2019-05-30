import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import {
    Field,
    FieldArray,
    reduxForm,
    formValueSelector,
    arrayPush,
} from 'redux-form';

import RenderInput from '../RenderInput';
import AddProductsFieldArray from './AddProductsFieldArray';
import AddProduct from '../AddProduct';
import _ from 'lodash';
import Faker from 'faker';

let AddRequestForm = props => {
    const {
        handleSubmit,
        onSubmit,
        pristine,
        reset,
        pushArray,
        products,
    } = props;

    const handleAddProduct = barcode => {
        // validate if is product exists
        const product = {
            code: barcode,
            description: Faker.hacker.noun(),
            quantity: 1,
        };

        console.log(pushArray);

        pushArray('addRequestForm', 'products', product);

        console.log(products);
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

const mapDispatchToProps = {
    pushArray: arrayPush,
};

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addRequestForm',
    initialValues: {
        products: [],
    },
})(AddRequestForm);

const selector = formValueSelector('addRequestForm');
export default connect(
    null,
    mapDispatchToProps
)(AddRequestForm);
