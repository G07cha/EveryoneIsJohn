import React from 'react';
import { TextInput as TextInputBase, TextInputProps as TextInputBaseProps } from 'react-native';

type TextInputProps = TextInputBaseProps;

export const TextInput = (props: TextInputProps) => {
  return <TextInputBase {...props} />;
};
