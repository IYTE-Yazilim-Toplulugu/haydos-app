import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRouter } from 'expo-router';

// Ekran boyutlarını alıyoruz
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const symbols = [
  require('../assets/images/Donation.png'),
  require('../assets/images/Paws.png'),
  require('../assets/images/FeedingExpress.png'),
  require('../assets/images/Adaption.png'),
  require('../assets/images/Missing.png'),
  require('../assets/images/Profile.png'),
];

const logo = require('../assets/images/HAYDOSLOGO.png');

const announcements = [
  { title: 'Announcement 1', content: 'Details about announcement 1' },
  { title: 'Announcement 2', content: 'Details about announcement 2' },
  { title: 'Announcement 3', content: 'Details about announcement 3' },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const renderAnnouncementItem = ({ item }) => (
    <View style={styles.announcementItem}>
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text style={styles.announcementContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={styles.logoBackground}>
            <View style={styles.logoContainer}>
              <Image source={logo} style={styles.logo} />
            </View>
          </View>
        </View>

        {/* Announcement Section */}
        <View style={styles.announcementSection}>
          <Carousel
            data={announcements}
            renderItem={renderAnnouncementItem}
            width={screenWidth * 0.8} // Ekran genişliğine göre dinamik genişlik
            height={'100%'}
            autoPlay={false}
            autoPlayInterval={3000}
            loop={true}
            style={styles.carouselContainer}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            onProgressChange={(_, absoluteProgress) => {
              setCurrentIndex(Math.round(absoluteProgress));
            }}
          />
          <View style={styles.paginationContainer}>
            {announcements.map((_, index) => (
              <View
                key={index}
                style={[styles.paginationDot, { opacity: index === currentIndex ? 1 : 0.3 }]}
              />
            ))}
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <View style={styles.grid}>
            <View style={styles.row}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/donation')}
                >
                  <Image source={symbols[0]} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.buttonText}>Donation</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/paws')}
                >
                  <Image source={symbols[1]} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.buttonText}>Paws</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/feeding')}
                >
                  <Image source={symbols[2]} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.buttonText}>Feeding & Express</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/adoption')}
                >
                  <Image source={symbols[3]} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.buttonText}>Adoption</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/missings')}
                >
                  <Image source={symbols[4]} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.buttonText}>Missing</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => router.push('/profile')}
                >
                  <Image source={symbols[5]} style={styles.buttonImage} />
                </TouchableOpacity>
                <Text style={styles.buttonText}>Profile</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.callVetsButton}
            onPress={() => router.push('/vets')}
          >
            <Text style={styles.callVetsButtonText}>Call Vets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEEE5',
  },
  mainContent: {
    flex: 1,
  },
  logoSection: {
    flex: 0.15,
  },
  logoBackground: {
    flex: 1,
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  announcementSection: {
    flex: 0.15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  carouselContainer: {
    flex: 1,
  },
  announcementItem: {
    backgroundColor: '#ECEEE1',
    borderRadius: 20,
    padding: '5%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '3%',
  },
  announcementContent: {
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: '2%',
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
  },
  buttonsSection: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '10%',
  },
  grid: {
    width: '70%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    width: '45%',
  },
  button: {
    width: screenWidth * 0.21, // Ekran genişliğine göre orantılı genişlik
    height: screenWidth * 0.21, // Ekran genişliğine göre orantılı yükseklik (kare)
    borderRadius: screenWidth * 0.07, // Butonları yuvarlatmak için
    backgroundColor: '#6BBD74',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6BBD74',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#333',
    fontSize: screenWidth * 0.04, // Ekran genişliğine göre dinamik font boyutu
    fontWeight: 'bold',
    marginTop: '2%',
    textAlign: 'center',
    width: '100%',
  },
  callVetsButton: {
    backgroundColor: '#4D9F56',
    paddingVertical: screenHeight * 0.01, // Ekran yüksekliğine göre orantılı dikey padding
    paddingHorizontal: screenWidth * 0.1, // Ekran genişliğine göre orantılı yatay padding
    borderRadius: 25,
    marginBottom: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callVetsButtonText: {
    color: '#FFF',
    fontSize: screenWidth * 0.045, // Ekran genişliğine göre dinamik font boyutu
    fontWeight: 'bold',
  },
});