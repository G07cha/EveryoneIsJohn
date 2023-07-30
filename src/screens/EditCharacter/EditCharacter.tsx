import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Text } from 'react-native';
import { useFormik } from 'formik';

import { SafeView } from '../../components/SafeView';
import { RootStackScreenProps } from '../../navigation';
import { TextInput } from '../../components/TextInput';
import { useGlobalStore } from '../../modules/store';
import { Character } from '../../modules/Character';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';

type Props = RootStackScreenProps<'EditCharacter'>;

export type EditCharacterScreenParams = { characterId: Character['id'] };

export const EditCharacterScreen = ({ navigation, route }: Props) => {
  const { characterId } = route.params;
  const updateCharacter = useGlobalStore.use.updateCharacter();
  const characters = useGlobalStore.use.characters();
  const character = useMemo(() => characters.get(characterId), [characterId, characters]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!character) {
      return;
    }

    navigation.setOptions({
      title: character.name,
    });
  }, [character, navigation]);

  const { dirty, handleBlur, handleChange, handleSubmit, values } = useFormik<Character>({
    initialValues: character as Character,
    onSubmit: (character) => {
      updateCharacter(character);

      navigation.navigate('Character', { characterId: character.id });
    },
  });

  useEffect(() => {
    navigation.addListener('beforeRemove', (event) => {
      if (!dirty || event.data.action.type !== 'GO_BACK') {
        return;
      }

      event.preventDefault();

      Alert.alert(t('Discard changes?'), t('Discard changes description'), [
        { text: t("Don't leave"), style: 'cancel', onPress: () => {} },
        {
          text: t('Discard'),
          style: 'destructive',
          // If the user confirmed, then we dispatch the action we blocked earlier
          // This will continue the action that had triggered the removal of the screen
          onPress: () => navigation.dispatch(event.data.action),
        },
      ]);
    });
  }, [dirty, navigation, t]);

  const decreaseScore = useCallback(() => {
    if (!character) {
      return;
    }

    updateCharacter({
      ...character,
      score: character.score - 1,
    });
  }, [character, updateCharacter]);

  const increaseScore = useCallback(() => {
    if (!character) {
      return;
    }

    updateCharacter({
      ...character,
      score: character.score + 1,
    });
  }, [character, updateCharacter]);

  if (!character) {
    navigation.navigate('Characters');
    return null;
  }

  return (
    <SafeView testID="edit_character_view">
      <Text>{t('Score')}</Text>
      <IconButton testID="decrease_score_button" onPress={decreaseScore} icon="minus" type="primary" />
      <Text>{character.score}</Text>
      <IconButton testID="increase_score_button" onPress={increaseScore} icon="plus" type="primary" />
      <Text>{t('Skills')}:</Text>
      <TextInput
        testID="first_skill_input"
        placeholder={t('First skill')}
        onChangeText={handleChange('skills[0]')}
        onBlur={handleBlur('skills[0]')}
        value={values.skills[0]}
      />
      <TextInput
        testID="second_skill_input"
        placeholder={t('Second skill')}
        onChangeText={handleChange('skills[1]')}
        onBlur={handleBlur('skills[1]')}
        value={values.skills[1]}
      />
      <TextInput
        testID="third_skill_input"
        placeholder={t('Third skill (optional)')}
        onChangeText={handleChange('skills[2]')}
        onBlur={handleBlur('skills[2]')}
        value={values.skills[2]}
      />
      <Text>{t('Obsessions')}:</Text>
      <TextInput
        testID="first_obsession_input"
        placeholder={t('First obsession')}
        onChangeText={handleChange('obsessions[0]')}
        onBlur={handleBlur('obsessions[0]')}
        value={values.obsessions[0]}
      />
      <TextInput
        testID="second_obsession_input"
        placeholder={t('Second obsession')}
        onChangeText={handleChange('obsessions[1]')}
        onBlur={handleBlur('obsessions[1]')}
        value={values.obsessions[1]}
      />
      <TextInput
        testID="third_obsession_input"
        placeholder={t('Third obsession')}
        onChangeText={handleChange('obsessions[2]')}
        onBlur={handleBlur('obsessions[2]')}
        value={values.obsessions[2]}
      />
      <Button testID="save_button" onPress={() => handleSubmit()}>
        {t('Save')}
      </Button>
    </SafeView>
  );
};
