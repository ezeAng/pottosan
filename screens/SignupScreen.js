import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Button, Pressable, TextInput } from 'react-native';
import firebase from "firebase";
import "firebase/firestore";

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

const SignupScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const back = () => {
    navigation.navigate('HomeScreen');
  }
  const handleSignUp = () => {
    // Implement sign-up logic here using Firebase
    console.log("Clicked signup");

    //Handle signup with firebase here
    firebase.firestore().collection('users')
    .where('username', '==', username)
    .get()
    .then(querySnapshot => {
      if (!querySnapshot.empty) {
        // Username already exists
        Alert.alert('Error', 'This username is already taken.');
        return; // Stop the function here
      }
    });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created, now add username and other details to Firestore
        const user = userCredential.user;
        firebase.firestore().collection('users').doc(user.uid).set({
          username: username,
          email: email
          // add other user details as needed
        })
        .then(() => {
          console.log('User added to Firestore');
          navigation.navigate('HomeScreen');
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/email-already-in-use') {
          Alert.alert('Error', 'This email address is already in use.');
        } else if (errorCode == 'auth/invalid-email') {
          Alert.alert('Error', 'This email address is not valid.');
        } else if (errorCode == 'auth/weak-password') {
          Alert.alert('Error', 'The password is too weak.');
        } else {
          Alert.alert('Error', errorMessage);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up for a new account.</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={email}
        placeholder="Enter a username"
        keyboardType="email-address"
      />
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
      <Text>Terms and conditions checkbox here. TODO</Text>

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>Back</Text>
      </Pressable>
      <Pressable style={styles.button_signup} onPress={handleSignUp}>
        <Text style={styles.text}>Signup</Text>
      </Pressable>
      
    </View>
  )
}

export default SignupScreen