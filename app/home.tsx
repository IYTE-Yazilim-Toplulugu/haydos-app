import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions  } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useRouter } from 'expo-router';

const symbols = [
  require('../assets/images/Donation.png'),
  require('../assets/images/Paws.png'),
  require('../assets/images/FeedingExpress.png'),
  require('../assets/images/Adaption.png'),
  require('../assets/images/Missing.png'),
  require('../assets/images/Profile.png')
];

const logo = require('../assets/images/HAYDOSLOGO.png');

const announcements = [
  { title: 'Announcement 1', content: 'Details about announcement 1' },
  { title: 'Announcement 2', content: 'Details about announcement 2' },
  { title: 'Announcement 3', content: 'Details about announcement 3' },
];

const { width: viewportWidth } = Dimensions.get('window');

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const renderAnnouncementItem = ({ item, index }) => (
    <View style={styles.announcementItem}>
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text style={styles.announcementContent}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoBackground}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
      </View>

      <Carousel
        data={announcements}
        renderItem={renderAnnouncementItem}
        width={viewportWidth * 0.8}
        height={200}
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
            style={[
              styles.paginationDot,
              { opacity: index === currentIndex ? 1 : 0.3 },
            ]}
          />
        ))}
      </View>

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
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    marginHorizontal: 4,
    marginVertical: -4,
  },
  container: {
    flex: 1,
    backgroundColor: '#ECEEE5',
    alignItems: 'center',
  },
  logoBackground: {
    backgroundColor: '#404040',
    width: '100%',
    alignItems: 'center',
    paddingVertical: -20,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  logo: {
    width: 135,
    height: 143,
    resizeMode: 'contain',
  },
  carouselContainer: {
    marginTop: 140,
  },
  announcementItem: {
    backgroundColor: '#ECEEE1',
    borderRadius: 20,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  announcementContent: {
    fontSize: 16,
    color: '#666',
  },
  grid: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: '80%',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6BBD74',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#6BBD74',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    width: 120,
  },
  callVetsButton: {
    backgroundColor: '#4D9F56',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callVetsButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
