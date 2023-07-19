import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  Characters: undefined;
  CreateCharacter: undefined;
};

export type ViewProps<Screen extends keyof StackParamList> = NativeStackScreenProps<StackParamList, Screen>;
