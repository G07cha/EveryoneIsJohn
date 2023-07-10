import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import { CharactersListView } from './views/CharactersList';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Hello world!</Text>
    </SafeAreaView>
  );
}

export default App;
