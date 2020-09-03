import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

const LocationPicker = props => {
    
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();


    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.Location); //  Permissions.CAMERA_ROLL
        if(result.status !== 'granted'){
            Alert.alert('Insufficient Permissions', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    }

    const getLocationHandler = () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        try {
        setIsFetching(true);
        const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
        setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude});
        }
        catch(err){
            Alert.alert('Location not Found', [{ text: 'Okay' }]);
            throw err;
        }
        setIsFetching(false);
    }

    return <View style={styles.locationPicker}>
        <View style={styles.mapPreview}>
            { isFetching ? <ActivityIndicator size='large' color={Colors.primary} /> : <Text>No Location Chosen Yet!</Text>}
        </View>
        <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler}/>
    </View>
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        color: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default LocationPicker;