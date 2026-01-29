import {
  color,
  ThemeColor,
  toggle,
  variable,
  font,
  option,
  showIf,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['showTimer', 'timerTextColor', 'timerTextStyle', 'timerTextWeight'],
  },
  {
    label: 'Advanced',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const timerOptions = {
  mode: option('CUSTOM', {
    label: 'Timer type',
    value: 'down',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Countdown', value: 'down' },
        { name: 'Stopwatch', value: 'up' },
      ],
    },
  }),
  label: variable('Label (in design time)', {
    value: ['Timer'],
    configuration: {
      condition: showIf('showTimer', 'EQ', false),
    },
  }),
  startValue: variable('Starting point (in seconds)', {
    value: [''],
    configuration: {
      condition: showIf('mode', 'EQ', 'up'),
    },
  }),
  duration: variable('Duration (in seconds)', {
    value: ['10'],
    configuration: {
      condition: showIf('mode', 'EQ', 'down'),
    },
  }),
  repeat: toggle('Repeat timer?', {
    value: false,
    configuration: {
      condition: showIf('mode', 'EQ', 'down'),
    },
  }),
  autoStart: toggle('Start immediately?', {
    value: false,
  }),

  showTimer: toggle('Visible on page?', {
    value: false,
  }),
  timerTextColor: color('Text color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('showTimer', 'EQ', true),
    },
  }),
  timerTextStyle: font('Text style', { 
    value: ['Body1'],
    configuration: {
      condition: showIf('showTimer', 'EQ', true),
    },
  }),
  timerTextWeight: option('CUSTOM', {
    label: 'Text weight',
    value: '[Inherit]',
    configuration: {
      as: 'DROPDOWN',
      dataType: 'string',
      allowedInput: [
        { name: '[Theme text style inheritance]', value: '[Inherit]' },
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
      condition: showIf('showTimer', 'EQ', true),
    },
  }),

  ...advanced('Timer'),
};