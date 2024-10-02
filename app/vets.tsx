import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ImageBackground, Pressable, Alert, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import axios from 'axios';

interface Vet {
  id: string;
  name: string;
  rating: number;
  phone: string;
  address: string;
  distance: string;
  location: { latitude: number; longitude: number };
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyAhpNjj9__7HR94qQRXe9MqQDpb1Wyj8ng'; // Buraya kendi Google API anahtarınızı ekleyin

const Vets = () => {
  const navigation = useNavigation();
  const [vets, setVets] = useState<Vet[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Konum izni reddedildi', 'Lütfen konum iznini verin.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const userCoordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(userCoordinates);

      const staticVets: Vet[] = [
        { id: 'Vetcom', name: 'Vetcom Veteriner Kliniği', rating: 5.0, phone: '0539 600 4817', address: 'Yelaltı, Argın Sk. 4A, 35430 Urla/İzmir', distance: '', location: { latitude: 38.3223, longitude: 26.7645 } },
        { id: 'Vourla', name: 'Vourla Veteriner Kliniği', rating: 4.9, phone: '0533 406 2098', address: 'Yaka, Rüya Sk. No: 2/A, 35430 Urla/İzmir', distance: '', location: { latitude: 38.3273, longitude: 26.7695 } },
        { id: 'Hospetal', name: 'Hospetal Veteriner Kliniği', rating: 4.9, phone: '0534 629 5659', address: 'Hacı İsa, 75. Yıl Cumhuriyet Cd. No:37/B, 35430 Urla/İzmir', distance: '', location: { latitude: 38.3243, longitude: 26.7725 } },
        { id: 'Vetopya', name: 'Vetopya Veteriner Kliniği', rating: 4.7, phone: '0541 275 0883', address: 'Altıntaş, Sakız Sk. No:7A, 35430 Urla/İzmir', distance: '', location: { latitude: 38.3303, longitude: 26.7715 } },
        { id: 'Picasso', name: 'Picasso', rating: 4.4, phone: '0232 754 1424', address: 'Yenikent, 75. Yıl Cumhuriyet Cd. No:102/A, 35430 Urla/İzmir', distance: '', location: { latitude: 38.3263, longitude: 26.7665 } },
        { id: 'Urlavet', name: 'Urlavet', rating: 4.1, phone: '0232 270 2610', address: 'Altıntaş, Ahmet Besim Uyal Cd. No:54 D:C, 35430 Urla/İzmir', distance: '', location: { latitude: 38.3213, longitude: 26.7655 } },
      ];

      const updatedVets = await Promise.all(
        staticVets.map(async (vet) => {
          const response = await getDrivingDistance(userCoordinates, vet.location);
          return { ...vet, distance: response };
        })
      );

      // sort() kullanarak sıralama işlemi yapıyoruz
      const closestVets = [...updatedVets]
        .sort((a, b) => parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0]))
        .slice(0, 5);
      setVets(closestVets);
    };

    fetchLocation();
  }, []);

  const getDrivingDistance = async (
    start: { latitude: number; longitude: number },
    end: { latitude: number; longitude: number }
  ) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${start.latitude},${start.longitude}&destination=${end.latitude},${end.longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );

      // API yanıtını loglayarak hatayı inceleyelim
      console.log('API Response:', response.data);

      const route = response.data.routes[0];
      if (route) {
        const distanceText = route.legs[0].distance.text;
        const durationText = route.legs[0].duration.text;
        return `${distanceText} (${durationText})`;
      }
      return 'Mesafe bilgisi bulunamadı';
    } catch (error) {
      // 'error' tipini 'any' veya 'Error' türüne çevirerek hatayı daha güvenli bir şekilde işleriz.
      console.error('Google Maps API Hatası:', (error as Error).message);
      // Hata detayını kullanıcıya göstermek için güncellenmiş mesaj
      return `Mesafe bilgisi alınamadı: ${(error as any).response ? (error as any).response.data.error_message : 'API Hatası'}`;
    }
  };

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert('Hata', 'Telefon uygulaması açılamadı.')
    );
  };

  const handleAddressPress = (address: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    Linking.openURL(url).catch(() =>
      Alert.alert('Hata', 'Harita uygulaması açılamadı.')
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      <FlatList
        data={vets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.vetHeader}>
              <Text style={styles.title}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Image source={require('../assets/images/star.png')} style={styles.starIcon} />
                <Text style={styles.rating}>{item.rating}/5</Text>
              </View>
            </View>

            <Pressable onPress={() => handlePhonePress(item.phone)} style={styles.infoRow}>
              <Image source={require('../assets/images/phone.png')} style={styles.icon} />
              <Text style={styles.infoText}>{item.phone}</Text>
            </Pressable>

            <Pressable onPress={() => handleAddressPress(item.address)} style={styles.infoRow}>
              <Image source={require('../assets/images/location.png')} style={styles.icon} />
              <Text style={styles.infoText}>{item.address}</Text>
            </Pressable>

            <View style={styles.infoRow}>
              <Image source={require('../assets/images/location.png')} style={styles.icon} />
              <Text style={styles.infoText}>Uzaklık: {item.distance}</Text>
            </View>
          </View>
        )}
        initialNumToRender={4}
        windowSize={5}
        contentContainerStyle={styles.listPadding}
      />

      <View style={styles.footer}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButtonContainer}>
          <Image source={require('../assets/images/backbutton.png')} style={styles.backButtonImage} />
        </Pressable>

        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/haydos-logo.png')} style={styles.logo} />
        </View>
      </View>
    </ImageBackground>
  );
};

const PRIMARY_COLOR = '#4CAF50';
const SECONDARY_COLOR = '#333';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  imageStyle: {
    resizeMode: 'cover',
    marginTop: 0,
  },
  listPadding: {
    paddingBottom: 120,
    paddingTop: 30,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#404040',
    paddingVertical: 10,
    paddingHorizontal: 25,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  backButtonContainer: {
    padding: 0,
  },
  backButtonImage: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 90,
    height: 90,
    marginRight: 125,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  vetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginLeft: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    marginRight: 5,
    color: PRIMARY_COLOR,
  },
  starIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
    color: SECONDARY_COLOR,
    marginLeft: 10,
  },
});

export default Vets;
