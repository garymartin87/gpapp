import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import React, { useState } from 'react';
import { withNavigation } from 'react-navigation';

const AddProduct = ({ navigation, onAddProduct }) => {
    const [productId, setProductId] = useState(null);

    const handleOnChangeProductId = text => {
        setProductId(text);
    };

    const handleAddProduct = () => {
        setProductId(null);
        onAddProduct(productId);
    };

    return (
        <View style={styles.containerProduct}>
            <View style={styles.containerProductId}>
                <Input
                    name="productId"
                    placeholder="7792081291051"
                    label="Código de producto"
                    value={productId}
                    onChangeText={handleOnChangeProductId}
                />
            </View>

            <View style={styles.containerAddProduct}>
                <Button
                    icon={<Icon name="plus-circle" color="white" size={20} />}
                    onPress={handleAddProduct}
                />
            </View>

            <View style={styles.containerProductScan}>
                <Button
                    icon={<Icon name="camera" size={20} color="#4388d6" />}
                    type="outline"
                    onPress={() =>
                        navigation.navigate('BarcodeScanner', {
                            onScanBarcode: onAddProduct,
                            goBack: true,
                        })
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerProduct: {
        flexDirection: 'row',
    },
    containerProductId: {
        flex: 4,
    },
    containerAddProduct: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 5,
    },
    containerProductScan: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});

export default withNavigation(AddProduct);
