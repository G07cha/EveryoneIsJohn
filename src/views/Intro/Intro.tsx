import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { SafeView } from '../../components/SafeView';
import { Image } from '../../components/Image';
import { Button } from '../../components/Button';
import { theme } from '../../theme';
import { StackViewProps } from '../../navigation';

type Props = StackViewProps<'Intro'>;

export type IntroViewParams = undefined;

export const IntroView = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const onCreateCharacterRequest = useCallback(() => {
    // Resetting navigation state to prevent user from going back
    navigation.reset({
      index: 0,
      routes: [{ name: 'CreateCharacter' }],
    });
  }, [navigation]);

  return (
    <SafeView style={styles.container}>
      <Image name="logo" style={styles.logo} />
      <Button title={t('Create first character')} onPress={onCreateCharacterRequest} />
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
