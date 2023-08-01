import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { theme } from '../../theme';
import { SafeView } from '../SafeView';

export const ContentView = ({ children, style, ...rest }: PropsWithChildren<ViewProps>) => {
  return (
    <SafeView>
      <View {...rest} style={[style, styles.container]}>
        {children}
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flex: 1,
  },
});
