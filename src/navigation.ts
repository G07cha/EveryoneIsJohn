import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { CharacterViewParams } from './views/Character';
import { CharactersListViewParams } from './views/CharactersList';
import { CreateCharacterViewParams } from './views/CreateCharacter';
import { EditCharacterViewParams } from './views/EditCharacter';
import { IntroViewParams } from './views/Intro';

export type StackParamList = {
  Intro: IntroViewParams;
  Characters: CharactersListViewParams;
  CreateCharacter: CreateCharacterViewParams;
  Character: CharacterViewParams;
  EditCharacter: EditCharacterViewParams;
};

export type StackViewProps<Screen extends keyof StackParamList> = NativeStackScreenProps<StackParamList, Screen>;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends StackParamList {}
  }
}
