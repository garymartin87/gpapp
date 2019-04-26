import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, arrayPush } from 'redux-form';

import AddProduct from '../AddProduct';
import RenderInput from '../RenderInput';

const renderProduct = ({ item }) => {
    return <Text>{item.code}</Text>;
};

const renderProducts = ({ fields, meta: { error, submitFailed } }) => {
    return (
        <FlatList
            keyExtractor={item => item.code}
            data={fields.getAll()}
            renderItem={renderProduct}
        />
    );
};

let AddRequestForm = props => {
    const { handleSubmit, onSubmit, pushArray } = props;

    const handleAddProduct = barcode => {
        console.log('ADD PRODUCT code', barcode);
        const product = { key: barcode, code: barcode };

        pushArray('addProduct', 'products', product);
    };

    return (
        <View style={styles.container}>
            <Field
                component={RenderInput}
                name="clientNumber"
                placeholder="081291051"
                label="Número de cliente"
            />

            <AddProduct onAddProduct={handleAddProduct} />
            <FieldArray name="products" component={renderProducts} />

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

const mapDispatchToProps = {
    pushArray: arrayPush,
};

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addProduct',
})(AddRequestForm);

export default connect(
    null,
    mapDispatchToProps
)(AddRequestForm);
