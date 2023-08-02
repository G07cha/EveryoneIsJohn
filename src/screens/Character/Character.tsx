import { Text } from 'react-native';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RootStackScreenProps } from '../../navigation';
import { Character } from '../../modules/Character';
import { useGlobalStore } from '../../modules/store';
import { IconButton } from '../../components/IconButton';
import { ContentView } from '../../components/ContentView';
import { ListItem, ListItemSeparator } from '../../components/ListItem';

type Props = RootStackScreenProps<'Character'>;

export type CharacterScreenParams = { characterId: Character['id'] };

export const CharacterScreen = ({ navigation, route }: Props) => {
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
      headerRight: () => (
        <IconButton
          icon="pencil"
          testID="edit_character_button"
          onPress={() => navigation.navigate('EditCharacter', { characterId: character.id })}
        />
      ),
    });
  }, [character, navigation]);

  const decreaseWillpower = useCallback(() => {
    if (!character || character.willpower <= 0) {
      return;
    }

    updateCharacter({
      ...character,
      willpower: character.willpower - 1,
    });
  }, [character, updateCharacter]);

  const increaseWillpower = useCallback(() => {
    if (!character) {
      return;
    }

    updateCharacter({
      ...character,
      willpower: character.willpower + 1,
    });
  }, [character, updateCharacter]);

  const fulfillObsession = useCallback(
    (obsessionIndex: number) => {
      if (!character) {
        return;
      }

      updateCharacter({
        ...character,
        score: character.score + obsessionIndex + 1,
      });
    },
    [character, updateCharacter],
  );

  if (!character) {
    navigation.goBack();
    return null;
  }

  return (
    <ContentView testID="character_view">
      <Text>{t('Willpower')}</Text>
      <IconButton testID="decrease_willpower_button" onPress={decreaseWillpower} icon="minus" type="primary" />
      <Text>{character.willpower}</Text>
      <IconButton testID="increase_willpower_button" onPress={increaseWillpower} icon="plus" type="primary" />
      <Text>{t('Skills')}:</Text>
      {character.skills.map((skill, index) => (
        <Text key={index}>{skill}</Text>
      ))}
      <Text>{t('Obsessions')}:</Text>
      {character.obsessions.map((obsession, index) => (
        <Fragment key={index}>
          <ListItemSeparator />
          <ListItem testID={`fullfil_obsession_${index + 1}_button`} onPress={() => fulfillObsession(index)}>
            <Text>
              {obsession} {t('point', { count: index + 1 })}
            </Text>
          </ListItem>
        </Fragment>
      ))}
      <ListItemSeparator />
    </ContentView>
  );
};
