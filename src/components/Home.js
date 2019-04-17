import React from 'react';
import { Button } from 'react-native-elements';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends React.Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    icon={<Icon name="barcode" size={15} color="white" />}
                    title=" Escanear código"
                    onPress={() =>
                        this.props.navigation.navigate('BarcodeScanner')
                    }
                />
            </View>
        );
    }
}

export default Home;
