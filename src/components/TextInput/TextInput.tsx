import React from 'react';
import { StyleSheet, Text, TextInput as TextInputBase, TextInputProps as TextInputBaseProps } from 'react-native';

import { theme } from '../../theme';

type TextInputProps = TextInputBaseProps & {
  error?: string;
};

export const TextInput = ({ error, ...rest }: TextInputProps) => {
  return (
    <>
      <TextInputBase {...rest} />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: theme.palette.error,
  },
});
