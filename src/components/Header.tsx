import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';

const MAX_MOOD_DESCRIPTION_LENGTH = 50;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(require('../assets/picture.png'));
  const [moodDescription, setMoodDescription] = useState('Describe your mood to share with friends.');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Üzgünüz', 'Galeriye erişim izni gerekiyor');
      }
    })();
  }, []);

  const handleMenuPress = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage({ uri: result.assets[0].uri });
    }
  };

  const handleMoodDescriptionChange = (text: string) => {
    if (text.length <= MAX_MOOD_DESCRIPTION_LENGTH) {
      setMoodDescription(text);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={handleProfileImagePress}>
          <Image
            source={profileImage}
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <Icon name="edit-2" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Instant Mood</Text>
          <View style={styles.moodDescriptionContainer}>
            {isEditing ? (
              <TextInput
                style={styles.moodDescriptionInput}
                value={moodDescription}
                onChangeText={handleMoodDescriptionChange}
                onBlur={toggleEditing}
                autoFocus
                maxLength={MAX_MOOD_DESCRIPTION_LENGTH}
              />
            ) : (
              <Text style={styles.headerSubtitle}>{moodDescription}</Text>
            )}
          </View>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={toggleEditing} style={styles.editButton}>
            <Icon name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
            <Icon name="menu" size={24} color="#fff" style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={isMenuOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.menuModal}>
            <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={styles.closeButton}>
              <Icon name="x" size={20} color="#000" />
            </TouchableOpacity>
            <View style={styles.menuContent}>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>2</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4D9F56', //ARKA PLAN RENGİ
    paddingTop: 40,
    paddingBottom: 20,
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
  editIconContainer: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    backgroundColor: '#4D9F56',
    borderRadius: 12,
    padding: 4,
  },
  headerContent: {
    flex: 1,
    paddingRight: 10,
  },
  headerTitle: {
    fontFamily: 'InterRegular',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontFamily: 'InterRegular',
    color: '#fff',
    fontSize: 12,
  },
  menuIcon: {
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontFamily: 'InterRegular',
    color: '#fff',
    fontSize: 14,
  },
  statValue: {
    fontFamily: 'InterRegular',
    color: '#fff',
    fontSize: 50,
    fontWeight:"thin",
  },
  menuModal: {
    width: 60, 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',  // Opak beyaz arka plan
    borderRadius: 50,  
    padding: 10,  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: 60,  
    marginRight: 9,  
  },
  closeButton: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  menuContent: {
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center', 
  },
  menuItemText: {
    fontFamily: 'InterRegular',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 40,
    paddingRight: 10, 
  },
  menuButton: {
    padding: 5,
  },
  moodDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodDescriptionInput: {
    fontFamily: 'InterRegular',
    color: '#fff',
    fontSize: 12,
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    padding: 0,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 5,
    marginRight: 10,
  },

});

export default Header;