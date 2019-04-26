import { Input } from 'react-native-elements';
import React from 'react';
import { StyleSheet } from 'react-native';

const RenderInput = props => {
    const { input, placeholder, label, ...inputProps } = props;

    return (
        <Input
            {...inputProps}
            containerStyle={styles.containerInput}
            onChangeText={input.onChange}
            label={label}
            placeholder={placeholder}
        />
    );
};

const styles = StyleSheet.create({
    containerInput: {
        marginBottom: 30,
    },
});

export default RenderInput;
