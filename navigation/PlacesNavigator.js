import React from 'react';
import { Button } from  'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlacesListScreen from '../screens/PlacesListScreen';

import Colors from '../constants/Colors';

const Stack = createStackNavigator();

const PlacesNavigator = () => {
    
    return <NavigationContainer>
        <Stack.Navigator initialRouteName="PlaceLists"  
            screenOptions={{
                headerTitle: 'New Places',
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: () => (
                    <Button
                      onPress={() => alert('This is a button!')}
                      title="Info"
                      color="#000"
                    />
                  ),
            }}>
            <Stack.Screen 
            name="NewPlaces" 
            component={NewPlaceScreen}
            options={{ headerTitle: 'New Places'}}
            />
            <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} options={{ headerTitle: 'Place Detail'}}/>
            <Stack.Screen name="PlaceLists" component={PlacesListScreen} options={{ headerTitle: 'Place List'}}/>
            <Stack.Screen name="Map" component={MapScreen} options={{ headerTitle: 'Map'}}/>
        </Stack.Navigator>
    </NavigationContainer>
}

export default PlacesNavigator;