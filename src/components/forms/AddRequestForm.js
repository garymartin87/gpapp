import React from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, arrayPush } from 'redux-form';
import Faker from 'faker';

import AddProduct from '../AddProduct';
import RenderInput from '../RenderInput';

const renderProducts = ({ fields, meta: { error, submitFailed } }) => (
    <ScrollView style={styles.containerProducts}>
        <FlatList
            keyExtractor={item => item.code}
            data={fields.getAll()}
            renderItem={renderProduct}
        />
    </ScrollView>
);

const renderProduct = ({ item }) => {
    return (
        <ListItem
            key={item.code}
            title={`${item.description} - ${item.code}`}
            bottomDivider={true}
            containerStyle={styles.containerProduct}
        />
    );
};

let AddRequestForm = props => {
    const { handleSubmit, onSubmit, pushArray } = props;

    const handleAddProduct = barcode => {
        const product = {
            code: barcode,
            description: Faker.hacker.noun(),
        };

        console.log('ADDING PRODUCT code', product);

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
        justifyContent: 'flex-end',
    },
    containerProducts: {
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 7,
        flex: 1,
    },
    containerProduct: {
        padding: 5,
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
