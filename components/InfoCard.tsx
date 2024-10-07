import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import profileservice from '../service/profileservice'; // profileservice'i içe aktar

const InfoCard = () => {
  const profileData = profileservice(); // Verileri çek

  return (
    <View style={styles.infoCardWrapper}>
      <View style={styles.infoCard}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>Name Surname</Text>
          <Text style={styles.infoValue}>{profileData.data.Name}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoLabel}>PHONE NUMBER</Text>
          <Text style={styles.infoValue}>{profileData.data.PhoneNumber}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>MAIL</Text>
          <Text style={styles.infoValue}>{profileData.data.Mail}</Text>
        </View>
      </View>
      <View style={styles.grayExtension} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoCardWrapper: {
    backgroundColor: '#4D9F56',
  },
  infoCard: {
    backgroundColor: '#424242',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  grayExtension: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -50,
    height: 50,
    backgroundColor: '#424242',
    zIndex: -1,
  },
  infoColumn: {
    width: '50%',
    marginBottom: 10,
  },
  infoRow: {
    width: '100%',
    marginTop: 10,
  },
  infoLabel: {
    color: '#4D9F56',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});

export default InfoCard;