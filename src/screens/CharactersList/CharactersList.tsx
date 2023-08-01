import { Alert, FlatList, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '../../modules/store';
import { SafeView } from '../../components/SafeView';
import { RootStackScreenProps } from '../../navigation';
import { IconButton } from '../../components/IconButton';
import { ListItem, ListItemSeparator } from '../../components/ListItem';
import { Character } from '../../modules/Character';

type Props = RootStackScreenProps<'Characters'>;

export type CharactersListScreenParams = undefined;

export const CharactersListScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const characters = useGlobalStore.use.characters();
  const removeCharacter = useGlobalStore.use.removeCharacter();
  const listData = useMemo(() => Array.from(characters.values()).reverse(), [characters]);

  const onDelete = useCallback(
    (character: Character) => {
      Alert.alert(t('Delete character?', { name: character.name }), t('Delete character description'), [
        {
          style: 'cancel',
          text: t('Cancel'),
        },
        {
          style: 'destructive',
          text: t('Delete'),
          onPress: () => removeCharacter(character.id),
        },
      ]);
    },
    [removeCharacter, t],
  );

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
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item: character }) => (
          <ListItem
            onPress={() => navigation.navigate('Character', { characterId: character.id })}
            onDelete={() => onDelete(character)}
            testID={`character-${character.id}`}
          >
            <Text>
              {character.name} ({t('Score').toLocaleLowerCase()}: {character.score})
            </Text>
          </ListItem>
        )}
      />
    </SafeView>
  );
};
