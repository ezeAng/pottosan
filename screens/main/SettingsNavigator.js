import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SettingsScreen from './SettingsScreen';

import BluetoothScreen from './SettingsSubscreens/BluetoothScreen';
import ProfileScreen from './SettingsSubscreens/ProfileScreen';
import PaymentScreen from './SettingsSubscreens/PaymentScreen';
import ConnectivityScreen from './SettingsSubscreens/ConnectivityScreen';
import QRCameraScreen from './SettingsSubscreens/QRCamera';

const Stack = createNativeStackNavigator();

const SettingsNavigator = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="SettingsScreen" >
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BluetoothScreen" component={BluetoothScreen} options={{ headerTitle:"Bluetooth" }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerTitle:"Profile" }}/>
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerTitle:"Payments" }}/>
        <Stack.Screen name="ConnectivityScreen" component={ConnectivityScreen} options={{ headerTitle:"Connectivity" }} />
        <Stack.Screen name="QRCamera" component={QRCameraScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  )
}

export default SettingsNavigator