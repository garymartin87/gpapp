import React from 'react';
import _ from 'lodash';
import { Alert, FlatList, ScrollView, StyleSheet, View } from 'react-native';
import Faker from 'faker';

import AddProduct from '../AddProduct';
import RenderProductItem from './RenderProductItem';

const AddProductsFieldArray = ({ fields, meta: { error, submitFailed } }) => {
    const handleAddProduct = barcode => {
        // validate if is product exists
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
            fields.push(product);
        }
    };

    const handleRemoveProduct = index => {
        fields.remove(index);
    };

    return (
        <View style={styles.containerProducts}>
            <AddProduct onAddProduct={handleAddProduct} />

            <ScrollView>
                <FlatList
                    keyExtractor={item => item.code}
                    data={fields.getAll()}
                    renderItem={props =>
                        RenderProductItem({
                            ...props,
                            onRemove: handleRemoveProduct,
                        })
                    }
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    containerProducts: {
        marginTop: 15,
        marginBottom: 15,
        paddingLeft: 7,
        flex: 1,
    },
});

export default AddProductsFieldArray;
