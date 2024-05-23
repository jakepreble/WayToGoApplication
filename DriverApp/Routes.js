import React, { useState } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const routes = {
    Route1: { people: 5, time: '30 mins' },
    Route2: { people: 10, time: '45 mins' },
    Route3: { people: 3, time: '20 mins' },
    Route4: { people: 8, time: '40 mins' },
  };

function RouteScreen() {
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

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
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

  export default RouteScreen;