import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
} from 'react-native';
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

let AddProductsForm = props => {
    const { navigation, handleSubmit } = props;

    return (
        <View style={styles.container}>
            <View style={styles.containerProduct}>
                <View style={styles.containerProductId}>
                    <Field
                        component={renderInput}
                        name="productId"
                        placeholder="7792081291051"
                        label="Código de producto"
                    />
                </View>

                <View style={styles.containerProductScan}>
                    <Button
                        icon={<Icon name="camera" color="white" size={20} />}
                        onPress={() =>
                            navigation.navigate('BarcodeScanner', {
                                onScanBarcode,
                                goBack: true,
                            })
                        }
                    />
                </View>
            </View>

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
        marginBottom: 10,
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
