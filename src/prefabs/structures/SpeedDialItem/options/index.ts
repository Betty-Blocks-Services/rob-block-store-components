import {
  variable,
  color,
  ThemeColor,
  icon,
  hideIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['iconColor', 'textColor'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const speedDialItemOptions = {
  label: variable('Label', {
    value: ['SpeedDial Item'],
    configuration: {
      showOnDrop: true,
    },
  }),
  icon: icon('Icon', {
    value: 'Check',
    configuration: {
      showOnDrop: true,
    },
  }),
  iconColor: color('Icon color', {
    value: ThemeColor.PRIMARY,
    configuration: { condition: hideIf('icon', 'EQ', 'none') },
  }),
  textColor: color('Text color', { value: ThemeColor.PRIMARY }),

  ...advanced('SpeedDial item'),
};
