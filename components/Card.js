import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import plantImage from "../assets/plants/tomato.png";

const Card = ({item, index}) => {
  return (
    <View style={styles.card}>
      <Image 
        source={plantImage}
        style={styles.image}
      />
      <Text style={styles.title}>Name: {item.name}</Text>
      <Text style={styles.title}>Light Reading: {item.light}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    
    minHeight: "90%",
    height: "90%",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center' // Center content horizontally
  },
  image: {
    width: '100%', // Make image take full width of the card
    height: '100%', // Set a fixed height for the image
    borderRadius: 5, // Optional: if you want rounded corners
    marginBottom: 10
  },
  title: {
    fontWeight: 'bold'
  }
});

export default Card;