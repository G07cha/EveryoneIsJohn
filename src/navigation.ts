import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CharacterViewParams } from './views/Character';
import { CharactersListViewParams } from './views/CharactersList';
import { CreateCharacterViewParams } from './views/CreateCharacter';

export type StackParamList = {
  Characters: CharactersListViewParams;
  CreateCharacter: CreateCharacterViewParams;
  Character: CharacterViewParams;
};

export type ViewProps<Screen extends keyof StackParamList> = NativeStackScreenProps<StackParamList, Screen>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
