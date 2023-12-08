import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity,TouchableHighlight, Pressable, TextInput } from 'react-native';
import { FIREBASE_AUTH } from '../config';
import { FIREBASE_STORE } from '../config';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import CheckBox from '@react-native-community/checkbox';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container_: {
    alignItems: 'center',
  },
  input: {
    width: 250, // Make the text inputs wider
    height: 40, // Increase the height
    marginTop: 20, // Add more margin from the top
    marginBottom: 5,
    paddingHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row', // Make the buttons horizontal
    marginTop: 20, // Add margin from the top
  },
  button: {
    width: '80%',
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 5, // Add some horizontal margin between the buttons
    backgroundColor: '#eb9e34',
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
  button_signup: {
    width: '80%',
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginHorizontal: 5, // Add some horizontal margin between the buttons
    backgroundColor: '#ffd885',
  },
});

const SignupScreen = ({ navigation }) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const store = FIREBASE_STORE;

  const back = () => {
    navigation.navigate('Home');
  }

  const handleSignup = async () => {
    if (!agreeTerms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    
    setIsLoading(true);
    try {
      const docRef = doc(store, "users", username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert("Username already exists");
        return;
      } 
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response.user.uid) {
        // Add a new document in collection
        await setDoc(doc(store, "users", username), {
          email: response.user.email,
          uid: response.user.uid,
          agreeTerms: agreeTerms
        });
        await setDoc(doc(store, "userEmails", response.user.email), {
          username: username
        });
      }
      navigation.navigate("Home")
      setIsLoading(false);
    } catch (err) {
      console.log(err)
      alert('Sign up failed: ' + err.message)
    }
  }


  return (
    <View style={styles.container}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
    <View style={{ marginTop: 22 }}>
      <View>
        <Text style={{ marginBottom: 15 }}>Terms and Conditions</Text>

        {/* Terms and conditions content here */}
        <Text>Here are the terms and conditions...</Text>

        <TouchableHighlight
          style={{ /* Your button style */ }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <Text>Hide Terms and Conditions</Text>
        </TouchableHighlight>
      </View>
    </View>
  </Modal>
    <Text style={styles.title}>Sign up for a new account.</Text>
      {isLoading ? <AnimatedProgressWheel
        size={140}
        width={20}
        color={'green'}
        backgroundColor={'grey'}
        progress={100}
        animateFromValue={0}
        duration={600}
      /> : 
      <View style={styles.container_}>
        
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter a username"
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
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <CheckBox
            value={agreeTerms}
            onValueChange={setAgreeTerms}
          />
          <Text style={{ marginLeft: 12 }}>
            I agree to the Terms and Conditions. 
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
              Read Terms and Conditions
            </Text>
          </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={back}>
            <Text style={styles.text}>Back</Text>
          </Pressable>
          <Pressable style={styles.button_signup} onPress={handleSignup}>
            <Text style={styles.text}>Signup</Text>
          </Pressable>
        </View>
      </View>}

    </View>
  )
}

export default SignupScreen