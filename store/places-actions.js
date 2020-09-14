
import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE'

import { insertPlace, fetchPlaces } from '../helpers/db';
import getEnvVariables from '../env';

export const addPlace = (title, image, location) => {
    return async dispatch => {
    
       const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${getEnvVariables().googleApiKey}`);
       
       if(!response.ok){
           throw new Error('Something went wrong!');
       }
       
       const respData = await response.json();
       if(!respData.results){
        throw new Error('Something went wrong!');
       }
       const address = respData.results[0].formatted_address;
    
       const fileName = image.split('/').pop();
       const newPath = FileSystem.documentDirectory + fileName;// save till uninstalled
        try{
        
            await FileSystem.moveAsync({
            from: image,
            to: newPath
        });
        const dbResult = await insertPlace(title, image, address, location.lat, location.lng);
       }
       catch(err) {
            console.log(err);
            throw err;
       }
        dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId,  title: title, image: newPath, address, coords: { lat: location.lat, lng: location.lng }} });
    }
}

export const loadPlaces = () => {
        return async dispatch => {
            try {
            const dbResult = await fetchPlaces();
            console.log('dbResult', dbResult);
            dispatch({type:SET_PLACE, places: dbResult.rows});
            }
            catch(err){
                throw err;
            }

        }
}