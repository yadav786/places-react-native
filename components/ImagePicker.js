import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput ,Button, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { useDispatch } from 'react-redux';
import Colors from '../constants/Colors';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL); //  
        if(result.status !== 'granted'){
            Alert.alert('Insufficient Permissions', [{ text: 'Okay' }]);
            return false;
        }
        return true;
    }

    const takeImageHandler  = async() => {
            const hasPermission = await verifyPermissions();
            if(!hasPermission){
                return;
            }
            const image = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [16, 9],
                quality: 0.5
            });
            setPickedImage(image.uri);
            props.onImageTaken(image.uri);
    }

    return <View style={styles.imagePicker}>
        <View style={styles.imagePreview} >
        { !pickedImage
        ? <Text>No image picked yet.</Text>
        : <Image style={styles.image} source={{uri: pickedImage}} />
        }
        </View>
        <Button title="Take Image" color={Colors.primary} onPress={takeImageHandler} />
    </View>
}



const styles = StyleSheet.create({
    imagePicker: {

    },
    imagePreview: {

    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default ImgPicker;