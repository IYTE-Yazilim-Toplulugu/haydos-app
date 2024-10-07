import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import InfoCard from '../components/InfoCard';
import ActivityFeed from '../components/ActiviyData';
import SearchBar from '../components/SearchBar';

const Profile = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <InfoCard />
        <View style={styles.whiteArea}>
          <ActivityFeed />
          <SearchBar />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D9F56',
  },
  whiteArea: {
    flex: 1,
    backgroundColor: '#ECEEE5',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -20,
    paddingTop: 20,
  },
});

export default Profile;