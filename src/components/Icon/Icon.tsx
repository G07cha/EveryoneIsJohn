import React from 'react';
import VectorImage from 'react-native-vector-image';

const ICON_FILES = {
  plus: require('../../assets/icons/plus.svg'),
  minus: require('../../assets/icons/minus.svg'),
  pencil: require('../../assets/icons/pencil.svg'),
  chevronLeft: require('../../assets/icons/chevron-left.svg'),
};

export interface Props {
  name: keyof typeof ICON_FILES;
}

export const Icon = ({ name }: Props) => <VectorImage source={ICON_FILES[name]} />;
