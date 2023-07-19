import { FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '../../modules/store';
import { Icon } from '../../components/Icon';
import { SafeView } from '../../components/SafeView';
import { ViewProps } from '../../navigation';

type Props = ViewProps<'Characters'>;

export const CharactersListView = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const characters = useGlobalStore.use.characters();

  useEffect(() => {
    navigation.setOptions({
      title: t('Characters'),
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('CreateCharacter')}>
          <Icon name="plus" />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <SafeView>
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeView>
  );
};
