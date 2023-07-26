import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CharacterScreenParams } from './screens/Character';
import { CharactersListScreenParams } from './screens/CharactersList';
import { CreateCharacterScreenParams } from './screens/CreateCharacter';
import { EditCharacterScreenParams } from './screens/EditCharacter';
import { IntroScreenParams } from './screens/Intro';

export type StackParamList = {
  Intro: IntroScreenParams;
  Characters: CharactersListScreenParams;
  CreateCharacter: CreateCharacterScreenParams;
  Character: CharacterScreenParams;
  EditCharacter: EditCharacterScreenParams;
};

export type RootStackScreenProps<Screen extends keyof StackParamList> = NativeStackScreenProps<StackParamList, Screen>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
