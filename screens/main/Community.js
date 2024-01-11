import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, RefreshControl, TouchableOpacity } from 'react-native';
import { globalStyles } from '../GlobalStyles';
//Test data
const blogPosts = [
  { id: '1', title: 'Gardening for retirees.', imageUrl: 'https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2023/03/1140-woman-gardening.jpg' },
  { id: '2', title: 'See our new garden!', imageUrl: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2021/12/featured-image-gardening-landscaping.jpeg-1.jpg' },
  { id: '3', title: 'How to set up your garden', imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/gardening-for-beginners-64cc02535cfa0.jpg' },
  { id: '4', title: 'Recipes for your organic vegetables!', imageUrl: 'https://www.telegraph.co.uk/content/dam/gardening/2020/07/17/TELEMMGLPICT000234995338_trans_NvBQzQNjv4Bq8juO8C_Vdx2cT20LARTibjWU-KwRaHvlaJXY1texVLQ.jpeg?imwidth=480' },
  // Add more blog posts here
];


const Community = () => {
  const [posts, setPosts] = useState(blogPosts);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // In a real app, fetch new data from the backend here
    // For now, we'll just simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
      setPosts([...blogPosts]); // Replace with new data
    }, 2000);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>See what others are doing!</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: globalStyles.BackgroundPrimary,
  },
  header: {
    fontFamily: 'Prata-Regular',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: globalStyles.CardBrown,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    color: "white",
    padding: 16,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: "Prata-Regular"
  },
});

export default Community;
