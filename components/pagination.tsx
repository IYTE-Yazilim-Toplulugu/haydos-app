import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, ImageSourcePropType ,Pressable} from 'react-native';

interface PaginationItemProps
{
    currentPage: number;
    totalPages: number;
    handlePawsPrevious: () => void;
    handlePawsNext: () => void;
}


const Pagination: React.FC<PaginationItemProps> = ({ currentPage, totalPages, handlePawsPrevious,handlePawsNext }) => 
{
    return (
      <View style={styles.paginationContainer}>
            <View>
                <Pressable  style={styles.button1} onPress={() => {handlePawsPrevious()}}>
                <View style={styles.triangle1}/>
                </Pressable>
            </View>
        {[...Array(totalPages)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage-1 === index && styles.activeDot,
            ]}
          />
        ))}
          <Pressable  style={styles.button2} onPress={() => {handlePawsNext()}}>
            <View style={styles.triangle2}/>
          </Pressable>
      </View>
     );
};


  const styles = StyleSheet.create(
{
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(236, 238, 229, 1)',
    },
    dot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#ccc',
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#000',
    },
    button1:{
        backgroundColor: 'rgba(77, 159, 86, 1)',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft:-6,
        paddingRight:3,
    },
    button2:{
      backgroundColor: 'rgba(77, 159, 86, 1)',
      width: 24,
      height: 24,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft:2,
      paddingRight:-3,
  },
    triangle1: {
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
      triangle2: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "rgba(217, 217, 217, 1)",
        transform:[{rotate:"90deg"}],
      },
});


export default Pagination;