import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput ,Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/places-actions';

import ImgPicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {

    const [titleValue, setTitleValue] = useState('');
    const [selectedImage, setSelectedImage] = useState();

    const dispatch = useDispatch();

    const titleChangeHandler = (text) => {
        setTitleValue(text);
    }

    const savePlacehandler = () => {
            dispatch(placesActions.addPlace(titleValue, selectedImage));
            props.navigation.goBack();
    }

    const imageTakenHandler = imagePath => {
        setSelectedImage(imagePath);
    }

    return (<ScrollView>
        <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput style={styles.textInput} onChangeText={titleChangeHandler} value={titleValue} />
            <ImgPicker onImageTaken={imageTakenHandler} />
            <LocationPicker />
            <Button
                title="Go to PlaceDetail"
                onPress={savePlacehandler}
            />
        </View>
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
})

export default NewPlaceScreen;