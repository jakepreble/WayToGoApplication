import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';


const routes = {
  Route1: { people: 5, time: '30 mins' },
  Route2: { people: 10, time: '45 mins' },
  Route3: { people: 3, time: '20 mins' },
  Route4: { people: 8, time: '40 mins' },
};

function HomeScreen() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    Object.keys(routes).map(route => ({ label: route, value: route }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Route Selector</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={(value) => setSelectedRoute(value)}
        placeholder="Select a route..."
        style={styles.dropdown}
        dropDownStyle={styles.dropdown}
      />
      {selectedRoute && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Students: {routes[selectedRoute].people}
          </Text>
          <Text style={styles.infoText}>
            Estimated Driving Time: {routes[selectedRoute].time}
          </Text>
        </View>
      )}
    </View>
  );
}

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

      const loc = await Location.getCurrentPositionAsync()
      console.log(loc)
      setLocation(loc)
      
      
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
          
    </View>
      
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Navigation" component={NavigationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',

  },
  topBox: {
    width: '100%',
    height: '20%',
    backgroundColor: 'black',
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
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  dropdown: {
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    marginVertical: 4,
  },
});

registerRootComponent(App);