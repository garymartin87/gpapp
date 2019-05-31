import { Alert } from 'react-native';

export const alertUser = (title, message) => {
    Alert.alert(title, message);
    return {
        type: 'ALERT_USER',
        payload: title,
    };
};
