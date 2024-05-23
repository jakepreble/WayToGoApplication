import { registerRootComponent } from 'expo';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import NavigationScreen from './Navigation';
import RouteScreen from './Routes';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Routes" component={RouteScreen} />
        <Tab.Screen name="Navigation" component={NavigationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
    
  );
}

registerRootComponent(App);