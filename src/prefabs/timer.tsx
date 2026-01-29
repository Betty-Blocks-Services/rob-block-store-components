import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Timer } from './structures';

const attributes = {
  category: 'LOGIC',
  icon: Icon.TimePickerIcon,
  keywords: ['timer', 'auto', 'submit', 'clock', 'countdown', 'stopwatch'],
};

export default prefab('Timer', attributes, undefined, [Timer({})]);
