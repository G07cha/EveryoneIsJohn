import { Button, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../components/Icon';
import { SafeView } from '../../components/SafeView';
import { ViewProps } from '../../navigation';
import { Character } from '../../modules/Character';
import { useGlobalStore } from '../../modules/store';

type Props = ViewProps<'Character'>;

export type CharacterViewParams = { characterId: Character['id'] };

export const CharacterView = ({ navigation, route }: Props) => {
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
        <TouchableOpacity onPress={() => navigation.navigate('CreateCharacter')}>
          <Icon name="plus" />
        </TouchableOpacity>
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
        score: character.score - (obsessionIndex + 1),
      });
    },
    [character, updateCharacter],
  );

  if (!character) {
    navigation.goBack();
    return null;
  }

  return (
    <SafeView>
      <Text>{t('Willpower')}</Text>
      <Button title="-" onPress={decreaseWillpower} disabled={character.willpower <= 0} />
      <Text>{character.willpower}</Text>
      <Button title="+" onPress={increaseWillpower} />
      <Text>{t('Skills')}:</Text>
      {character.skills.map((skill, index) => (
        <Text key={index}>{skill}</Text>
      ))}
      <Text>{t('Obsessions')}:</Text>
      {character.obsessions.map((obsession, index) => (
        <TouchableOpacity key={index} onPress={() => fulfillObsession(index)}>
          <Text>
            {obsession} {t('point', { count: index + 1 })}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeView>
  );
};
