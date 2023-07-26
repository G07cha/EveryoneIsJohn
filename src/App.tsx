import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';

import { CharactersListScreen } from './screens/CharactersList';
import { CharacterScreen } from './screens/Character';
import { CreateCharacterScreen } from './screens/CreateCharacter';
import { Icon } from './components/Icon';
import { StackParamList } from './navigation';
import { EditCharacterScreen } from './screens/EditCharacter';
import { useGlobalStore } from './modules/store';
import { IntroScreen } from './screens/Intro';
import { theme } from './theme';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  const { t } = useTranslation();
  const hasCharacters = useGlobalStore.use.characters().size > 0;

  useEffect(() => useGlobalStore.persist.onFinishHydration(() => RNBootSplash.hide({ fade: true, duration: 500 })), []);

  const sharedScreenOptions = useCallback(
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
    [],
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={sharedScreenOptions}>
          {hasCharacters === false && (
            <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          )}
          <Stack.Screen name="Characters" component={CharactersListScreen} />
          <Stack.Screen
            name="CreateCharacter"
            component={CreateCharacterScreen}
            options={{
              title: t('New character'),
            }}
          />
          <Stack.Screen name="Character" component={CharacterScreen} options={{ title: '' }} />
          <Stack.Screen name="EditCharacter" component={EditCharacterScreen} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
