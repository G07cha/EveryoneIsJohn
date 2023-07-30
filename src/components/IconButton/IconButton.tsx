import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BorderlessButton, BorderlessButtonProps } from 'react-native-gesture-handler';

import { Icon, IconProps } from '../Icon/Icon';
import { theme } from '../../theme';

export interface IconButtonProps extends Pick<BorderlessButtonProps, 'onPress'> {
  testID?: string;
  icon: IconProps['name'];
  type?: 'transparent' | 'primary';
}

export const IconButton = ({ icon, type, testID, ...rest }: IconButtonProps) => (
  <BorderlessButton {...rest} style={styles.buttonContainer}>
    <View
      testID={testID}
      accessible
      accessibilityRole="button"
      style={
        type === 'primary'
          ? [
              styles.button,
              {
                backgroundColor: theme.palette.primary,
                ...theme.shadows.primary,
              },
            ]
          : styles.button
      }
    >
      <Icon name={icon} />
    </View>
  </BorderlessButton>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 5,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
