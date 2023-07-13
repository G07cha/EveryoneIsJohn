import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { CharactersListView } from './views/CharactersList';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={t('Characters')} component={CharactersListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
