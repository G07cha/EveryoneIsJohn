import React from 'react';
import { StyleSheet, TextInput as TextInputBase, TextInputProps as TextInputBaseProps, View } from 'react-native';

import { theme } from '../../theme';
import { Span } from '../Typography';

type TextInputProps = TextInputBaseProps & {
  error?: string;
};

export const TextInput = ({ error, style, ...rest }: TextInputProps) => {
  return (
    <View>
      <TextInputBase {...rest} style={style ? [styles.input, style] : styles.input} />
      {error ? <Span style={styles.errorText}>{error}</Span> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: theme.palette.error,
  },
  input: {
    backgroundColor: theme.palette.secondary,
    borderRadius: 5,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 5,
    marginTop: 5,
    overflow: 'visible',
    paddingHorizontal: 15,
    paddingVertical: 10,
    ...theme.shadows.primary,
  },
});
