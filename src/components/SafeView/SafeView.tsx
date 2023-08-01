import React, { PropsWithChildren, useMemo } from 'react';
import { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SafeView = ({ children, style, ...rest }: PropsWithChildren<ViewProps>) => {
  const insets = useSafeAreaInsets();
  const combinedStyles = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },
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
