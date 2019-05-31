import React from 'react';
import { FlatList, ScrollView } from 'react-native';

import RenderProductItem from './RenderProductItem';

const AddProductsFieldArray = ({
    fields,
    meta: { error, submitFailed },
    handleRemoveProduct,
}) => {
    return (
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
    );
};

export default AddProductsFieldArray;
