import React, { PropsWithChildren, useMemo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const SafeView = ({ children }: PropsWithChildren<unknown>) => {
  const insets = useSafeAreaInsets();
  const style = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }),
    [insets],
  );

  return <View style={style}>{children}</View>;
};
