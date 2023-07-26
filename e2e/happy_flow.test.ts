import { by, device, expect, element } from 'detox';
import { describe, beforeAll, it } from '@jest/globals';

import { Character } from '../src/modules/Character';

import { characterScreen, charactersListScreen, createCharacterScreen, editCharacterScreen, introScreen } from './ids';

describe('Happy flow', () => {
  const character: Omit<Character, 'id' | 'score' | 'willpower'> = {
    name: 'Character name',
    obsessions: ['First obsession', 'Second obsession', 'Third obsession'],
    skills: ['First skill', 'Second skill', 'Third skill'],
  };

  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  describe('Create first character', () => {
    it('should have intro screen', async () => {
      await expect(element(by.id(introScreen.view))).toBeVisible();
    });

    it('should show create character screen after pressing on intro button', async () => {
      await element(by.id(introScreen.createCharacterButton)).tap();

      await expect(element(by.id(createCharacterScreen.view))).toBeVisible();
    });

    it('should be able to submit filled out form', async () => {
      await element(by.id(createCharacterScreen.nameInput)).typeText(character.name);

      await element(by.id(createCharacterScreen.firstSkillInput)).typeText(character.skills[0]);
      await element(by.id(createCharacterScreen.secondSkillInput)).typeText(character.skills[1]);
      await element(by.id(createCharacterScreen.thirdSkillInput)).typeText(character.skills[2]);

      await element(by.id(createCharacterScreen.firstObsessionInput)).typeText(character.obsessions[0]);
      await element(by.id(createCharacterScreen.secondObsessionInput)).typeText(character.obsessions[1]);
      await element(by.id(createCharacterScreen.thirdObsessionInput)).typeText(character.obsessions[2]);

      await element(by.id(createCharacterScreen.saveButton)).tap();

      await expect(element(by.id(charactersListScreen.view))).toBeVisible();
      await expect(element(by.text(character.name))).toBeVisible();
    });

    it('should correctly save entered data', async () => {
      await element(by.text(character.name)).tap();
      await expect(element(by.id(characterScreen.view))).toBeVisible();
      await expect(element(by.text(character.name))).toBeVisible();

      for (const skill of character.skills) {
        await expect(element(by.text(skill))).toBeVisible();
      }

      for (const obsession of character.obsessions) {
        await expect(element(by.text(new RegExp(`^${obsession}\\s.*`)))).toBeVisible();
      }
    });
  });

  describe('Edit character', () => {
    it('should show character list on app reload when at least one character is present', async () => {
      await device.reloadReactNative();
      await expect(element(by.id(charactersListScreen.view))).toBeVisible();
    });

    it('should open edit view', async () => {
      await element(by.text(character.name)).tap();
      await element(by.id(characterScreen.editCharacterButton)).tap();

      await expect(element(by.id(editCharacterScreen.view))).toBeVisible();
    });

    it('should apply entered changes', async () => {
      await element(by.id(editCharacterScreen.firstSkillInput)).typeText(' + edit skills');
      await element(by.id(editCharacterScreen.secondSkillInput)).typeText(' + edit skills');
      await element(by.id(editCharacterScreen.thirdSkillInput)).typeText(' + edit skills');

      await element(by.id(editCharacterScreen.firstObsessionInput)).typeText(' + edit obsessions');
      await element(by.id(editCharacterScreen.secondObsessionInput)).typeText(' + edit obsessions');
      await element(by.id(editCharacterScreen.thirdObsessionInput)).typeText(' + edit obsessions');

      await element(by.id(editCharacterScreen.saveButton)).tap();

      await expect(element(by.id(characterScreen.view))).toBeVisible();

      for (const skill of character.skills) {
        await expect(element(by.text(`${skill} + edit skills`))).toBeVisible();
      }

      for (const obsession of character.obsessions) {
        await expect(element(by.text(new RegExp(`^${obsession} \\+ edit obsessions\\s.*`)))).toBeVisible();
      }
    });
  });
});
