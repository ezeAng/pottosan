import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import logoImage from '../assets/pottosan_logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 50, // Half of width/height to make it perfectly round
  },
});

const HomeScreen = ({ navigation }) => {

  const handleLogin = () => {
    navigation.navigate('MainNavigator', {
      screen: 'Main'
    });
  }

  return (
    <View style={styles.container}>
      <Image 
        source={logoImage} // Replace with your logo URL
        style={styles.logo}
      />
      <Text>Welcome to pottosan!</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

export default HomeScreen