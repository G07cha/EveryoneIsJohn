import { FlatList, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useGlobalStore } from '../../modules/store';
import { StackParamList } from '../../App';
import { Icon } from '../../components/Icon';
import { SafeView } from '../../components/SafeView';

type Props = NativeStackScreenProps<StackParamList, 'Characters'>;

export const CharactersListView = ({ navigation }: Props) => {
  const { t } = useTranslation();
  const characters = useGlobalStore.use.characters();

  useEffect(() => {
    navigation.setOptions({
      title: t('Characters'),
      headerRight: () => <Icon name="plus" />,
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
