import React from 'react';
import { Text, TextInput as TextInputBase, TextInputProps as TextInputBaseProps } from 'react-native';

import { useTheme } from '../../helpers/use-theme';

type TextInputProps = TextInputBaseProps & {
  error?: string;
};

export const TextInput = ({ error, ...rest }: TextInputProps) => {
  const theme = useTheme();

  return (
    <>
      <TextInputBase {...rest} />
      {error ? <Text style={{ color: theme.palette.error }}>{error}</Text> : null}
    </>
  );
};
