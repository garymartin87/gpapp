import React from 'react';
import _ from 'lodash';
import {
    Alert,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import Faker from 'faker';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';

import AddProduct from '../AddProduct';

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

    const renderProduct = ({ item, index }) => {
        return (
            <ListItem
                key={item.code}
                title={`${item.description} - ${item.code}`}
                bottomDivider={true}
                containerStyle={styles.containerProduct}
                rightIcon={
                    <TouchableOpacity onPress={() => fields.remove(index)}>
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

const styles = StyleSheet.create({
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
});

export default AddProductsFieldArray;
