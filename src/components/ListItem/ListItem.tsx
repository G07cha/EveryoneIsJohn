import React, { PropsWithChildren, useCallback } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { TouchableOpacity, Swipeable, RectButton } from 'react-native-gesture-handler';
// TODO: Use TouchableOpacityProps from react-native-gesture-handler once https://github.com/software-mansion/react-native-gesture-handler/pull/2556 is merged
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
// TODO: Replace for direct import once https://github.com/software-mansion/react-native-gesture-handler/pull/2561 is merged
import { SwipeableProps } from 'react-native-gesture-handler/lib/typescript/components/Swipeable';

import { theme } from '../../theme';

export interface ListItemProps extends Omit<GenericTouchableProps, 'style'> {
  onDelete?: () => void;
}

export const ListItem = ({ children, onDelete, testID, ...rest }: PropsWithChildren<ListItemProps>) => {
  const renderRightActions = useCallback<Required<SwipeableProps>['renderRightActions']>(
    (progress, _, swipeable) => {
      const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
      });

      return (
        <Animated.View
          style={{
            transform: [{ translateX }],
          }}
        >
          <RectButton
            style={styles.deleteButton}
            onPress={() => {
              onDelete?.();
              swipeable.close();
            }}
          >
            <View accessible accessibilityRole="button" testID="delete_character_button">
              <Animated.Text style={styles.deleteText}>Delete</Animated.Text>
            </View>
          </RectButton>
        </Animated.View>
      );
    },
    [onDelete],
  );

  return onDelete ? (
    // testID has to be specified on Swipeable for Android to pick it up
    <Swipeable testID={testID} overshootRight={false} renderRightActions={renderRightActions}>
      <TouchableOpacity {...rest} style={styles.listItem}>
        {children}
      </TouchableOpacity>
    </Swipeable>
  ) : (
    <TouchableOpacity {...rest} testID={testID} style={styles.listItem}>
      {children}
    </TouchableOpacity>
  );
};

export const ListItemSeparator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  deleteButton: {
    alignItems: 'center',
    backgroundColor: theme.palette.error,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  deleteText: {
    color: theme.palette.secondary,
  },
  listItem: {
    paddingBottom: 15,
    paddingLeft: 5,
    paddingTop: 15,
  },
  separator: {
    backgroundColor: theme.palette.primary,
    height: 1,
  },
});
