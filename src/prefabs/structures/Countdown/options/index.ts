import {
  variable,
  font,
  option,
  ThemeColor,
  color,
  buttongroup,
  showIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['textType', 'textColor', 'fontWeight'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const countdownOptions = {
  targetDate: variable('Target date (YYYY-MM-DD HH:mm)', {
    value: [''],
  }),
  type: buttongroup(
    'Type',
    [
      ['Clock', 'clock'],
      ['Text', 'text'],
    ],
    {
      value: 'clock',
    },
  ),
  daysAppendix: variable('Days appendix', {
    value: [' days, '],
    configuration: {
      condition: showIf('type', 'EQ', 'text'),
    },
  }),
  hoursAppendix: variable('Hours appendix', {
    value: [' hours, '],
    configuration: {
      condition: showIf('type', 'EQ', 'text'),
    },
  }),
  minutesAppendix: variable('Minutes appendix', {
    value: [' minutes and '],
    configuration: {
      condition: showIf('type', 'EQ', 'text'),
    },
  }),
  secondsAppendix: variable('Seconds appendix', {
    value: [' seconds'],
    configuration: {
      condition: showIf('type', 'EQ', 'text'),
    },
  }),

  textType: font('Text style', { value: ['Body1'] }),
  textColor: color('Text color', {
    value: ThemeColor.BLACK,
  }),
  fontWeight: option('CUSTOM', {
    label: 'Font weight',
    value: '[Inherit]',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '[Theme Weight]', value: '[Inherit]' },
        { name: '100', value: '100' },
        { name: '200', value: '200' },
        { name: '300', value: '300' },
        { name: '400', value: '400' },
        { name: '500', value: '500' },
        { name: '600', value: '600' },
        { name: '700', value: '700' },
        { name: '800', value: '800' },
        { name: '900', value: '900' },
      ],
    },
  }),

  ...advanced('Countdown'),
};
