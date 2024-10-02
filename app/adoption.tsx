import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'http://192.168.1.4';

const Adoption = () => {
  const [publishedPets, setPublishedPets] = useState([
    {
      id: '1',
      petName: 'Su',
      petType: 'Van Kedisi',
      description:
        'Beyaz tüylü, kehribar-turkuaz gözlü, 2 yaşında dişi kedi. Son görüldüğü yer: Dünya Güzellik Yarışması 1.lik Standı',
      contactInfo: 'İletişim: 0532 065 6565',
      imageUrl:
        'https://trthaberstatic.cdn.wp.trt.com.tr/resimler/1132000/1133193.jpg',
    },
  ]);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [description, setDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [image, setImage] = useState(null);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [isPetModalVisible, setIsPetModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 2;
  const [selectedPet, setSelectedPet] = useState(null);

  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        'Permission Required',
        'You need to allow permission to access the photo library.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!petName || !petType || !description || !contactInfo || !image) {
      Alert.alert('Error', 'Please fill out all fields and upload a photo.');
      return;
    }

    const formData = new FormData();
    formData.append('petName', petName);
    formData.append('petType', petType);
    formData.append('description', description);
    formData.append('contactInfo', contactInfo);

    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    formData.append('image', {
      uri: image,
      name: filename,
      type,
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/api/adoptionrequests`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        Alert.alert('Success', 'The adoption request has been submitted.');
        setPetName('');
        setPetType('');
        setDescription('');
        setContactInfo('');
        setImage(null);
        setIsReportModalVisible(false);

        const petsResponse = await axios.get(`${API_BASE_URL}/api/adoptions`);
        setPublishedPets(petsResponse.data);
      } else {
        Alert.alert('Error', 'Your request could not be submitted. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred.');
    }
  };

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = publishedPets.slice(indexOfFirstPet, indexOfLastPet);

  const nextPage = () => {
    if (currentPage * petsPerPage < publishedPets.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedPet(item);
        setIsPetModalVisible(true);
      }}
    >
      <View style={styles.petCard}>
        <Image source={{ uri: item.imageUrl }} style={styles.petImage} />
        <View style={styles.needHomeOverlay}>
          <Text style={styles.needHomeText}>Need home</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const PetDetailModal = ({ pet, isVisible, onClose }) => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: pet.imageUrl }} style={styles.modalImage} />
          <Text style={styles.modalName}>{pet.petName}</Text>
          <Text style={styles.modalType}>{pet.petType}</Text>
          <Text style={styles.modalDescription}>{pet.description}</Text>
          <Text style={styles.modalContactInfo}>{pet.contactInfo}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <ImageBackground
      source={require('../assets/images/missingsbackground.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Image
              source={require('../assets/images/previous.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsReportModalVisible(true)}
            style={styles.nounIcon}
          >
            <Image
              source={require('../assets/images/adoption-icon.png')}
              style={styles.customIcon}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={currentPets}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          numColumns={2}
        />

        <View style={styles.footer}>
          <TouchableOpacity
            onPress={prevPage}
            disabled={currentPage === 1}
            style={styles.paginationButton}
          >
            <Image
              source={require('../assets/images/previous.png')}
              style={styles.paginationIcon}
            />
          </TouchableOpacity>
          <Image
            source={require('../assets/images/haydos-logo.png')}
            style={styles.footerLogo}
          />
          <TouchableOpacity
            onPress={nextPage}
            disabled={currentPage * petsPerPage >= publishedPets.length}
            style={styles.paginationButton}
          >
            <Image
              source={require('../assets/images/next.png')}
              style={styles.paginationIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Adoption Request Modal */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={isReportModalVisible}
          onRequestClose={() => setIsReportModalVisible(false)}
        >
          <ImageBackground
            source={require('../assets/images/modulbackgroundmissingsreports1.png')}
            style={styles.fullScreenModal}
          >
            <TouchableOpacity
              onPress={() => setIsReportModalVisible(false)}
              style={styles.exitButton}
            >
              <Image
                source={require('../assets/images/previous.png')}
                style={styles.exitIcon}
              />
            </TouchableOpacity>

            {/* Profil Fotoğrafı Ekleme */}
            <TouchableOpacity
              style={styles.profilePhotoContainer}
              onPress={pickImage}
            >
              {image ? (
                <Image source={{ uri: image }} style={styles.profilePhoto} />
              ) : (
                <View style={styles.placeholderContainer}>
                  <Image
                    source={require('../assets/images/profile-placeholder.png')}
                    style={styles.profilePhotoPlaceholder}
                  />
                  <Text style={styles.placeholderText}>
                    + add a profile photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Hayvan Bilgi Alanları */}
            <View style={styles.infoContainer}>
              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>NAME</Text>
                <TextInput
                  style={[styles.input, { textAlign: 'center' }]}
                  placeholder="+ Please write its name"
                  placeholderTextColor="#FFFFFF"
                  value={petName}
                  onChangeText={(text) => setPetName(text)}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>TYPE</Text>
                <TextInput
                  style={[styles.input, { textAlign: 'center' }]}
                  placeholder="+ Please write its type"
                  placeholderTextColor="#FFFFFF"
                  value={petType}
                  onChangeText={(text) => setPetType(text)}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>DESCRIPTION</Text>
                <TextInput
                  style={[styles.input, { textAlign: 'center' }]}
                  placeholder="+ Please type informations what might help us"
                  placeholderTextColor="#FFFFFF"
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                />
              </View>

              <View style={styles.inputSection}>
                <Text style={styles.inputTitle}>CONTACT INFO</Text>
                <TextInput
                  style={[styles.input, { textAlign: 'center' }]}
                  placeholder="+ Please add your number"
                  placeholderTextColor="#FFFFFF"
                  value={contactInfo}
                  onChangeText={(text) => setContactInfo(text)}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            {/* Gönderi Butonu */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Send Adoption Request</Text>
            </TouchableOpacity>
          </ImageBackground>
        </Modal>

        {selectedPet && (
          <PetDetailModal
            pet={selectedPet}
            isVisible={isPetModalVisible}
            onClose={() => setIsPetModalVisible(false)}
          />
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  nounIcon: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  list: {
    marginBottom: 20,
  },
  petCard: {
    width: 250,
    height: 265,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginLeft: 55,
  },
  petImage: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginTop: 25,
  },
  needHomeOverlay: {
    position: 'absolute',
     // Resmin biraz üstüne taşıyoruz
    left: 0,
    right: 0,
    backgroundColor: '#6ab04c', // Yeşil bir arka plan rengi kullanıyoruz
    paddingVertical: 10, // Üst-alt boşluk ekleyerek metni ortalıyoruz
    alignItems: 'center', // Metni yatayda ortalıyoruz
    borderRadius: 8, // Köşeleri yuvarlıyoruz
    zIndex: 10, // Kartın üstünde kalmasını sağlıyoruz
  },
  
  needHomeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#333',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginLeft: -20,
    marginRight: -20,
    marginBottom: -20,
  },
  footerLogo: {
    width: 70,
    height: 70,
  },
  fullScreenModal: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  exitButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  exitIcon: {
    width: 30,
    height: 30,
  },
  profilePhotoContainer: {
    backgroundColor: '#D9D9D9',
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 20,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePhotoPlaceholder: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    bottom: -25,
    right: 15,
  },
  placeholderText: {
    position: 'absolute',
    top: 10,
    color: '#404040',
    fontSize: 15,
    textAlign: 'center',
  },
  infoContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
  },
  inputSection: {
    marginBottom: 15,
  },
  inputTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#5BA163',
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: -5,
    marginVertical: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 20,
    width: '80%',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  paginationButton: {
    padding: 10,
  },
  paginationIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  modalDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalContactInfo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Adoption;