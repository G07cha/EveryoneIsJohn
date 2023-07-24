import React from 'react';
import { Image as BaseImage, ImageProps as BaseImageProps } from 'react-native';

const IMAGE_FILES = {
  logo: require('../../assets/images/logo.jpg'),
  characterArt: require('../../assets/images/character-art.jpg'),
};

export interface Props extends Omit<BaseImageProps, 'source'> {
  name: keyof typeof IMAGE_FILES;
}

export const Image = ({ name, ...rest }: Props) => <BaseImage {...rest} source={IMAGE_FILES[name]} />;
