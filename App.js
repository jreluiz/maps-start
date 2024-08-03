import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView from "react-native-maps";

const {width, height} = Dimensions.get('screen');

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
         onMapReady={() => {
           Platform.OS === 'android' ?
             PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
               .then(() => {
                 console.log("Usuário aceitou!!!")
               }) : ''
         }}
         style={{width: width, height: height}}
         initialRegion={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
});
