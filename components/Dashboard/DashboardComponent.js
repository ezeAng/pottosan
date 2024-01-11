import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardSize = width / 2 - 30; // Adjust size as needed

const DashboardComponent = () => {
  return (
    <View style={styles.container}>
      {/* Example of a single status card */}
      <View style={styles.card}>
        <Text>Status 1</Text>
        {/* Add your icon or value component here */}
      </View>

      {/* Repeat for other status cards */}
      {/* ... */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'transparent', // Adjust as needed
  },
  card: {
    width: cardSize,
    height: cardSize,
    borderRadius: 15, // Adjust for rounded edges
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Adjust as needed
    margin: 5,
    // Add shadow or other styling as needed
  },
});

export default DashboardComponent;
