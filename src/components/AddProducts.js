import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { withNavigationFocus, NavigationEvents } from 'react-navigation';

const AddProducts = props => {
    const { navigation } = props;

    /*
    useEffect(() => {
        console.log('Checking barcode back');
        const barcode = props.navigation.getParam(barcode, null);
        console.log('Barcode back', barcode);
    });
    */

    return (
        <View style={styles.container}>
            <NavigationEvents
                onDidFocus={payload => {
                    console.log('did focus', payload);
                    const barcodeDetected = props.navigation.getParam(
                        'barcodeDetected',
                        null
                    );

                    console.log(
                        'barcodeDetected on AddProducts',
                        barcodeDetected
                    );
                }}
            />
            <View style={styles.inputProductContainer}>
                <Input
                    containerViewStyle={styles.inputProductInput}
                    placeholder="Código del producto"
                />
                <Button
                    title="Es"
                    style={styles.btnScanProduct}
                    onPress={() => props.navigation.navigate('BarcodeScanner')}
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
