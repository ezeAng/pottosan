import React, {useState} from 'react'
import { ActivityIndicator, StyleSheet, Text, View, Image, KeyboardAvoidingView, Pressable, TextInput } from 'react-native';
import logoImage from '../assets/Gardening-bro.png';
import { FIREBASE_AUTH } from '../config';
import { FIREBASE_STORE } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Spinner from 'react-native-spinkit';
import { doc, getDoc } from 'firebase/firestore';
import { globalStyles, standardText, standardInput } from './GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.BackgroundPrimary,
  },
  logo: {
    width: "100%", // Adjust width as needed
    height: "40%", // Adjust height as needed
    borderRadius: 50, // Half of width/height to make it perfectly round
    position: "absolute",
    top: 10
  },
  inputContainer: {
    alignItems: 'center', // Center the input fields horizontally
  },
  input: standardInput,
  buttonContainer: {
    flexDirection: 'row', // Make the buttons horizontal
    marginTop: "10%",
    width: '80%', // Ensure buttons take full width
    justifyContent: 'space-between', // Add space between buttons
  },
  button: {
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    elevation: 3,
  },
  button_login: {
    backgroundColor: globalStyles.PrimaryBright,
    marginRight: 10, // Add some spacing between buttons
  },
  button_signup: {
    backgroundColor: globalStyles.Tertiary,
    marginLeft: 10, // Add some spacing between buttons
  },
  title: {
    fontFamily: 'Prata-Regular',
    fontSize: 64,
    marginTop: 50
  },
  text: standardText,
  none: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }

});




const HomeScreen = ({ navigation }) => {
  const auth = FIREBASE_AUTH;
  const store = FIREBASE_STORE;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState('');

  const handleSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  const handleLogin = async () => {
    setIsLoading(true)

    //Set lowercase
    setEmail(email.toLowerCase());

    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      if (response) {
        const docRef = doc(store, "userEmails", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          data = docSnap.data();
          var username = data.username;
          setIsLoading(false);
          navigation.navigate("MainNavigator", {
            screen: "MainScreen", 
            username: username
          });
        } else {
          console.log("Username does not exist");
          setIsLoading(false);
        }
        
        
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Sign in error: ' + err.message)
      alert('Sign in failed: ' + 'Email or Password Incorrect');
      setIsLoading(false);
    }
    
  }

  return (
    <View style={styles.container}>
      <Image 
        source={logoImage} // Replace with your logo URL
        style={styles.logo}
      />

      {isLoading ? <Spinner isVisible={isLoading} size={240} type={"Pulse"} color={globalStyles.PrimaryBright}/>: 
      
        <View style={styles.none}>
          <Text style={styles.title}>Pottosan.</Text>
          <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
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
          </KeyboardAvoidingView>

          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.button_login]} onPress={handleLogin}>
              <Text style={styles.text}>Login</Text>
            </Pressable>
            <Pressable style={[styles.button, styles.button_signup]} onPress={handleSignUp}>
              <Text style={styles.text}>Signup</Text>
            </Pressable>
          </View>
      </View>
      }
      

    </View>
  )
}

export default HomeScreen