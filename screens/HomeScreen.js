import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Pressable, TextInput } from 'react-native';
import logoImage from '../assets/Gardening-bro.png';
import { FIREBASE_AUTH } from '../config';
import { FIREBASE_STORE } from '../config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AnimatedProgressWheel from 'react-native-progress-wheel';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: "100%", // Adjust width as needed
    height: "40%", // Adjust height as needed
    borderRadius: 50, // Half of width/height to make it perfectly round
    position: "absolute",
    top: 0
  },
  inputContainer: {
    width: '100%', // Make the input container wider
    alignItems: 'center', // Center the input fields horizontally
  },
  input: {
    width: 300, // Make the text inputs wider
    height: 40, // Increase the height
    marginTop: 20,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row', // Make the buttons horizontal
    marginTop: 60,
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
    backgroundColor: '#7fc998',
    marginRight: 10, // Add some spacing between buttons
  },
  button_signup: {
    backgroundColor: '#eb9e34',
    marginLeft: 10, // Add some spacing between buttons
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
  none: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

const HomeScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState('');
  const auth = FIREBASE_AUTH;
  const store = FIREBASE_STORE;
  

  const handleSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  const handleLogin = async () => {
    setIsLoading(true)

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
          console.log("No such document!");
        }
        
        
      }
    } catch (err) {
      console.log(err)
      alert('Sign in failed: ' + err.message)
    }
    
  }

  return (
    <View style={styles.container}>

      <Image 
        source={logoImage} // Replace with your logo URL
        style={styles.logo}
      />
      {isLoading ? <AnimatedProgressWheel
        size={140}
        width={20}
        color={'green'}
        backgroundColor={'grey'}
        progress={100}
        animateFromValue={0}
        duration={600}
      /> : 
      
        <View style={styles.none}>
          <Text style={styles.title}>Welcome to pottosan!</Text>
          <KeyboardAvoidingView behavior='padding' style={styles.inputContainer}>
            <View >
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
            </View>
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