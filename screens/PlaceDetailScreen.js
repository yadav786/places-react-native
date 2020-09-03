import React, { useLayoutEffect } from 'react';
import { View, Text, Button ,StyleSheet } from 'react-native';

const PlaceDetailScreen = (props) => {

  const { navigation } = props;
  const { route: { params: { placeTitle } } } = props;
  useLayoutEffect(()=> {
      navigation.setOptions({
          headerTitle: placeTitle
      })
  },[navigation]);

  return <View style={styles.screen}><Text>Place Detail Screen!</Text>
    <Button
      title="Map"
      onPress={() => props.navigation.navigate('PlaceLists')}
      />
  </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PlaceDetailScreen;