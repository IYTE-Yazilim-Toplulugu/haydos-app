import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native';
import React from 'react'
import { Link } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'

const Index = () => {
  return (
    <View>
      <Text>index</Text>
      <Link href="/login" style={styles.link}>
        <ThemedText type="link">Login Page</ThemedText>
       </Link>
       <Link href="/signup" style={styles.link}>
        <ThemedText type="link">Sign Up Page</ThemedText>
       </Link>
       <Link href="/feeding" style={styles.link}>
        <ThemedText type="link">Feeding Page</ThemedText>
       </Link>
       <Link href="/adoption" style={styles.link}>
        <ThemedText type="link">Adoption Page</ThemedText>
       </Link>
       <Link href="/home" style={styles.link}>
        <ThemedText type="link">Home Page</ThemedText>
       </Link>
       <Link href="/missings" style={styles.link}>
        <ThemedText type="link">Missings Page</ThemedText>
       </Link>
       <Link href="/pawDetailed" style={styles.link}>
        <ThemedText type="link">Detailed Paw Page</ThemedText>
       </Link>
       <Link href="/paws" style={styles.link}>
        <ThemedText type="link">Paws Page</ThemedText>
       </Link>
       <Link href="/profile" style={styles.link}>
        <ThemedText type="link">Profile Page</ThemedText>
       </Link>
       <Link href="/vets" style={styles.link}>
        <ThemedText type="link">Vets Page</ThemedText>
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


export default Index