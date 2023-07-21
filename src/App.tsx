import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';

import { CharactersListView } from './views/CharactersList';
import { CharacterView } from './views/Character';
import { CreateCharacterView } from './views/CreateCharacter';
import { Icon } from './components/Icon';
import { StackParamList } from './navigation';
import { useTheme } from './helpers/use-theme';
import { EditCharacterView } from './views/EditCharacter';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  const theme = useTheme();
  const { t } = useTranslation();
  const screenOptions = useCallback(
    ({ navigation }: NativeStackScreenProps<StackParamList>): NativeStackNavigationOptions => ({
      headerLeft: ({ canGoBack }) => {
        return canGoBack ? (
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="chevronLeft" />
          </TouchableOpacity>
        ) : null;
      },
      headerStyle: {
        backgroundColor: theme.palette.primary,
      },
      headerTintColor: theme.palette.secondary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }),
    [theme],
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name="Characters" component={CharactersListView} />
        <Stack.Screen
          name="CreateCharacter"
          component={CreateCharacterView}
          options={{
            title: t('New character'),
          }}
        />
        <Stack.Screen name="Character" component={CharacterView} options={{ title: '' }} />
        <Stack.Screen name="EditCharacter" component={EditCharacterView} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
