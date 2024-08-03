import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import MapView from "react-native-maps";


export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <MapView style={styles.map}
           initialRegion={{
             latitude: -22.9064,
             longitude: -47.0616,
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
