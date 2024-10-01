import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import { RouteProp } from '@react-navigation/native';
const pawsInfo = [
    { name: 'İncir',Gender:'Male' , Age:'5' , WhereToFindMe:'Library' , FunFact:'None' , image: require('../assets/images/paw resimleri/incir2.png')},
    { name: 'Mila',Gender:'Male' , Age:'5' , WhereToFindMe:'Facult Of Science' , FunFact:'None' , image: require('../assets/images/paw resimleri/Mila2.png')},
    { name: 'Zoey',Gender:'Male' , Age:'5' , WhereToFindMe:'Facult Of Science' , FunFact:'None' , image: require('../assets/images/paw resimleri/Zoey2.png')},
    { name: 'Zeytin',Gender:'Male' , Age:'5' , WhereToFindMe:'English Prep School' , FunFact:'None' , image: require('../assets/images/paw resimleri/Zeytin2.png')},
    { name: 'Paspas Hades',Gender:'Male' , Age:'5' , WhereToFindMe:'English Prep School' , FunFact:'None' , image: require('../assets/images/paw resimleri/Paspas Hades2.png')},
    { name: 'Karamel',Gender:'Male' , Age:'5' , WhereToFindMe:'Chemical Engineering' , FunFact:'None' , image: require('../assets/images/paw resimleri/Karamel2.png')},
    { name: 'Bakır',Gender:'Male' , Age:'5' , WhereToFindMe:'Library' , FunFact:'None' , image: require('../assets/images/paw resimleri/Bakir2.png')},
    { name: 'Mösyö',Gender:'Male' , Age:'5' , WhereToFindMe:'Molecular Biology and Genetics' , FunFact:'None' , image: require('../assets/images/paw resimleri/Mosyo2.png')},
    { name: 'Alaca',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Alaca2.png')},
    { name: 'Boncuk',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Boncuk2.png')},
    { name: 'Bozo',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Bozo2.png')},
    { name: 'Nazli',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Nazli2.png')},
    { name: 'Zeliş',Gender:'Male' , Age:'5' , WhereToFindMe:'Technopark A1' , FunFact:'None' , image: require('../assets/images/paw resimleri/Zelis2.png')},
    { name: 'Badem',Gender:'Male' , Age:'5' , WhereToFindMe:'Technopark A1' , FunFact:'None' , image: require('../assets/images/paw resimleri/Badem2.png')},
    { name: 'Ayşe Safiş',Gender:'Male' , Age:'5' , WhereToFindMe:'Technopark A1' , FunFact:'None' , image: require('../assets/images/paw resimleri/Ayse Safis2.png')},
    { name: 'Picasso',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Picasso2.png')},
    { name: 'Hector',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Hector2.png')},
    { name: 'Gümüş',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Gumus2.png')},
    { name: 'Einstein',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Einstein2.png')}
  ];


type DetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Details'>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};


const DogProfileScreen = ({navigation,route}:Props) => {
  const { pawName, pawImage, pawGender,pawAge, pawWhereToFindMe, pawFunFact} = route.params; //BURADA KÖPEK BİLGİLERİ ALINACAK
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.beigeBox}>
        <View style={styles.infoContainer}>
          <View style={styles.imageBackGroundContainer}> 
            <View style={styles.imageContainer}>
              <Image
                source= {pawImage}
                style={styles.dogImage}
              />
          </View>
          <Text style={styles.infoLabel}>NAME</Text>
          <Text style={[styles.infoValue,styles.beige]}>{pawName} </Text> 

          <Text style={styles.infoLabel}>GENDER</Text>
          <Text style={styles.infoValue}>{pawGender}</Text> 

          <Text style={styles.infoLabel}>AGE</Text>
          <Text style={styles.infoValue}>{pawAge}</Text> 

          <Text style={styles.infoLabel}>HEALTH CONDITION</Text>
          <TouchableOpacity style={styles.reportButton}>
            <Text style={styles.reportButtonText}>REPORT</Text>
          </TouchableOpacity>

          <Text style={styles.infoLabel}>WHERE TO FIND ME</Text>
          <Text style={styles.infoValue}>{pawWhereToFindMe}</Text> 

          <Text style={styles.infoLabel}>FUN FACT</Text>
          <Text style={styles.infoValue}>{pawFunFact}</Text> 
        </View>
      </View>
    </View>

      <View style={styles.footerBox}>
        <Pressable  style={styles.circlebutton} onPress={() => {navigation.goBack()}}>
          <View style={styles.triangle}/>
        </Pressable>
        <View style={styles.HaydosLogo}>
          <Image source= {require('../assets/images/paw resimleri/HaydosLogo.png')} style={styles.HaydosLogo}/>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "rgba(217, 217, 217, 1)",
    transform:[{rotate:"-90deg"}],
  },
  circlebutton:{
    backgroundColor: 'rgba(77, 159, 86, 1)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:-6,
    paddingRight:3,
    marginRight: 5,
    left:30,
},
  imageContainer: {
    backgroundColor: '#D9D9D9',
    width: 260,
    height: 260,
    marginTop: 50,
    borderRadius: 40,
    alignSelf: 'center',
    resizeMode: 'contain',

  },
  imageBackGroundContainer: {
    backgroundColor: 'rgba(64, 64, 64, 1)',
    width: '100%',
    height: '50%',
    borderBottomRightRadius:50,
    borderBottomLeftRadius:50,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,

  },

  dogImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    height: '99.5%',
    width: '100%',
    backgroundColor: 'rgba(107, 189, 116, 1)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height:2 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ' rgba(231, 234, 222, 1)',
    marginTop: 10,
    alignSelf: 'center',
  },
  infoValue: {
    fontSize: 18,
    color: 'rgba(64, 64, 64, 1)',
    marginTop: 5,
    alignSelf: 'center',
  },
  reportButton: {
    marginTop: 10,
    backgroundColor: 'rgba(198, 21, 44, 1)',
    paddingHorizontal: 25,
    borderRadius: 20,
    alignSelf: 'center',
  },
  reportButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerBox: {
    backgroundColor: 'rgba(231, 234, 222, 1)' ,
    width: '100%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  beige: {
    color: ' rgba(231, 234, 222, 1)',
  },
  beigeBox: {
    height: '88%',
    width: '100%',
    color: ' rgba(231, 234, 222, 1)',
    backgroundColor: 'rgba(231, 234, 222, 1)' ,
  },
  HaydosLogo: {
    paddingRight:0,
    paddingHorizontal:15,
  },
});

export default DogProfileScreen;