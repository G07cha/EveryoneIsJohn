import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { theme } from '../../theme';

export const Title = (props: TextProps) => (
  <Text {...props} style={props.style ? [styles.title, props.style] : styles.title} />
);

export const SubTitle = (props: TextProps) => (
  <Text {...props} style={props.style ? [styles.subtitle, props.style] : styles.subtitle} />
);

export const Span = (props: TextProps) => (
  <Text {...props} style={props.style ? [styles.span, props.style] : styles.span} />
);

const styles = StyleSheet.create({
  span: {
    color: theme.palette.font,
    fontSize: 16,
  },
  subtitle: {
    color: theme.palette.font,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 5,
  },
  title: {
    color: theme.palette.font,
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
});
