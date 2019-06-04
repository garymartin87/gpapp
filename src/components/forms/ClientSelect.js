import { StyleSheet, Text, View } from 'react-native';
import { Option, Select } from 'react-native-select-lists';
import React, { useState } from 'react';

const renderClientSelectOptions = clients => {
    let options = clients.map((client, index) => {
        return (
            <Option key={index + 1} value={client.code}>
                {client.name}
            </Option>
        );
    });

    options.unshift(
        <Option key={0} value={0}>
            - Seleccione un cliente -
        </Option>
    );

    return options;
};

const ClientSelect = ({
    input: { value, onChange },
    meta: { error, warning },
    clients,
}) => {
    const [touched, setTouched] = useState(false);

    return (
        <View>
            <Select
                caret="down"
                caretSize={10}
                caretColor="#86939e"
                selectStyle={styles.select}
                listHeight={300}
                listStyle={styles.selectList}
                onSelect={value => {
                    setTouched(true);
                    onChange(value);
                }}
            >
                {renderClientSelectOptions(clients)}
            </Select>

            <View style={styles.inputError}>
                {touched &&
                    ((error && (
                        <Text style={styles.inputErrorText}>{error}</Text>
                    )) ||
                        (warning && (
                            <Text style={styles.inputErrorText}>{warning}</Text>
                        )))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputErrorText: {
        color: '#c71818',
    },
    inputError: {
        marginTop: 5,
        marginLeft: 15,
    },
    select: {
        marginLeft: 15,
        marginRight: 10,
    },
    selectList: {
        zIndex: 999,
        position: 'absolute',
    },
});

export default ClientSelect;
