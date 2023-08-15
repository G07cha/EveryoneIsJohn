import React from 'react';
import { StyleSheet, TextInput as TextInputBase, TextInputProps as TextInputBaseProps, View } from 'react-native';

import { theme } from '../../theme';
import { Span } from '../Typography';

type TextInputProps = TextInputBaseProps & {
  error?: string;
};

export const TextInput = ({ error, ...rest }: TextInputProps) => {
  return (
    <View>
      <TextInputBase {...rest} />
      {error ? <Span style={styles.errorText}>{error}</Span> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: theme.palette.error,
  },
});
