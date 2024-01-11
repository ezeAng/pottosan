import React, { useState, useEffect } from 'react'
import { Route, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, Modal, Pressable, Dimensions, ImageBackground } from 'react-native';
import { ref, set, update, onValue } from "firebase/database";
import { db } from '../../config';
import Card from '../../components/Card';
import Carousel from 'react-native-snap-carousel';
import bgimage from '../../assets/bg.jpg'
import { globalStyles } from '../GlobalStyles';
import DashboardComponent from '../../components/Dashboard/DashboardComponent';


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
  rowtitle: {
    fontFamily: 'Prata-Regular', // Replace with your font's name
    fontSize: 20,
    marginTop: 10
  },
  medium: {
    fontFamily: 'Prata-Regular', // Replace with your font's name
    fontSize: 24,
    marginTop: 100,
    color: globalStyles.Tertiary
  },
  container: {
    height: viewportHeight, // Ensures full height
    width: viewportWidth,
    alignContent: "center",
    backgroundColor: globalStyles.BackgroundSecondary
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
    marginTop: "20%" ,
    textAlign: "center",
    width: "100%",
    color: globalStyles.Primary
  },
});

const MainScreen = () => {
  const route = useRoute();
  const { username } = route.params;
  const uuid = username;
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
    // const valuesRef = ref(db, 'users/' + uuid + '/');
    const valuesRef = ref(db, 'users/testuser1/');
    onValue(valuesRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        var resData = Object.values(data);
        console.log(resData);
        setCurrData(resData);
        setCurrentViewItem(resData[0])
      }
    });
    console.log(valuesRef);
  }

  const handleOpenModal = () => {
    setModalVisible(true)
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome to your garden, {username}</Text>
      {currData ? <Carousel
        containerCustomStyle={
          {
            maxHeight: viewportHeight * 0.25,
            maxWidth: viewportWidth,
            borderColor:"black", 
            borderWidth: 1, 
            borderStyle: "solid"}
        }
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
        itemHeight={viewportHeight * 0.2}
      /> : <Text style={styles.medium}>Looks like you dont have any plants! Go to settings and add plants!</Text>}
      
      <DashboardComponent />
      
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
        onRequestClose={() => {
          setModalVisible(false);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.rowtitle}>Name: {currentViewItem.name}</Text>
            <Text style={styles.rowtitle}>Happiness: High</Text>
            <Text style={styles.rowtitle}>Overall health: High</Text>
            <Text style={styles.rowtitle}>Type of plant: Cucumber</Text>
            <Text style={styles.rowtitle}>Light Reading: {currentViewItem.light}</Text>
            <Text style={styles.rowtitle}>Soil Moisture Reading: {currentViewItem.moisture? Object.values(currentViewItem.moisture)[Object.values(currentViewItem.moisture).length -1] : "None"}</Text>
            <Text style={styles.rowtitle}>Temperature Reading: {currentViewItem.temperature? Object.values(currentViewItem.temperature)[Object.values(currentViewItem.temperature).length -1] : "None"}</Text>
            <Text style={styles.rowtitle}>Nutrient Reading: All present</Text>
            <Button title='Close' onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MainScreen