import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Modal, Pressable, Dimensions, ImageBackground } from 'react-native';
import { ref, set, update, onValue } from "firebase/database";
import { db } from '../../config';
import Card from '../../components/Card';
import Carousel from 'react-native-snap-carousel';
import bgimage from '../../assets/bg.jpg'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1, // Make sure it covers the whole screen
    width: null, // Ensures full width
    height: null, // Ensures full height
  },
  title: {
    fontFamily: 'Prata-Regular', // Replace with your font's name
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logo: {
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 50, // Half of width/height to make it perfectly round
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: viewportWidth ,
    height: viewportHeight * 0.75,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: "Prata-Regular",
    marginTop: 90,
    textAlign: "center"
  },
});

const MainScreen = () => {
  const uuid = "testuser1";
  const [modalVisible, setModalVisible] = useState(false);
  const [currData, setCurrData] = useState(null);
  const [currentViewItem, setCurrentViewItem] = useState(0);

  useEffect(()=> {
    readData();
    
  }, [])

  const onSnapItem = (index) => {
    console.log(index);
    setCurrentViewItem(currData[index]);
  }


  const readData = () => {

    const valuesRef = ref(db, 'users/' + uuid + '/');
    onValue(valuesRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      var resData = Object.values(data);
      setCurrData(resData);
      if (resData) {
        setCurrentViewItem(resData[0])
      }
    });
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  

  return (
    <ImageBackground
      source={bgimage} // Replace with your image URL
      resizeMode="cover" // or "contain" based on your need
      style={styles.imageBackground}>
      <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome to your garden</Text>
      {currData ? <Carousel
        data={currData}
        onSnapToItem={onSnapItem}
        renderItem={({item, index}) => (
          <Card 
            item={item} 
            index={index} 
            handleOpenModal={handleOpenModal}
          />
        )}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth - 60} // Adjust item width here
        itemHeight={viewportHeight - 60}
      /> : <Text>No Plants added! Go to settings and add plants!</Text>}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
        onRequestClose={() => {
          setModalVisible(false);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>Name: {currentViewItem.name}</Text>
            <Text style={styles.title}>Happiness: High</Text>
            <Text style={styles.title}>Overall health: High</Text>
            <Text style={styles.title}>Type of plant: cucumber</Text>
            <Text style={styles.title}>Light Reading: {currentViewItem.light}</Text>
            <Text style={styles.title}>Soil Moisture Reading: 10</Text>
            <Text style={styles.title}>Temperature Reading: 32</Text>
            <Text style={styles.title}>Nutrient Reading: All present</Text>
            <Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  )
}

export default MainScreen