import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from './MainScreen';
import SettingsNavigator from './SettingsNavigator';
import Community from './Community';
import Shop from './Shop';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{
      activeTintColor: 'darkgreen', // Color of the icon when the tab is active
      inactiveTintColor: 'gray', // Color of the icon when the tab is inactive
    }}>
      
      <Tab.Screen name="Garden" component={MainScreen} options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size, focused }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }}  />
      <Tab.Screen name="Community" component={Community} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="greenhouse" color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Shop" component={Shop} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          )
        }} />
      <Tab.Screen name="Settings" component={SettingsNavigator} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default MainNavigator