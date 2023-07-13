import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { useGlobalStore } from '../../modules/store';

export const CharactersListView = () => {
  const characters = useGlobalStore.use.characters();

  return (
    <View>
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
