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

let AddProductsForm = props => {
    const { navigation, handleSubmit } = props;

    return (
        <View>
            <View>
                <Field
                    name="productId"
                    placeholder="Código del producto"
                    component={renderInput}
                />
            </View>
            <View>
                <Button
                    title="Escanear"
                    onPress={() =>
                        navigation.navigate('BarcodeScanner', {
                            onScanBarcode,
                            goBack: true,
                        })
                    }
                />
            </View>
            <View>
                <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.btnSubmit}>Submit</Text>
                </TouchableOpacity>
            </View>
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
    inputContainer: {
        width: '100%',
    },
});

AddProductsForm = reduxForm({
    // a unique name for the form
    form: 'addProduct',
})(AddProductsForm);

export default withNavigation(AddProductsForm);
