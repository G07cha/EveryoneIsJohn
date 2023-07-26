import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { RootStackScreenProps } from '../../navigation';

type Props = RootStackScreenProps<'Intro'>;

export type IntroScreenParams = undefined;

export const IntroScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const onCreateCharacterRequest = useCallback(() => {
    // Resetting navigation state to prevent user from going back
    navigation.reset({
      index: 0,
      routes: [{ name: 'CreateCharacter' }],
    });
  }, [navigation]);

  return (
    <View style={styles.container} testID="intro_view">
      <Image name="logo" style={styles.logo} />
      <Button testID="create_character_button" title={t('Create first character')} onPress={onCreateCharacterRequest} />
      <Image name="characterArt" style={styles.characterArt} />
    </View>
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
    backgroundColor: theme.palette.secondary,
    height: '100%',
    justifyContent: 'space-between',
  },
  logo: {
    height: '50%',
    maxWidth: '80%',
    resizeMode: 'contain',
  },
});
