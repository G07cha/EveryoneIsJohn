import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CharactersListView } from './views/CharactersList';
import { useTheme } from './helpers/use-theme';

export type StackParamList = {
  Characters: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.palette.primary,
          },
          headerTintColor: theme.palette.secondary,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Characters" component={CharactersListView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
