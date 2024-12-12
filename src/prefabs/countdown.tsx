import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Countdown } from './structures/Countdown';

const attributes = {
  category: 'CONTENT',
  icon: Icon.TimePickerIcon,
  keywords: [''],
};

export default prefab('Countdown', attributes, undefined, [Countdown({})]);
