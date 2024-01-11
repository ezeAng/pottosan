import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Modal, TouchableOpacity, Dimensions, Image } from 'react-native';
import plantImage from "../assets/plants/aloeveraBack.png";
import plantImage2 from "../assets/plants/rosemaryBack.png";
import { globalStyles } from '../screens/GlobalStyles';

const Card = ({item, index, handleOpenModal}) => {
  // Remove when development finish
  var imgSrc = index % 2 == 0 ? plantImage : plantImage2; 
  return (
    <View>
      <TouchableOpacity disabled={true} onPress={handleOpenModal} >
      <View style={styles.card}>
        <Image 
          source={imgSrc} // Assuming each item has an image property
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
    minHeight: "90%",
    borderRadius: 25,
    padding: 0,
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center', // Center content horizontally
    overflow: "visible"
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%', // Make image take full width of the card
    height: '100%', // Set a fixed height for the image
    borderRadius: 5, // Optional: if you want rounded corners
    marginBottom: 0,
    zIndex: 3,
    transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }]
  },
  title: {
    fontWeight: 'bold'
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: "Prata-Regular",
    margin: 1
  },
  nameContainer: {
    backgroundColor: 'white',
    minWidth: '50%',
    maxWidth: 'auto',
    height: 'auto',
    alignItems: 'center', // Center content horizontally
    verticalAlign: 'center',
    borderRadius: 20,
    padding: 10,
  }
});

export default Card;