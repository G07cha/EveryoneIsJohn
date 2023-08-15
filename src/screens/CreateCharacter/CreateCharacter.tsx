import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { FormikErrors, useFormik } from 'formik';

import { RootStackScreenProps } from '../../navigation';
import { TextInput } from '../../components/TextInput';
import { useGlobalStore } from '../../modules/store';
import { Character } from '../../modules/Character';
import { Button } from '../../components/Button';
import { ContentView } from '../../components/ContentView';
import { Span, SubTitle } from '../../components/Typography';

type Props = RootStackScreenProps<'CreateCharacter'>;

export type CreateCharacterScreenParams = undefined;

export const CreateCharacterScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const addCharacter = useGlobalStore.use.addCharacter();
  const { dirty, handleBlur, handleChange, handleSubmit, values, errors } = useFormik<Omit<Character, 'id'>>({
    initialValues: {
      name: '',
      obsessions: ['', '', ''],
      score: 0,
      skills: ['', '', ''],
      willpower: 0,
    },
    onSubmit: (character) => {
      addCharacter(character);

      // Resetting state to prevent user from going back
      navigation.reset({
        index: 0,
        routes: [{ name: 'Characters' }],
      });
    },
    validate: (values) => {
      const errors: FormikErrors<Character> = {};

      if (!values.name) {
        errors.name = t('Name required error');
      }

      return errors;
    },
  });

  useEffect(() => {
    navigation.addListener('beforeRemove', (event) => {
      if (!dirty || event.data.action.type !== 'GO_BACK') {
        return;
      }

      event.preventDefault();

      Alert.alert(t('Cancel character creation'), t('Cancel character creation description'), [
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

  return (
    <ContentView testID="create_character_view">
      <ScrollView contentContainerStyle={styles.container} automaticallyAdjustKeyboardInsets>
        <TextInput
          testID="name_input"
          placeholder={t('Name')}
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          value={values.name}
          error={errors.name}
        />
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
          <Span>{t('Third skill willpower tip')}</Span>
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
});
