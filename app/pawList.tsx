import React, { useState } from 'react';
import {FlatList, StyleSheet } from 'react-native';
import Pagination from '../components/pagination';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './index';
import PawItem from '../components/pawItem';


const pawsFirstPage = [
  { name: 'İncir',Gender:'Male' , Age:'5' , WhereToFindMe:'Library' , FunFact:'None' , image: require('../assets/images/paw resimleri/incir.png'), imageDetailed: require('../assets/images/paw resimleri/incir2.png')},
  { name: 'Mila',Gender:'Male' , Age:'5' , WhereToFindMe:'Facult Of Science' , FunFact:'None' , image: require('../assets/images/paw resimleri/Mila.png'), imageDetailed: require('../assets/images/paw resimleri/Mila2.png')},
  { name: 'Zoey',Gender:'Male' , Age:'5' , WhereToFindMe:'Facult Of Science' , FunFact:'None' , image: require('../assets/images/paw resimleri/Zoey.png'), imageDetailed: require('../assets/images/paw resimleri/Zoey2.png')},
  { name: 'Zeytin',Gender:'Male' , Age:'5' , WhereToFindMe:'English Prep School' , FunFact:'None' , image: require('../assets/images/paw resimleri/Zeytin.png'), imageDetailed: require('../assets/images/paw resimleri/Zeytin2.png')},
  { name: 'Paspas Hades',Gender:'Male' , Age:'5' , WhereToFindMe:'English Prep School' , FunFact:'None' , image: require('../assets/images/paw resimleri/Paspas Hades.png'), imageDetailed: require('../assets/images/paw resimleri/Paspas Hades2.png')},
  { name: 'Karamel',Gender:'Male' , Age:'5' , WhereToFindMe:'Chemical Engineering' , FunFact:'None' , image: require('../assets/images/paw resimleri/Karamel.png'), imageDetailed: require('../assets/images/paw resimleri/Karamel2.png')},
  { name: 'Bakır',Gender:'Male' , Age:'5' , WhereToFindMe:'Library' , FunFact:'None' , image: require('../assets/images/paw resimleri/Bakir.png'), imageDetailed: require('../assets/images/paw resimleri/Bakir2.png')},
  { name: 'Mösyö',Gender:'Male' , Age:'5' , WhereToFindMe:'Molecular Biology and Genetics' , FunFact:'None' , image: require('../assets/images/paw resimleri/Mosyo.png'),  imageDetailed: require('../assets/images/paw resimleri/Mosyo2.png')},
  { name: 'Alaca',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Alaca.png'), imageDetailed: require('../assets/images/paw resimleri/Alaca2.png')},
  { name: 'Boncuk',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Boncuk.png'), imageDetailed: require('../assets/images/paw resimleri/Boncuk2.png')},
];


const pawsSecondPage = [
  { name: 'Bozo',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Bozo.png'), imageDetailed: require('../assets/images/paw resimleri/Bozo2.png')},
  { name: 'Nazli',Gender:'Male' , Age:'5' , WhereToFindMe:'Rectorate' , FunFact:'None' , image: require('../assets/images/paw resimleri/Nazli.png'), imageDetailed: require('../assets/images/paw resimleri/Nazli2.png')},
  { name: 'Zeliş',Gender:'Male' , Age:'5' , WhereToFindMe:'Technopark A1' , FunFact:'None' , image: require('../assets/images/paw resimleri/Zelis.png'), imageDetailed: require('../assets/images/paw resimleri/Zelis2.png')},
  { name: 'Badem',Gender:'Male' , Age:'5' , WhereToFindMe:'Technopark A1' , FunFact:'None' , image: require('../assets/images/paw resimleri/Badem.png'), imageDetailed: require('../assets/images/paw resimleri/Badem2.png')},
  { name: 'Ayşe Safiş',Gender:'Male' , Age:'5' , WhereToFindMe:'Technopark A1' , FunFact:'None' , image: require('../assets/images/paw resimleri/Ayse Safis.png'), imageDetailed: require('../assets/images/paw resimleri/Ayse Safis2.png')},
  { name: 'Picasso',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Picasso.png'), imageDetailed: require('../assets/images/paw resimleri/Picasso2.png')},
  { name: 'Hector',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Hector.png'), imageDetailed: require('../assets/images/paw resimleri/Hector2.png')},
  { name: 'Gümüş',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Gumus.png'), imageDetailed: require('../assets/images/paw resimleri/Gumus2.png')},
  { name: 'Einstein',Gender:'Male' , Age:'5' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Einstein.png'), imageDetailed: require('../assets/images/paw resimleri/Einstein2.png')},
  { name: 'Add a New Paw',Gender:'Male' , Age:'0' , WhereToFindMe:'Cafeteria' , FunFact:'None' , image: require('../assets/images/paw resimleri/Add a New Paw.png'), imageDetailed: require('../assets/images/paw resimleri/Add a New Paw.png')}
];




interface PawListProps 
{
  navigation:StackNavigationProp<RootStackParamList, 'Home'>;
}

export const PawList = ({navigation}:PawListProps) => 
{
const[currentPage,setcurrent]=useState(1)
function handlePawsNext(){
  if(currentPage<2)
  {
    setcurrent(prevcurrentPage=>prevcurrentPage+1)
  }
  
}
function handlePawsPrevious(){
  if(currentPage>1)
    {
      setcurrent(prevcurrentPage=>prevcurrentPage-1)
    }
}
  return (
    <>
      <FlatList
        data={
          currentPage === 1 ? pawsFirstPage :
          currentPage === 2 ? pawsSecondPage : 
          pawsFirstPage
        }
        numColumns={2}
        renderItem={({ item }) => <PawItem name={item.name} image={item.image} imageDetailed={item.imageDetailed} navigation={navigation} gender={item.Gender} age={item.Age} whereToFindMe={item.WhereToFindMe} funFact={item.FunFact}/>}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      <Pagination currentPage={currentPage} totalPages={2} handlePawsNext={handlePawsNext} handlePawsPrevious={handlePawsPrevious} />
    </>
  );
};


const styles = StyleSheet.create({
  list: 
  {
    paddingTop:35,
    justifyContent: 'center',
    backgroundColor: 'rgba(236, 238, 229, 1)',
  },
});


export default PawList;