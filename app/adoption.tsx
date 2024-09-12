import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import React from 'react'
import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

const Adoption = () => {
  return (
    <View>
      <Text>Adoption</Text>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Go Back</ThemedText>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default Adoption