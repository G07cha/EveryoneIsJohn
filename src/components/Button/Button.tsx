import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BorderlessButtonProps, RectButton } from 'react-native-gesture-handler';

import { theme } from '../../theme';

export interface ButtonProps extends Pick<BorderlessButtonProps, 'onPress'> {
  testID?: string;
  children: string;
}

export const Button = ({ children, testID, ...rest }: ButtonProps) => (
  <RectButton {...rest} style={styles.buttonContainer}>
    <View accessible accessibilityRole="button" testID={testID}>
      <Text style={styles.text}>{children}</Text>
    </View>
  </RectButton>
);

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: theme.palette.primary,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
    ...theme.shadows.primary,
  },
  text: {
    color: theme.palette.secondary,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
