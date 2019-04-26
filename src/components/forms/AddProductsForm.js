import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { withNavigation } from 'react-navigation';
import { Field, reduxForm } from 'redux-form';

const renderInput = ({ input, placeholder, label }) => {
    console.log(input);
    console.log(placeholder);
    console.log(label);
    return (
        <Input
            containerStyle={styles.containerInput}
            onChangeText={input.onChange}
            label={label}
            placeholder={placeholder}
            {...input}
        />
    );
};

const onScanBarcode = barcode => {
    console.log('AddProducts onScanBarcode Callback', barcode);
};

const handleAddProduct = () => {
    console.log('Add Product');
};

let AddProductsForm = props => {
    const { navigation, handleSubmit } = props;

    return (
        <View style={styles.container}>
            <Field
                component={renderInput}
                name="clientNumber"
                placeholder="081291051"
                label="Número de cliente"
            />

            <View style={styles.containerProduct}>
                <View style={styles.containerProductId}>
                    <Field
                        component={renderInput}
                        name="productId"
                        placeholder="7792081291051"
                        label="Código de producto"
                    />
                </View>

                <View style={styles.containerAddProduct}>
                    <Button
                        icon={
                            <Icon name="plus-circle" color="white" size={20} />
                        }
                        onPress={handleAddProduct}
                    />
                </View>

                <View style={styles.containerProductScan}>
                    <Button
                        icon={<Icon name="camera" size={20} color="#4388d6" />}
                        type="outline"
                        onPress={() =>
                            navigation.navigate('BarcodeScanner', {
                                onScanBarcode,
                                goBack: true,
                            })
                        }
                    />
                </View>
            </View>

            <View />

            <View style={styles.containerButton}>
                <Button
                    style={styles.submitButton}
                    icon={{
                        name: 'check-circle',
                        size: 20,
                        color: 'white',
                    }}
                    onPress={handleSubmit}
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
    containerButton: {
        flex: 1,
        marginBottom: 20,
        justifyContent: 'flex-end',
    },
    containerInput: {
        marginBottom: 30,
    },
    submitButton: {
        fontSize: 20,
    },
});

AddProductsForm = reduxForm({
    // a unique name for the form
    form: 'addProduct',
})(AddProductsForm);

export default withNavigation(AddProductsForm);
