import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Modal, Pressable, Dimensions } from 'react-native';
import { ref, set, update, onValue } from "firebase/database";
import { db } from '../../config';
import Card from '../../components/Card';
// import Carousel from 'react-native-reanimated-carousel';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccef',
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    });
  }

  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      {/* {currData ? <Carousel
        data={currData}
        onSnapToItem={onSnapItem}
        renderItem={Card}
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth - 60} // Adjust item width here
        itemHeight={viewportHeight - 60}
      /> : <Text>No Plants added! Go to settings and add plants!</Text>} */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Text style={styles.title}>Name: {currentViewItem.name}</Text>
            <Text style={styles.title}>Light Reading: {currentViewItem.light}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MainScreen