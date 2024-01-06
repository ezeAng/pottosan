import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WifiManager from "react-native-wifi-reborn";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const ConnectivityScreen = ({ navigation }) => {

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const getCurrWifi = () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        if (ssid != "") {
          console.log("Your current connected wifi SSID is " + ssid)
          setCurrentConnectedSSID(ssid);
          setSsid(ssid);
        } else {
          alert("Not connected to Wifi!");
        }
        
      },
      () => {
        console.log("Cannot get current SSID!");
        alert("Cannot get current SSID. Check WIFI connection");
      }
    );
  }

  const requestLocationPermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === RESULTS.GRANTED) {
      console.log('Location permission granted');
      getCurrWifi();
    } else {
      console.log('Location permission denied');
    }
  };

  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  const [currentConnectedSSID, setCurrentConnectedSSID] = useState('')



  const saveCredentials = async () => {
    try {
      await AsyncStorage.setItem('WIFI_CREDENTIALS', JSON.stringify({ ssid, password }));
      Alert.alert("Credentials Saved", "Your WiFi credentials have been saved successfully.");
    } catch (e) {
      // saving error
      Alert.alert("Error", "Failed to save credentials.");
    }
  };

  const resetCredentials = async () => {
    try {
      await AsyncStorage.removeItem('WIFI_CREDENTIALS');
      setSsid('');
      setPassword('');
      Alert.alert("Credentials Reset", "Your WiFi credentials have been reset.");
    } catch (e) {
      // removing error
      Alert.alert("Error", "Failed to reset credentials.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connectivity Details</Text>
      <Button title='Refresh Wifi' onPress={getCurrWifi} />
      <Text>Currently connected to: {currentConnectedSSID}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSsid}
        value={ssid}
        placeholder="Enter SSID"
      />
      
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter Password"
        secureTextEntry
      />

      <Button
        title="Save Credentials"
        onPress={saveCredentials}
      />

      <Button
        title="Reset Credentials"
        onPress={resetCredentials}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  }
});

export default ConnectivityScreen;
