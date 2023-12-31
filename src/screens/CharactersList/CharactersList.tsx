import { Alert, FlatList } from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '../../modules/store';
import { RootStackScreenProps } from '../../navigation';
import { IconButton } from '../../components/IconButton';
import { ListItem, ListItemSeparator } from '../../components/ListItem';
import { Character } from '../../modules/Character';
import { ContentView } from '../../components/ContentView';
import { Span } from '../../components/Typography';

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
    <ContentView testID="characters_list_view">
      <FlatList
        data={listData}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item: character }) => (
          <ListItem
            onPress={() => navigation.navigate('Character', { characterId: character.id })}
            onDelete={() => onDelete(character)}
            testID={`character_${character.id}`}
          >
            <Span>{character.name + ' (' + t('Score').toLocaleLowerCase() + ': ' + character.score + ')'}</Span>
          </ListItem>
        )}
      />
    </ContentView>
  );
};
