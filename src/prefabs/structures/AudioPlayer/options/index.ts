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
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  progressButtonColor: color('Progress button color', {
    value: ThemeColor.PRIMARY,
  }),

  ...advanced('AudioPlayer'),
};
