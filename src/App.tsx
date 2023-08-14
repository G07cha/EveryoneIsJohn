import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNBootSplash from 'react-native-bootsplash';
import { LaunchArguments } from 'react-native-launch-arguments';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { CharactersListScreen } from './screens/CharactersList';
import { CharacterScreen } from './screens/Character';
import { CreateCharacterScreen } from './screens/CreateCharacter';
import { StackParamList } from './navigation';
import { EditCharacterScreen } from './screens/EditCharacter';
import { GlobalStoreState, useGlobalStore } from './modules/store';
import { IntroScreen } from './screens/Intro';
import { theme } from './theme';
import { IconButton } from './components/IconButton';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): JSX.Element {
  const { t } = useTranslation();
  const [hasCharacters, setHasCharacters] = useState(false);

  useEffect(
    () =>
      useGlobalStore.persist.onFinishHydration(() => {
        const { store } = LaunchArguments.value<{ store?: Partial<GlobalStoreState> }>();

        if (store) {
          useGlobalStore.setState((prevState) => ({
            ...prevState,
            ...store,
            ...(store.characters && { characters: new Map(store.characters) }),
          }));
        }

        // Checking characters list on load to prevent unnecessary rerenders when it changes, causes extra animation when app is reloaded on dev which doesn't happen in packaged application
        setHasCharacters(useGlobalStore.getState().characters.size > 0);
        RNBootSplash.hide({ fade: true, duration: 500 });
      }),
    [],
  );

  const sharedScreenOptions = useCallback(
    ({ navigation }: NativeStackScreenProps<StackParamList>): NativeStackNavigationOptions => ({
      headerLeft: ({ canGoBack }) => {
        return canGoBack ? <IconButton icon="chevronLeft" onPress={navigation.goBack} /> : null;
      },
      headerStyle: {
        backgroundColor: theme.palette.primary,
      },
      headerShadowVisible: false,
      headerTintColor: theme.palette.secondary,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      animation: 'slide_from_bottom',
    }),
    [],
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={sharedScreenOptions}>
          {hasCharacters === false && (
            <Stack.Screen
              name="Intro"
              component={gestureHandlerRootHOC(IntroScreen)}
              options={{ headerShown: false }}
            />
          )}
          <Stack.Screen name="Characters" component={gestureHandlerRootHOC(CharactersListScreen)} />
          <Stack.Screen
            name="CreateCharacter"
            component={gestureHandlerRootHOC(CreateCharacterScreen)}
            options={{
              title: t('New character'),
            }}
          />
          <Stack.Screen name="Character" component={gestureHandlerRootHOC(CharacterScreen)} options={{ title: '' }} />
          <Stack.Screen
            name="EditCharacter"
            component={gestureHandlerRootHOC(EditCharacterScreen)}
            options={{ title: '' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default gestureHandlerRootHOC(App);
