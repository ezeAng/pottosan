import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, Dimensions, Image } from 'react-native';
import plantImage from "../assets/plants/cu.png";

const Card = ({item, index, handleOpenModal}) => {
  
  return (
    <View>
      <TouchableOpacity onPress={handleOpenModal} >
      <View style={styles.card}>
      
        <Image 
          source={plantImage} // Assuming each item has an image property
          style={styles.image}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.plantName}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
    </View>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white" ,
    width: "100%" ,
    minHeight: "50%",
    height: "90%",
    borderRadius: 25,
    padding: 10,
    marginTop: 40,
    alignItems: 'center' // Center content horizontally
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%', // Make image take full width of the card
    height: '100%', // Set a fixed height for the image
    borderRadius: 5, // Optional: if you want rounded corners
    marginBottom: 0
  },
  title: {
    fontWeight: 'bold'
  },
  plantName: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "Prata-Regular"
  },
  nameContainer: {
    backgroundColor: 'white',
    width: '70%',
    height: '15%',
    alignItems: 'center', // Center content horizontally
    verticalAlign: 'center',
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    bottom: "10%"
  }
});

export default Card;