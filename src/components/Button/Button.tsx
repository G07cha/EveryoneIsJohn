import React from 'react';
import { Button as BaseButton, ButtonProps as BaseButtonProps } from 'react-native';

export type ButtonProps = BaseButtonProps;

export const Button = (props: ButtonProps) => <BaseButton {...props} />;
