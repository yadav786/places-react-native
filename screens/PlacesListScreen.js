import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { CustomHeaderButton } from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

import * as placeActions from '../store/places-actions';

const PlacesListScreen = (props) => {

  const { navigation } = props;
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(placeActions.loadPlaces())
  }, [dispatch]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item  
          title="Add Place" 
          iconName="md-add"
          style={styles.headerRight}
          onPress={() => navigation.navigate('NewPlaces')}
        />
        </HeaderButtons>)
    });
  }, [navigation]);

        return <FlatList data={places} keyExtractor={(item) => item.id} renderItem={itemData => (
           <PlaceItem 
            image={itemData.item.imageUri} 
            title={itemData.item.title} 
            address={itemData.item.address}
            latitude={itemData.item.latitude}
            longitude={itemData.item.longitude} 
            onSelect={() => props.navigation.navigate('PlaceDetail', {
             placeTitle: itemData.item.title,
             placeid: itemData.item.id,
           }) } />
        )} />
}



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerRight: {
      backgroundColor: '#fff'
    }
})

export default PlacesListScreen;