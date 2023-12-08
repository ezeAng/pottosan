import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';

function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    // logout();
    navigation.navigate('Home');
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('BluetoothScreen')}>
        <Text>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('BluetoothScreen')}>
        <Text>Bluetooth</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.item}
        onPress={() => navigation.navigate('ConnectivityScreen')}>
        <Text>Connectivity</Text>
      </TouchableOpacity>
      {/* Repeat for other settings */}
      <Button 
        title='Logout' 
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default SettingsScreen;
