import { StatusBar } from 'expo-status-bar';
import React, {Component, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Platform, PermissionsAndroid, Dimensions} from 'react-native';
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

const {width, height} = Dimensions.get('screen');

export default function App() {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // console.log("latitude: ", location.coords.latitude)
      // console.log("latitude: ", location.coords.longitude)
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    })();
  }, [])

  function newMarker(e) {
    // console.log(e.nativeEvent.coordinate.latitude)
    let dados = {
      key: markers.length,
      coords: {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      },
      pinColor: '#FF0000',
    }

    setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })

    setMarkers(oldArray => [...oldArray, dados])
  }

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
       region={region}
       zoomEnabled={true}
       showsUserLocation={true}
       loadingEnabled={true}
       // minZoomLevel={17}
       onPress={(event) => {
         // alert("teste")
         newMarker(event)
       }}
      >
        {markers.map(marker => {
          return(
            <Marker
              key={marker.key}
              coordinate={marker.coords}
              pinColor={marker.pinColor}
            />
          )
        })}
      </MapView>
    </View>
  );
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
