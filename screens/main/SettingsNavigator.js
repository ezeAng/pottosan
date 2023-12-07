import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Bluetooth from './BluetoothScreen';
import SettingsScreen from './SettingsScreen';
import ConnectivityScreen from './ConnectivityScreen';
import QRCamera from './QRCamera';

const Stack = createNativeStackNavigator();

const SettingsNavigator = ({navigation}) => {
  return (
      <Stack.Navigator initialRouteName="SettingsScreen">
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BluetoothScreen" component={Bluetooth} />
        <Stack.Screen name="ConnectivityScreen" component={ConnectivityScreen} />
        <Stack.Screen name="QRCamera" component={QRCamera} />
      </Stack.Navigator>
  )
}

export default SettingsNavigator