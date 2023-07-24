import React, { PropsWithChildren, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SafeView = ({ children, style }: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
  const insets = useSafeAreaInsets();
  const combinedStyles = useMemo<StyleProp<ViewStyle>>(
    () => [
      {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      },
      style,
    ],
    [insets, style],
  );

  return <View style={combinedStyles}>{children}</View>;
};
