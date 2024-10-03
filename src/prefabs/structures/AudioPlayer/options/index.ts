import { variable, size, ThemeColor, color } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['width'],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const audioPlayerOptions = {
  audioSrc: variable('Audio source', {
    value: [''],
  }),

  labelPlay: variable('Label play button', {
    value: ['Play'],
  }),
  labelPause: variable('Label pause button', {
    value: ['Pause'],
  }),
  labelReplay: variable('Label replay button', {
    value: ['Replay'],
  }),

  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  buttonColor: color('Button background color', {
    value: ThemeColor.PRIMARY,
  }),
  buttonTextColor: color('Button text color', {
    value: ThemeColor.WHITE,
  }),

  ...advanced('AudioPlayer'),
};
