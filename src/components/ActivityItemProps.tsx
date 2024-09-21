import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface ActivityItemProps {
  name: string;
  action: string;
  showAddButton: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ name, action, showAddButton }) => (
  <View style={styles.activityItem}>
    <Image
      source={require('../assets/picture.png')}
      style={styles.activityImage}
    />
    <View style={styles.activityContent}>
      <Text style={styles.activityName}>{name}</Text>
      <Text style={styles.activityAction}>{action}</Text>
    </View>
    {showAddButton && (
      <Icon name="user-plus" size={20} color="#4CAF50" style={styles.addIcon} />
    )}
  </View>
);

const styles = StyleSheet.create({
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  activityImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontWeight: 'bold',
  },
  activityAction: {
    color: '#666',
  },
  addIcon: {
    marginLeft: 10,
  },
});

export default ActivityItem;