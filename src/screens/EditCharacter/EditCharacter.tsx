import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';

import { RootStackScreenProps } from '../../navigation';
import { TextInput } from '../../components/TextInput';
import { useGlobalStore } from '../../modules/store';
import { Character } from '../../modules/Character';
import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { ContentView } from '../../components/ContentView';
import { SubTitle, Title } from '../../components/Typography';

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
    onSubmit: (updatedCharacter, { resetForm }) => {
      updateCharacter(characterId, (prevCharacter) => {
        const character: Character = { ...prevCharacter, ...updatedCharacter };
        resetForm({
          values: character,
        });

        return character;
      });

      navigation.goBack();
    },
  });

  useEffect(
    () =>
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
      }),
    [dirty, navigation, t],
  );

  const decreaseScore = useCallback(() => {
    updateCharacter(characterId, (prevCharacter) => ({
      ...prevCharacter,
      score: prevCharacter.score - 1,
    }));
  }, [characterId, updateCharacter]);

  const increaseScore = useCallback(() => {
    updateCharacter(characterId, (prevCharacter) => ({
      ...prevCharacter,
      score: prevCharacter.score + 1,
    }));
  }, [characterId, updateCharacter]);

  if (!character) {
    navigation.navigate('Characters');
    return null;
  }

  return (
    <ContentView testID="edit_character_view">
      <ScrollView contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets>
        <View>
          <SubTitle style={styles.scoreTitle}>{t('Score')}</SubTitle>
          <View style={styles.row}>
            <IconButton testID="decrease_score_button" onPress={decreaseScore} icon="minus" type="primary" />
            <Title>{character.score}</Title>
            <IconButton testID="increase_score_button" onPress={increaseScore} icon="plus" type="primary" />
          </View>
        </View>
        <View>
          <SubTitle>{t('Skills') + ':'}</SubTitle>
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
        </View>
        <View>
          <SubTitle>{t('Obsessions') + ':'}</SubTitle>
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
        </View>
        <Button testID="save_button" onPress={() => handleSubmit()}>
          {t('Save')}
        </Button>
      </ScrollView>
    </ContentView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  scoreTitle: {
    marginTop: 20,
    textAlign: 'center',
  },
});
