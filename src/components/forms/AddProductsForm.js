import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Field, reduxForm } from 'redux-form';

const renderInput = ({ input: { onChange, ...restInput } }) => {
    return (
        <Input style={styles.input} onChangeText={onChange} {...restInput} />
    );
};

const onScanBarcode = barcode => {
    console.log('AddProducts onScanBarcode Callback', barcode);
};

const submit = values => {
    console.log('AddProductsForm submit function', values);
};

let AddProductsForm = props => {
    const { navigation, handleSubmit } = props;

    return (
        <View style={styles.inputProductContainer}>
            <Field
                name="productId"
                placeholder="Código del producto"
                component={renderInput}
            />
            <Button
                title="Escanear"
                onPress={() =>
                    navigation.navigate('BarcodeScanner', {
                        onScanBarcode,
                        goBack: true,
                    })
                }
            />
            <TouchableOpacity onPress={handleSubmit(submit)}>
                <Text style={styles.btnSubmit}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    inputProductContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {},
    btnSubmit: {},
});

AddProductsForm = reduxForm({
    // a unique name for the form
    form: 'addProduct',
})(AddProductsForm);

export default withNavigation(AddProductsForm);
