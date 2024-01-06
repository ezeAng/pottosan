import { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';



const ProfileScreen = ({navigation, route}) => {
  

  return (
    <View style={styles.container}>
      <Text>Profile Details</Text>
      <Text>Profile Picture</Text>
      <Text>
        Username
      </Text>
      <Text>
        Email
      </Text>
      <Text>
        Address
      </Text>
      <Text>
        Contact Number:
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  }
});

export default ProfileScreen;