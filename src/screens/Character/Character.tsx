import { StyleSheet, View } from 'react-native';
import React, { Fragment, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RootStackScreenProps } from '../../navigation';
import { Character } from '../../modules/Character';
import { useGlobalStore } from '../../modules/store';
import { IconButton } from '../../components/IconButton';
import { ContentView } from '../../components/ContentView';
import { ListItem, ListItemSeparator } from '../../components/ListItem';
import { Span, SubTitle, Title } from '../../components/Typography';

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
      <View>
        <SubTitle style={styles.willpowerTitle}>{t('Willpower')}</SubTitle>
        <View style={styles.row}>
          <IconButton testID="decrease_willpower_button" onPress={decreaseWillpower} icon="minus" type="primary" />
          <Title testID="character_willpower">{character.willpower}</Title>
          <IconButton testID="increase_willpower_button" onPress={increaseWillpower} icon="plus" type="primary" />
        </View>
      </View>
      <View style={styles.skillsContainer}>
        <SubTitle>{t('Skills') + ':'}</SubTitle>
        <View style={styles.skillsList}>
          {character.skills.map((skill, index) => (
            <Span key={index}>{skill}</Span>
          ))}
        </View>
      </View>
      <View>
        <SubTitle style={styles.obsessionsTitle}>{t('Obsessions') + ':'}</SubTitle>
        {character.obsessions.map((obsession, index) => (
          <Fragment key={index}>
            <ListItemSeparator />
            <ListItem testID={`fullfil_obsession_${index + 1}_button`} onPress={() => fulfillObsession(index)}>
              <Span style={styles.obsessionText}>{obsession + ' ' + t('point', { count: index + 1 })}</Span>
            </ListItem>
          </Fragment>
        ))}
        <ListItemSeparator />
      </View>

      <DieButton availableWillpower={character.willpower} onRoll={rollDie} />
    </ContentView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
  },
  obsessionText: {
    paddingLeft: 10,
  },
  obsessionsTitle: {
    paddingLeft: 10,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  skillsContainer: {
    padding: 10,
  },
  skillsList: {
    gap: 10,
  },
  willpowerTitle: {
    marginTop: 20,
    textAlign: 'center',
  },
});
