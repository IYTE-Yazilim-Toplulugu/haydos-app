import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import ActivityItem from './ActivityItem';

const activityData = [
  {
    id: '1',
    name: "Dogukan Topçu",
    action: "I just reached 135 Paw-Score I bet @oktug can't pass me",
    showAddButton: false
  },
  {
    id: '2',
    name: "Hande Şen",
    action: 'Liked your activity "Feeding"',
    showAddButton: false
  },
  {
    id: '3',
    name: "Asude Güzel",
    action: "Wants to be friend with you",
    showAddButton: true
  },
];

const ProfileScreen = () => {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Image
              source={require('../assets/picture.png')}
              style={styles.profileImage}
            />
            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>Instant Mood</Text>
              <Text style={styles.headerSubtitle}>
                "Describe your mood to share with friends."
              </Text>
            </View>
            <Icon name="menu" size={24} color="#fff" style={styles.menuIcon} />
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Animals You Feed</Text>
              <Text style={styles.statValue}>85</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Paw-Score</Text>
              <Text style={styles.statValue}>125</Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.infoCardWrapper}>
            <View style={styles.infoCard}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>Name Surname</Text>
                <Text style={styles.infoValue}>Göktug ERÇEK</Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoLabel}>PHONE NUMBER</Text>
                <Text style={styles.infoValue}>+90 544 224 88 04</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>MAIL</Text>
                <Text style={styles.infoValue}>goktugerçek@std.iyte.edu.tr</Text>
              </View>
            </View>
          </View>
          <View style={styles.activityFeed}>
            <FlatList
              data={activityData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <ActivityItem
                  name={item.name}
                  action={item.action}
                  showAddButton={item.showAddButton}
                />
              )}
            />
          </View>
          <View style={styles.searchWrapper}>
            <Icon name="arrow-left" size={24} color="#4D9F56" style={styles.backIcon} />
            <View style={styles.searchContainer}>
              <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Friends!"
                placeholderTextColor="#888"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D9F56',
  },
  header: {
    backgroundColor: '#4D9F56',
    paddingTop: 40,
    paddingBottom: 40,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 12,
  },
  menuIcon: {
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
  },
  statValue: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  infoCardWrapper: {
    backgroundColor: '#4D9F56',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  infoCard: {
    backgroundColor: '#424242',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoColumn: {
    width: '50%',
    marginBottom: 10,
  },
  infoRow: {
    width: '100%',
    marginTop: 10,
  },
  infoLabel: {
    color: '#4D9F56',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
  activityFeed: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -20,
    padding: 20,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: -80,
  },
  backIcon: {
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
  },
});

export default ProfileScreen;