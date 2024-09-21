import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
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

const ActivityFeed = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  activityFeed: {
    flex: 1,
    padding: 20,
  },
});

export default ActivityFeed;