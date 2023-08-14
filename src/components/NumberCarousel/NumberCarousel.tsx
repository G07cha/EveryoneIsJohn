import React, { useMemo, Fragment } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { theme } from '../../theme';

export interface NumberCarouselProps {
  min: number;
  max: number;
  onPress?: (value: number) => void;
}

export const NumberCarousel = ({ max, min, onPress }: NumberCarouselProps) => {
  const items = useMemo(() => new Array(max - min + 1).fill(0).map((_, index) => min + index), [max, min]);
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        {items.map((item) => (
          <Fragment key={item}>
            <TouchableOpacity style={styles.item} onPress={() => onPress?.(item)} testID={`${item}_carousel_button`}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

const ITEM_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: ITEM_SIZE,
  },
  item: {
    alignItems: 'center',
    borderColor: theme.palette.primary,
    borderRadius: 5,
    borderWidth: 1,
    height: ITEM_SIZE,
    justifyContent: 'center',
    marginRight: 5,
    width: ITEM_SIZE,
  },
  itemText: {
    color: theme.palette.font,
    fontSize: 18,
  },
});
