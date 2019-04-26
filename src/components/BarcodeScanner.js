import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { withNavigation } from 'react-navigation';

class BarcodeScanner extends Component {
    barcodeDetected = false; //ToDo: evaluate to move this flag to state
    barcodeDetectedHandler = this.props.navigation.getParam('onScanBarcode');

    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={
                        'We need your permission to use your camera phone'
                    }
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(
                            'BarcodeScanner BARCODE DETECTED',
                            barcodes[0]
                        );

                        // callback function
                        if (!this.barcodeDetected) {
                            //prevent multiple callback calls
                            this.barcodeDetected = true;

                            // prevent callback multiple
                            this.barcodeDetectedHandler(barcodes[0].data);

                            // goBack
                            const goBack = this.props.navigation.getParam(
                                'goBack'
                            );

                            if (goBack) {
                                this.props.navigation.goBack();
                            }
                        }
                    }}
                />
                <View
                    style={{
                        flex: 0,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    {/*
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style={styles.capture}
                    >
                        <Text style={{ fontSize: 14 }}> Capturar Imagen </Text>
                    </TouchableOpacity>
                    */}
                </View>
            </View>
        );
    }

    takePicture = async function() {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default withNavigation(BarcodeScanner);
