import { Input } from 'react-native-elements';
import React from 'react';
import { StyleSheet } from 'react-native';

const RenderInput = ({ input, placeholder, label }) => {
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

const styles = StyleSheet.create({
    containerInput: {
        marginBottom: 30,
    },
});

export default RenderInput;
