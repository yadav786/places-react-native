import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

import MapPreview from "./MapPreview";

const LocationPicker = props => {
    
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();


    console.log(props.route.params.pickedLocation);

    const mapPickedLocation = props.route.params.pickedLocation;

    useEffect(()=>{
        if(mapPickedLocation){
            setPickedLocation(mapPickedLocation);
            props.onLocationPicked(mapPickedLocation);
        }
    }, [mapPickedLocation, props.onLocationPicked]);


    const verifyPermissions = async() => {
        const result = await Location.requestPermissionsAsync(); //  Permissions.CAMERA_ROLL
        if(result.status !== 'granted'){
            Alert.alert('Insufficient Permissions', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    }

    const getLocationHandler = async() => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }
        try {
        setIsFetching(true);
        const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
        setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude});
        props.onLocationPicked({ lat: location.coords.latitude, lng: location.coords.longitude});
        }
        catch(err){
            Alert.alert('Location not Found', [{ text: 'Okay' }]);
            throw err;
        }
        setIsFetching(false);
    }

    const pickOnMapHandler = async() => {
        props.navigation.navigate('Map');
    }

    return <View style={styles.locationPicker}>
        <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={pickOnMapHandler} >
            <View style={styles.mapPreview}>
                { isFetching ? <ActivityIndicator size='large' color={Colors.primary} /> : <Text>No Location Chosen Yet!</Text>}
            </View>
        </MapPreview>
        <View style={styles.action}>
           <Button title="Get User Location" color={Colors.primary} onPress={getLocationHandler}/>
           <Button title="Pick on Map" color={Colors.primary} onPress={pickOnMapHandler}/>
        </View>
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
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
});


export default LocationPicker;