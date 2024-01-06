import { useEffect, useState, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';



const PaymentScreen = ({navigation, route}) => {
  

  return (
    <View style={styles.container}>
      <Text>Payment Details</Text>
      <Text>
        Email
      </Text>
      <Text>
        Billing Address
      </Text>
      <Text>
        Contact Number:
      </Text>
      <Text>
        Payment Methods : Apple Pay, Add card etc
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

export default PaymentScreen;