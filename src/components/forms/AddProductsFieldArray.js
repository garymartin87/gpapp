import React from 'react';
import { FlatList, ScrollView, View, StyleSheet } from 'react-native';

import RenderProductItem from './RenderProductItem';

const AddProductsFieldArray = ({
    fields,
    meta: { error, submitFailed },
    handleRemoveProduct,
}) => {
    const products = fields.getAll();
    return (
        <ScrollView>
            <FlatList
                keyExtractor={item => item.code}
                data={products}
                renderItem={props =>
                    RenderProductItem({
                        ...props,
                        onRemove: handleRemoveProduct,
                    })
                }
            />
        </ScrollView>
    );
};

export default AddProductsFieldArray;
