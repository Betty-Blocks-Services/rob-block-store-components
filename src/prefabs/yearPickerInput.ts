import { Icon, prefab as makePrefab } from '@betty-blocks/component-sdk';
import { DateTimePicker } from './structures/DateTimePicker';

const attributes = {
  category: 'FORM',
  icon: Icon.DatePickerIcon,
  keywords: ['Form', 'input'],
};

export default makePrefab('Year Picker', attributes, undefined, [
  DateTimePicker({
    label: 'Year picker',
    inputLabel: 'Year',
    dataComponentAttribute: 'Year Input',
    inputType: 'year',
  }),
]);
