
import * as FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACE = 'SET_PLACE'

import { insertPlace, fetchPlaces } from '../helpers/db';

export const addPlace = (title, image) => {
    return async dispatch => {
       const fileName = image.split('/').pop();
       const newPath = FileSystem.documentDirectory + fileName;// save till uninstalled
        try{
        
            await FileSystem.moveAsync({
            from: image,
            to: newPath
        });
        const dbResult = await insertPlace(title, image, 'Mumbai Address', 19.07, 72.87);
       }
       catch(err) {
            console.log(err);
            throw err;
       }
        dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId,  title: title, image: newPath } });
    }
}

export const loadPlaces = () => {
        return dispatch => {
            try {
            const dbResult = await fetchPlaces();
            dispatch({type:SET_PLACE, places: dbResult.rows._array});
            }
            catch(err){
                throw err;
            }

        }
}