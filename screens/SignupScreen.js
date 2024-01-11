import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, Modal, TouchableOpacity,TouchableHighlight, Pressable, TextInput } from 'react-native';
import { FIREBASE_AUTH } from '../config';
import { FIREBASE_STORE } from '../config';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CheckBox from '@react-native-community/checkbox';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-spinkit';
import {globalStyles, standardInput, standardText} from './GlobalStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.BackgroundSecondary,
  },
  container_: {
    alignItems: 'center',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row', // Make the buttons horizontal
    marginTop: "10%", // Add margin from the top
  },
  button: {
    width: '80%',
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 5, // Add some horizontal margin between the buttons
    backgroundColor: globalStyles.Tertiary,
  },
  title: {
    fontFamily: 'Prata-Regular',
    fontSize: 36,
    margin: 6,
    textAlign: "center"
  },
  button_signup: {
    width: '80%',
    flex: 1, // Make both buttons take equal width
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 5, // Add some horizontal margin between the buttons
    backgroundColor: globalStyles.PrimaryBright,
  },
  closeButton: {
    backgroundColor: '#007bff', // Example color, change as needed
    paddingTop: 15 ,
    borderRadius: 12, // This will give the button rounded corners
    marginTop: "15%", // Spacing above the button
    marginBottom: "15%",
    height: 50,
    textAlignVertical: "center",
  },
  buttonText: {
    color: 'white', // Text color, change as needed
    textAlign: 'center',
    fontWeight: 'bold',
    margin: "auto"
  },
});

const SignupScreen = ({ navigation }) => {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordB, setPasswordB] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const store = FIREBASE_STORE;

  const back = () => {
    navigation.navigate('Home');
  }

  const requestClose = () => {
    setModalVisible(!modalVisible);
  }

  const showTCModal = () => {
    console.log("ShowTC");
    setModalVisible(true);
  }

  const checkPasswordMatch = () => {
    if (password != passwordB)
    {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  }

  const handleSignup = async () => {
    // Standard requirements for Signup
    if (!agreeTerms) {
      alert("Please agree to the Terms and Conditions.");
      return;
    }
    if (!checkPasswordMatch()){ return; }
    //Set lowercase
    setEmail(email.toLowerCase());
    // Attempt Signup 
    setIsLoading(true);
    try {
      const docRef = doc(store, "users", username);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        alert("Username already exists");
        setIsLoading(false);
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

      // If successfully created user
      navigation.navigate("Home")
      
    } catch (err) {
      console.log(err)
      alert('Sign up failed: Username or Email already exists');
    } finally {
      setIsLoading(false);
    }
  }

  const handleChangeEmailText = (email) => {
    //Set lowercase
    setEmail(email.toLowerCase());
  }

  return (
    <View style={styles.container}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={requestClose}
    >
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ height: '80%', backgroundColor: '#d3d3d3', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
          <Text style={{ marginBottom: 15, fontSize: 32, fontWeight: 'bold' }}>Terms and Conditions</Text>

          <ScrollView style={{ flex: 1 }}>
            <Text>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
            </Text>
          </ScrollView>

          <TouchableHighlight
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.buttonText}>Hide Terms and Conditions</Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>

    <Text style={styles.title}>Sign up for a new account.</Text>
      {isLoading ? <Spinner isVisible={isLoading} size={240} type={"Pulse"} color={globalStyles.PrimaryBright}/> : 
      <View style={styles.container_}>
        <TextInput
          style={standardInput}
          onChangeText={setUsername}
          value={username}
          placeholder="Enter a username"
        />
        <TextInput
          style={standardInput}
          onChangeText={handleChangeEmailText}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
        <TextInput
          style={standardInput}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter your password"
          secureTextEntry
        />
        <TextInput
          style={standardInput}
          onChangeText={setPasswordB}
          value={passwordB}
          placeholder="Confirm your password"
          secureTextEntry
        />
        <View style={
          { flexDirection: 'row', alignItems: 'center', marginTop: 10 }
          }>
          <CheckBox
            value={agreeTerms}
            onValueChange={setAgreeTerms}
          />
          <Text style={{ marginLeft: 12 }}>
            I agree to the Terms and Conditions. 
          </Text>
        </View>
        <TouchableOpacity onPress={showTCModal}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            Read Terms and Conditions
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={back}>
            <Text style={standardText}>Back</Text>
          </Pressable>
          <Pressable style={styles.button_signup} onPress={handleSignup}>
            <Text style={standardText}>Signup</Text>
          </Pressable>
        </View>
      </View>}
    </View>
  )
}



export default SignupScreen