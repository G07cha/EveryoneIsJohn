import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

import { theme } from '../../theme';

export interface ButtonProps extends Pick<BorderlessButtonProps, 'onPress'> {
  testID?: string;
  children: string;
}

export const Button = ({ children, testID, ...rest }: ButtonProps) => (
  <BorderlessButton {...rest} style={styles.buttonContainer}>
    <View accessible accessibilityRole="button" style={styles.button} testID={testID}>
      <Text style={styles.text}>{children}</Text>
    </View>
  </BorderlessButton>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: theme.palette.primary,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    ...theme.shadows.primary,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    color: theme.palette.secondary,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
