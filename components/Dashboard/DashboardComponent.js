import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalStyles, dataText, dataHeaderText } from '../../screens/GlobalStyles';

const numColumns = 2;
const { width } = Dimensions.get('window');
const cardMargin = 10; // Margin for each card
const cardWidth = width / (1.5 * numColumns) - cardMargin * 2; // Width for each card
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignSelf: "center",
    alignItems: 'flex-start',
    position: 'relative',
    width: '87%',
    maxHeight:  '50%',
    backgroundColor: globalStyles.BackgroundPrimary, // Adjust as needed
    borderRadius: 30,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: cardMargin,
    minHeight: "135%"
  },
  card: {
    width: cardWidth*1.25,
    height: cardWidth, // Or adjust height as needed
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.BackgroundTertiary,
    margin: cardMargin,
    // Additional styling...
  },
  cardB: {
    width: cardWidth*1.25,
    height: cardWidth, // Or adjust height as needed
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.Accent,
    margin: cardMargin,
    // Additional styling...
  },
  cardC: {
    width: cardWidth*1.25,
    height: cardWidth, // Or adjust height as needed
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.Bright,
    margin: cardMargin,
    // Additional styling...
  },
  cardD: {
    width: cardWidth*1.25,
    height: cardWidth, // Or adjust height as needed
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.DarkAccent,
    margin: cardMargin,
    // Additional styling...
  },
  wideCard: {
    width: cardWidth * 2.5 + cardMargin * 2,
    height: cardWidth, // Or adjust height as needed
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.BackgroundSecondary,
    margin: cardMargin * 2,
    // Additional styling...
  },
  wideCardB: {
    width: cardWidth * 2.5 + cardMargin * 2,
    height: cardWidth, // Or adjust height as needed
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalStyles.Translucent,
    margin: cardMargin * 2,
    borderColor: "black",
    borderStyle: "dashed",
    borderWidth: 2
    // Additional styling...
  },
});

const DashboardComponent = ({data}) => {
  return (
    <View style={styles.container}>
      <ScrollView  contentContainerStyle={styles.scrollContainer}>


        <View style={styles.card}>
          <MaterialCommunityIcons name="white-balance-sunny" color={globalStyles.BackgroundSecondary} size={50} />
          <Text style={dataHeaderText}>Light</Text>
          <Text style={dataText}>{data.light}</Text>
        </View>
        <View style={styles.cardC}>
          <MaterialCommunityIcons name="water" color={globalStyles.Blue} size={50} />
          <Text style={dataHeaderText}>Moisture</Text>
          <Text style={dataText}>{data.moisture? Object.values(data.moisture)[Object.values(data.moisture).length -1] : "No Reading"}</Text>
          {/* Add your icon or value component here */}
        </View>
        <View style={styles.cardB}>
          <MaterialCommunityIcons name="thermometer-lines" color={globalStyles.BackgroundSecondary} size={50} />
          <Text style={dataHeaderText}>Temperature:</Text>
          <Text style={dataText}>{data.temperature? Object.values(data.temperature)[Object.values(data.temperature).length -1] : "No Reading"}</Text>
          {/* Add your icon or value component here */}
        </View>
        <View style={styles.cardD}>
          <MaterialCommunityIcons name="wifi-off" color={globalStyles.BackgroundSecondary} size={50} />
          <Text style={dataHeaderText}>Connectivity:</Text>
          <Text style={dataText}>Disconnected</Text>
          {/* Add your icon or value component here */}
        </View>

        <View style={styles.wideCardB}>
          <MaterialCommunityIcons name="plus" color={"black"} size={80} />
          <Text>Add new sensor</Text>
          {/* Add your icon or value component here */}
        </View>

      {/* ... Other cards ... */}
    </ScrollView>
    </View>
  );
};



export default DashboardComponent;
