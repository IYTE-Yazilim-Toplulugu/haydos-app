import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import React, { useState } from 'react'
import Appbar from '@/components/Appbar'
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from 'react-native';

const Donationbar = ({ onCartPress, onBackPress }: { onCartPress: () => void; onBackPress: () => void; }) => {
  return (
    <View style={styles.donationbar}>
      <TouchableOpacity onPress={onBackPress}>
        <AntDesign name="back" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ width: 80, height: 50 }}>
        <Image source={require("../assets/images/MamaKumbarası.png")} style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
      </View>
      <TouchableOpacity onPress={onCartPress}>
        <AntDesign name="shoppingcart" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const DonationBody = ({ showAnimals }: { showAnimals: boolean }) => {
  const openLink = () => {
    Linking.openURL('https://www.mamakumbarasi.com/figen-in-bebekleri'); // Open the URL
  };
  const openSignupLink = () => {
    Linking.openURL('https://www.example.com/signup'); // Replace with your actual signup link
  };
  if (showAnimals) {
    return (
      <ScrollView contentContainerStyle={styles.donationBody}>
        <TouchableOpacity style={styles.animalPictureContainer} onPress={openLink}>
          <View style={styles.kumbaraContainer}>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>Kampüs içi</Text>
            </View>
            <Image source={require("../assets/images/animal1.png")} style={{ width: 200, height: 80, resizeMode: 'contain' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.animalPictureContainer} onPress={openLink}>
          <View style={styles.kumbaraContainer}>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>Gülbahçe</Text>
            </View>
            <Image source={require("../assets/images/animal2.png")} style={{ width: 200, height: 80, resizeMode: 'contain' }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.animalPictureContainer} onPress={openLink}>
          <View style={styles.kumbaraContainer}>
            <View style={styles.locationTextContainer}>
              <Text style={styles.locationText}>Urla</Text>
            </View>
            <Image source={require("../assets/images/animal3.png")} style={{ width: 200, height: 80, resizeMode: 'contain' }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.donationBody}>
      <Text style={styles.informativeText}>Uygulamamızda, bağışlar şimdilik Mama Kumbarası adlı bir site aracılığıyla toplanmaktadır</Text>
      <Text style={styles.headerText}>Mamakumbarası nedir</Text>
      <Text style={styles.informativeText}>
        MamaKumbarası, sokak hayvanlarına mama desteği sağlamak amacıyla kurulan bir platformdur. Kullanıcılar, site üzerinden mama bağışı yaparak sokak hayvanlarına yardım edebilirler. Bağışlanan mamalar, gönüllüler aracılığıyla toplanıp ihtiyacı olan sokak hayvanlarına ulaştırılmaktadır. Proje, hayvanların beslenme ihtiyaçlarını karşılamayı ve toplumu hayvan refahı konusunda bilinçlendirmeyi hedeflemektedir.
      </Text>
      <Text style={styles.headerText}>Nasıl Bağış Yapabilirim</Text>
      <Text style={styles.informativeText}>
        MamaKumbarası aracılığıyla bağış yapmak için üye olmanıza gerek yoktur ama isterseniz{' '}
        <Text style={styles.link} onPress={openSignupLink}>bu linkten</Text> üye olabilirsiniz. MamaKumbarasında bağışlar ürünler aracılığıyla yapılır, bağış yapmak isteyen bir kullanıcı belli bir kurumun veya kişinin MamaKumbarası'na internet üzerinden ulaştıktan sonra bağış yapmak istediği ürünleri seçer ve bu ürünlerin tutarı kullanıcıdan alınır.
        Okulumuzun MamaKumbaralarına ise yukardaki {''}
        <AntDesign name="shoppingcart" size={14} color="black" /> basarak görebilirsiniz.
      </Text>
    </ScrollView>
  );
};


const Donation = () => {
  const [showAnimals, setShowAnimals] = useState(false);

  const handleCartPress = () => {
    setShowAnimals(true);
    console.log("shopping card is pressed.")
  };
  const handleBackPress = () => {
    setShowAnimals(false);
    console.log("going back to information text")
  }
  return (
    <View style={styles.container}>
      <View style={styles.greenBackground}>
        <View style={styles.darkBackground}>
          <View style={styles.whiteBox}>
            <Donationbar onCartPress={handleCartPress} onBackPress={handleBackPress}/>
            <DonationBody showAnimals={showAnimals}/>
          </View>
        </View>
      </View>
      <Appbar backButton={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E7EADE",
  },
  greenBackground: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: "#6BBD74",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  darkBackground: {
    flex: 1,
    backgroundColor: "#404040",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: '90%',
    height: '90%',
    backgroundColor: "white",
    borderRadius: 45,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  text: {
    color: '#000',
    fontSize: 18,
  },
  donationbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: '95%',
    padding: 10,
  },
  donationBody: {
    justifyContent: 'flex-start',
    alignSelf: "center",
    alignItems: 'center',
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
  kumbaraContainer: {
    width: "100%",
    height: "30%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  animalPictureContainer: {
    height: 120,
    width: 300, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  locationTextContainer: {
    justifyContent: "center", 
    alignItems: "center",
    width: 80, 
    height: 80
  },
  locationText: {
    fontSize: 16,
    color: "#731c7a"
  },
  //informativeTextContainer: {
  //  padding: 20,
  //  alignItems: 'center',
  //},
  headerText: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#731c7a', 
    marginBottom: 10, 
  },
  informativeText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  link: {
    color: 'blue', 
    textDecorationLine: 'underline', 
  },
});

export default Donation;