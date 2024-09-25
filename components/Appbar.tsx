import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { router, Href } from 'expo-router';

interface AppbarProps {
  title?: string;
  href?: Href<string | object> | null;
  backButton: boolean;
}

function handleBackPress(href?: Href<string | object>) {
  if (href) {
    router.push(href);
  } else {
    router.back();
  }
}

const Appbar = ({ title, href, backButton }: AppbarProps) => {
  return (
    <View style={styles.container}>
      {backButton && <TouchableOpacity style={styles.backButton} onPress={() => handleBackPress(href ?? undefined)}>
        <Image
          source={require('../assets/images/arrow-icon.png')}
        />
      </TouchableOpacity>}
      {title && <Text style={styles.title}>{title}</Text>}
      <Image
        source={require('../assets/images/haydos-logo-appbar.png')}
        style={styles.logo}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'light',
    flex: 1,
    paddingLeft: 20,
    textAlign: 'left',
  },
  logo: {
    width: 103,
    height: 103,
    resizeMode: 'contain',
  },
});

export default Appbar;
