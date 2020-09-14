import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

const MapScreen = props => {
  
        const { navigation, route } = props;
        const initialLocation = route.params.initialLocation;
        const readOnly = route.params.readOnly;
        const [selectedLocation, setSelectedLocation] = useState(initialLocation);

        const savePickerLocationHandler = () => {


           if(!selectedLocation){
              return;
           }
           // navigation.goBack();
            navigation.navigate('NewPlaces',  {pickedLocation: selectedLocation} )
        };
 
        useLayoutEffect(()=> {
          
          if(readOnly){
            return;
          }

          navigation.setOptions({
              headerRight: () => (
                <TouchableOpacity style={styles.headerButton} onPress={savePickerLocationHandler} ><Text style={styles.headerButtonText}>Save</Text></TouchableOpacity>
              )
          })
        },[navigation]);

        const mapRegion = {
          latitude: initialLocation ? initialLocation.lat: 37.78,
          longitude: initialLocation ? initialLocation.lng : -122.43,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }

        const selectLocationHandler = event => {
          Alert.alert('Insufficient Permissions', [{ text: 'Okay' }]);
          if(readOnly){
            return;
          }
          /*
          console.log(event);
          if(event){
           const { coordinate } = event;
           setSelectedLocation({lat: 37.78, lng: -122.30});
          }
          */
        }

        let markerCoordinates;

        if(selectedLocation){
          markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
          }
        }

        return <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}><Marker title="Picked Location" coordinate={markerCoordinates} ></Marker></MapView>
}

const styles = StyleSheet.create({
    map : {
        flex: 1
    },
    headerButton: {
      marginHorizontal: 20
    },  
    headerButtonText: {
      fontSize: 16,
      color: 'white'
    }
})

export default MapScreen;