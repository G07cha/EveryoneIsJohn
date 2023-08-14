import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { usePopover, Popover } from 'react-native-modal-popover';

import { Die, DieProps } from '../../../components/Die';
import { NumberCarousel } from '../../../components/NumberCarousel';
import { theme } from '../../../theme';

export interface DieButtonProps {
  availableWillpower: number;
  onRoll: (spentWillpower: number) => void;
}

enum RollingStage {
  initial,
  active,
  completed,
}

const ANIMATION_DURATION = 2000;
const ANIMATION_FREQUENCY = 75;

export const DieButton = ({ onRoll, availableWillpower }: DieButtonProps) => {
  const { openPopover, closePopover, popoverVisible, touchableRef, popoverAnchorRect } = usePopover();
  const { t } = useTranslation();
  const [rollingStage, setRollingStage] = useState<RollingStage>(RollingStage.initial);
  const [dieValue, setDieValue] = useState<DieProps['value']>(6);
  const storedSpentWillpower = useRef(0);
  const resultTranslateYOpacity = useRef(new Animated.ValueXY({ x: 20, y: 0 })).current;

  const resetAnimation = useCallback(() => {
    setRollingStage(RollingStage.initial);
    Animated.timing(resultTranslateYOpacity, {
      toValue: { x: 0, y: 20 },
      duration: ANIMATION_DURATION / 2,
      useNativeDriver: true,
    }).start();
  }, [resultTranslateYOpacity]);

  const handleSubmit = useCallback(
    (spentWillpower: number) => {
      storedSpentWillpower.current = spentWillpower;
      onRoll(spentWillpower);
      closePopover();
      setRollingStage(RollingStage.active);
      const dieRollInterval = setInterval(() => {
        setDieValue((prevValue) => (prevValue >= 6 ? 1 : prevValue + 1) as DieProps['value']);
      }, ANIMATION_FREQUENCY);

      setTimeout(() => {
        setDieValue(Math.floor(Math.random() * 6 + 1) as DieProps['value']);
        clearInterval(dieRollInterval);
        setRollingStage(RollingStage.completed);
        Animated.timing(resultTranslateYOpacity, {
          toValue: { x: 1, y: 0 },
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (!finished) {
            return;
          }

          setTimeout(resetAnimation, ANIMATION_DURATION);
        });
      }, ANIMATION_DURATION);
    },
    [closePopover, onRoll, resetAnimation, resultTranslateYOpacity],
  );

  const showPopover = useCallback(() => {
    openPopover();
    resetAnimation();
  }, [openPopover, resetAnimation]);

  return (
    <>
      <View style={styles.dieContainer}>
        <Animated.Text
          style={[
            styles.outcomeText,
            {
              transform: [{ translateY: resultTranslateYOpacity.y }],
              opacity: resultTranslateYOpacity.x,
            },
          ]}
          testID="roll_result_text"
        >
          {dieValue} + {storedSpentWillpower.current} = {dieValue + storedSpentWillpower.current}
        </Animated.Text>
        <BorderlessButton onPress={showPopover} enabled={rollingStage !== RollingStage.active} ref={touchableRef}>
          <Die style={styles.die} accessible accessibilityRole="button" testID="roll_die_button" value={dieValue} />
        </BorderlessButton>
      </View>
      <Popover
        visible={popoverVisible}
        onClose={closePopover}
        fromRect={popoverAnchorRect}
        placement="top"
        contentStyle={styles.popoverView}
      >
        <Text>{t('Add willpower?')}</Text>
        <Text>{t('Add willpower description')}</Text>
        <NumberCarousel min={0} max={availableWillpower} onPress={handleSubmit} />
      </Popover>
    </>
  );
};

const styles = StyleSheet.create({
  die: {
    alignSelf: 'center',
  },
  dieContainer: {
    alignSelf: 'center',
  },
  outcomeText: {
    color: theme.palette.font,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 5,
  },
  popoverView: {
    borderRadius: 5,
    maxWidth: Dimensions.get('window').width - 30,
    // To allow scrolling in ScrollView
    position: 'relative',
  },
});
