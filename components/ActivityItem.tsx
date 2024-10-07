import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useFonts } from 'expo-font';

interface ActivityItemProps {
  name: string;
  action: string;
  showAddButton: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ name, action, showAddButton }) => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  const handleAddUser = () => {
    setIsAddModalVisible(true);
  };

  if (!fontsLoaded) {
    return null; // Fontlar yüklenene kadar bir şey gösterme
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="user" size={24} color="#4CAF50" />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.action}>{action}</Text>
      </View>
      {showAddButton && (
        <TouchableOpacity onPress={() => {}} style={styles.addButton}>
          <Icon name="user-plus" size={20} color="#4CAF50" style={styles.addIcon} />
        </TouchableOpacity>
      )}
      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text>Kullanıcı Ekle</Text>
          <TouchableOpacity onPress={() => setIsAddModalVisible(false)}>
            <Text>Kapat</Text>
          </TouchableOpacity>
          {/* Kullanıcı ekleme formu veya içeriği buraya gelecek */}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
    
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#333',
  },
  action: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    padding: 5,
  },
  addIcon: {
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default ActivityItem;

