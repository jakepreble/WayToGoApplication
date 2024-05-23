import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
const { width, height } = Dimensions.get('window');


var arrow = "left arrow";
var distanceToTurn = "650 feet";
var turn = "15 dutch hill rd";
var students = "7/16";
var arrivalTime = "8:07";

function NavigationScreen(){
    const [location, setLocation] = useState({})
    useEffect(() => {
      (async() => {
  
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status == 'granted'){
          console.log('Permission granted!')
        } else {
          console.log('Permision denied!')
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      })();
    }, []);
  
    let lat = location.latitude
    let lon = location.longitude
    return (
      console.log(lat),
      <View style={styles.container}>
        <View style={styles.topbox}>
        
        </View>
        <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 41.049112,
          longitude: -73.953970,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}>
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lon,
          }}>
            <View style={styles.radius}>
              <View style={styles.marker}/>
            </View>
            </Marker>
            </MapView>
            
            <View style={styles.topBox}>
              <Text style={styles.arrow}>{arrow}</Text>
              <Text style={styles.distanceToTurn}>{distanceToTurn}</Text>
              <Text style={styles.turn}>{turn}</Text>
            </View>
              
            <View style={styles.bottomBox}>
              <Text style={styles.arrivalTime}>{arrivalTime}</Text>
              <Text style={styles.students}>{students} students</Text>
            </View>
      </View>
        
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    arrow: {
      padding: 10
    },
    distanceToTurn: {
      color: 'black',
      textAlign: 'center',
      fontSize: 20,
    },
    turn: {
      color: 'blue',
      textAlign: 'center',
    },
    students: {

    },
    arrivalTime: {

    },
    map: {
      ...StyleSheet.absoluteFillObject,
      position: 'absolute',
  
    },
    topBox: {
      position: 'absolute',
      top: 0,
      width: width,
      height: 100,
      backgroundColor: 'white',
      //justifyContent: 'center',
      //alignItems: 'center',
    },
    subTopBox: {
      position: 'absolute',
      top: 0,
      width: width,
      height: 150,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomBox: {
      position: 'absolute',
      bottom: 0,
      width: width,
      height: 100,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    radius: {
      height: 50,
      width: 50,
      borderRadius: 50 / 2,
      overflow: 'hidden',
      backgroundColor: 'rgba(0,122,255, 0.1)',
      borderWidth: 1,
      borderColor: 'rgba(0, 112, 255, 0.3)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    marker: {
      height: 20,
      width: 20,
      borderWidth: 3,
      borderColor: 'white',
      borderRadius: 20/2,
      overflow: 'hidden',
      backgroundColor: '#007AFF',
    },
  });

export default NavigationScreen;