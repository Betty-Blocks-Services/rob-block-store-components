import {
  variable,
  size,
  ThemeColor,
  color,
  font,
  option,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: [
      'width',
      'textType',
      'textColor',
      'fontWeight',
      'progressButtonColor',
    ],
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
  progressButtonColor: color('Progress button color', {
    value: ThemeColor.PRIMARY,
  }),

  ...advanced('AudioPlayer'),
};
