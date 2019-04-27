import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    FlatList,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, arrayPush } from 'redux-form';
import Icon from 'react-native-vector-icons/Feather';
import Faker from 'faker';

import AddProduct from '../AddProduct';
import RenderInput from '../RenderInput';

const renderProducts = ({ fields, meta: { error, submitFailed } }) => {
    const handleAddProduct = barcode => {
        const product = {
            code: barcode,
            description: Faker.hacker.noun(),
            quantity: 1,
        };

        // validate if is product exists
        let productExist = false;
        const products = fields.getAll();

        if (products) {
            products.forEach(product => {
                if (product.code === barcode) {
                    productExist = true;
                }
            });
        }

        if (productExist) {
            Alert.alert('El producto ya existe');
        } else {
            console.log('ADDING PRODUCT code', product);
            fields.push(product);
        }
    };

    const handleRemoveProduct = product => {
        fields.remove(<product />);
        //console.log(product);
    };

    const renderProduct = ({ item }) => {
        return (
            <ListItem
                key={item.code}
                title={`${item.description} - ${item.code}`}
                bottomDivider={true}
                containerStyle={styles.containerProduct}
                rightIcon={
                    <TouchableOpacity onPress={() => handleRemoveProduct(item)}>
                        <Icon name="trash-2" color="black" size={20} />
                    </TouchableOpacity>
                }
            />
        );
    };

    return (
        <View style={styles.containerProducts}>
            <AddProduct onAddProduct={handleAddProduct} />

            <ScrollView>
                <FlatList
                    keyExtractor={item => item.code}
                    data={fields.getAll()}
                    renderItem={renderProduct}
                />
            </ScrollView>
        </View>
    );
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
        padding: 5,
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
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    submitButton: {
        fontSize: 20,
    },
});

const mapDispatchToProps = {};

AddRequestForm = reduxForm({
    // a unique name for the form
    form: 'addProduct',
})(AddRequestForm);

export default connect(
    null,
    mapDispatchToProps
)(AddRequestForm);
