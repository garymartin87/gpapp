import React from 'react';
import { ListItem } from 'react-native-elements';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const RenderProduct = ({ item, index, onRemove }) => {
    return (
        <ListItem
            key={item.code}
            title={`#${item.code} - ${item.description}`}
            bottomDivider={true}
            containerStyle={styles.containerProduct}
            rightIcon={
                <TouchableOpacity onPress={() => onRemove(index)}>
                    <Icon name="trash-2" color="black" size={20} />
                </TouchableOpacity>
            }
        />
    );
};

const styles = StyleSheet.create({
    containerProduct: {
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
    },
});

export default RenderProduct;
