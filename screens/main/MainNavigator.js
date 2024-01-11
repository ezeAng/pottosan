import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Route, useRoute } from '@react-navigation/native';
import MainScreen from './MainScreen';
import SettingsNavigator from './SettingsNavigator';
import Community from './Community';
import Shop from './Shop';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles } from '../GlobalStyles';
const Tab = createBottomTabNavigator();

const MainNavigator = ({navigation}) => {
  const route = useRoute();
  const {username} = route.params;
  return (
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor: globalStyles.PrimaryDark, // Color of the icon when the tab is active
      tabBarInactiveTintColor: globalStyles.Accent, // Color of the icon when the tab is inactive
      
    }}>
      
      <Tab.Screen name="Garden" initialParams={{ username: username }} component={MainScreen} options={{
        headerShown: false,
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size}) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        )
      }}  />
      <Tab.Screen name="Community" component={Community} 
        options={{
          tabBarIcon: ({ color, size}) => (
            <MaterialCommunityIcons name="greenhouse" color={color} size={size} />
          )
        }} />
      {/* <Tab.Screen name="Shop" component={Shop} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" color={color} size={size} />
          )
        }} /> */}
      <Tab.Screen name="Settings" component={SettingsNavigator} options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="cog" color={color} size={size} />
        )
      }} />
    </Tab.Navigator>
  )
}

export default MainNavigator