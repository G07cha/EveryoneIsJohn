import { FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '../../modules/store';
import { SafeView } from '../../components/SafeView';
import { RootStackScreenProps } from '../../navigation';
import { IconButton } from '../../components/IconButton';

type Props = RootStackScreenProps<'Characters'>;

export type CharactersListScreenParams = undefined;

export const CharactersListScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const characters = useGlobalStore.use.characters();
  const listData = useMemo(() => Array.from(characters.values()).reverse(), [characters]);

  useEffect(() => {
    navigation.setOptions({
      title: t('Characters'),
      headerRight: () => (
        <IconButton
          testID="create_character_button"
          icon="plus"
          onPress={() => navigation.navigate('CreateCharacter')}
        />
      ),
    });
  }, [navigation, t]);

  return (
    <SafeView testID="characters_list_view">
      <FlatList
        data={listData}
        renderItem={({ item: character }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Character', { characterId: character.id })}>
            <Text>{character.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeView>
  );
};
