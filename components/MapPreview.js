import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';

import getEnvVariables from '../env';

const MapPreview = props => {
        
        let imagePreviewUrl = '';
        if(props.location){
        
            imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.lat},${props.location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:C%7C${props.location.lat},${props.location.lng}&key=${getEnvVariables().googleApiKey}`;

        }


        return (
            <TouchableOpacity style={[styles.mapPreview, props.style]} onPress={props.onPress}>
              {props.location ? <Image style={styles.mapImage} source={{uri: imagePreviewUrl}}/>  : props.children}
            </TouchableOpacity>    
        )

}

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        height: '100%'
    }
});

export default MapPreview;