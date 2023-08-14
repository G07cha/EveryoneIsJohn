import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

import { theme } from '../../theme';

const Dot = ({ style }: { style?: ViewStyle }) => <View style={[styles.dot, style]} />;

export interface DieProps extends ViewProps {
  value: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Die = ({ value, style, ...rest }: DieProps) => {
  const innerComponent = useMemo(() => {
    switch (value) {
      case 1:
        return <Dot style={styles.center} />;
      case 2:
        return (
          <>
            <Dot style={styles.topLeft} />
            <Dot style={styles.bottomRight} />
          </>
        );
      case 3:
        return (
          <>
            <Dot style={styles.topLeft} />
            <Dot style={styles.center} />
            <Dot style={styles.bottomRight} />
          </>
        );
      case 4:
        return (
          <View style={styles.row}>
            <View style={styles.column}>
              <Dot />
              <Dot />
            </View>
            <View style={styles.column}>
              <Dot />
              <Dot />
            </View>
          </View>
        );
      case 5:
        return (
          <View style={styles.row}>
            <View style={styles.column}>
              <Dot />
              <Dot />
            </View>
            <View style={styles.column}>
              <Dot style={styles.center} />
            </View>
            <View style={styles.column}>
              <Dot />
              <Dot />
            </View>
          </View>
        );
      case 6:
        return (
          <View style={styles.row}>
            <View style={styles.column}>
              <Dot />
              <Dot />
              <Dot />
            </View>
            <View style={styles.column}>
              <Dot />
              <Dot />
              <Dot />
            </View>
          </View>
        );
    }
  }, [value]);

  return (
    <View style={[styles.container, style]} {...rest}>
      {innerComponent}
    </View>
  );
};

const DOT_SIZE = 8;

const styles = StyleSheet.create({
  bottomRight: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
  center: {
    alignSelf: 'center',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: DOT_SIZE,
  },
  container: {
    backgroundColor: theme.palette.primary,
    borderRadius: 5,
    height: 50,
    padding: 10,
    width: 50,
    ...theme.shadows.primary,
  },
  dot: {
    backgroundColor: theme.palette.secondary,
    borderRadius: 50,
    height: DOT_SIZE,
    width: DOT_SIZE,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeft: {
    alignSelf: 'flex-start',
  },
});
