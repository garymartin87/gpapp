import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';

const AddProducts = props => {
    const { navigation } = props;

    const onScanBarcode = barcode => {
        console.log('AddProducts onScanBarcode Callback', barcode);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputProductContainer}>
                <Input
                    containerViewStyle={styles.inputProductInput}
                    placeholder="Código del producto"
                />
                <Button
                    title="Es"
                    style={styles.btnScanProduct}
                    onPress={() =>
                        navigation.navigate('BarcodeScanner', {
                            onScanBarcode,
                            goBack: true,
                        })
                    }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 26,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputProductContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputProductInput: {
        width: '10%',
    },
    btnScanProduct: {
        width: '30%',
    },
});

export default AddProducts;
