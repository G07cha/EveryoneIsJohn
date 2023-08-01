import React, { PropsWithChildren, useMemo } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../theme';

export const SafeView = ({ children, style, ...rest }: PropsWithChildren<ViewProps>) => {
  const insets = useSafeAreaInsets();
  const combinedStyles = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },
      styles.container,
      style,
    ],
    [insets, style],
  );

  return (
    <View {...rest} style={combinedStyles}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    flex: 1,
  },
});
