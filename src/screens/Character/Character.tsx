import { StyleSheet, Text } from 'react-native';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RootStackScreenProps } from '../../navigation';
import { Character } from '../../modules/Character';
import { useGlobalStore } from '../../modules/store';
import { IconButton } from '../../components/IconButton';
import { ContentView } from '../../components/ContentView';
import { ListItem, ListItemSeparator } from '../../components/ListItem';

import { DieButton } from './components/DieButton';

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

    updateCharacter(characterId, (prevCharacter) => ({
      ...prevCharacter,
      willpower: prevCharacter.willpower - 1,
    }));
  }, [character, characterId, updateCharacter]);

  const increaseWillpower = useCallback(() => {
    updateCharacter(characterId, (prevCharacter) => ({
      ...prevCharacter,
      willpower: prevCharacter.willpower + 1,
    }));
  }, [characterId, updateCharacter]);

  const fulfillObsession = useCallback(
    (obsessionIndex: number) => {
      updateCharacter(characterId, (prevCharacter) => ({
        ...prevCharacter,
        score: prevCharacter.score + obsessionIndex + 1,
      }));
    },
    [characterId, updateCharacter],
  );

  const rollDie = useCallback(
    (willpower: number) => {
      if (willpower === 0) {
        return;
      }

      updateCharacter(characterId, (prevCharacter) => ({
        ...prevCharacter,
        willpower: prevCharacter.willpower - willpower,
      }));
    },
    [characterId, updateCharacter],
  );

  if (!character) {
    navigation.goBack();
    return null;
  }

  return (
    <ContentView testID="character_view" style={styles.container}>
      <Text>{t('Willpower')}</Text>
      <IconButton testID="decrease_willpower_button" onPress={decreaseWillpower} icon="minus" type="primary" />
      <Text testID="character_willpower">{character.willpower}</Text>
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

      <DieButton availableWillpower={character.willpower} onRoll={rollDie} />
    </ContentView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
});
