import React from 'react';
import { StyleSheet } from 'react-native';

import { SafeView } from '../../components/SafeView';
import { Image } from '../../components/Image';

export const SplashView = () => {
  return (
    <SafeView style={styles.container}>
      <Image name="logo" style={styles.logo} />
      <Image name="characterArt" style={styles.characterArt} />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  characterArt: {
    aspectRatio: 8,
    height: 'auto',
    maxWidth: '100%',
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    height: '50%',
    maxWidth: '80%',
    resizeMode: 'contain',
  },
});
