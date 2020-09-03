import React from 'react';
import { View, Text, Button ,StyleSheet } from 'react-native';

const MapScreen = (props) => {
        return <View style={styles.screen}><Text>MapScreen!</Text>
          <Button
            title="Go to Top"
            onPress={() => props.navigation.popToTop()}
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

export default MapScreen;