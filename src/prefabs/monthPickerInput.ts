import { Icon, prefab as makePrefab } from '@betty-blocks/component-sdk';
import { DateTimePicker } from './structures/DateTimePicker';

const attributes = {
  category: 'FORM',
  icon: Icon.DatePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('Month Picker', attributes, undefined, [
  DateTimePicker({
    label: 'Month picker',
    inputLabel: 'Month',
    dataComponentAttribute: 'Month Input',
    inputType: 'month',
  }),
]);
