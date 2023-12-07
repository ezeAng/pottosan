import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import logoImage from '../assets/Gardening-bro.png';
import firebase from "firebase";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: "100%", // Adjust width as needed
    height: "50%", // Adjust height as needed
    borderRadius: 50, // Half of width/height to make it perfectly round
  },
  title: {
    fontFamily: 'Prata-Regular',
    fontSize: 32,
  },
  text: {
    fontFamily: 'Prata-Regular',
    fontSize: 16,
    fontWeight: "bold"
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#7fc998',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#eb9e34',
  },
});

const HomeScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    // Implement sign-up logic here using Firebase
    console.log("Clicked signup");
    navigation.navigate('MainNavigator', { screen: 'Garden' });
  };

  const handleLogin = () => {
    const email = "user@example.com"; // Get these from your input fields
    const password = "userpassword";
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user; 
        // Navigate to next screen here if needed
        navigation.navigate('MainNavigator', { screen: 'Garden' });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // Handle errors here
      });
  }

  return (
    <View style={styles.container}>
      <Image 
        source={logoImage} // Replace with your logo URL
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to pottosan!</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Login</Text>
      </Pressable>
      <Pressable style={styles.button_signup} onPress={handleSignUp}>
        <Text style={styles.text}>Signup</Text>
      </Pressable>
      
    </View>
  )
}

export default HomeScreen