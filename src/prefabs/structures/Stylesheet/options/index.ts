import {
  variable,
  buttongroup,
  showIf,
  option,
} from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const styleSheetOptions = {
  type: buttongroup(
    'Type',
    [
      ['URL', 'URL'],
      ['File', 'File'],
      ['Inline', 'Inline'],
    ],
    {
      value: 'URL',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  url: variable('Style sheet URL', {
    value: [''],
    configuration: {
      condition: showIf('type', 'EQ', 'URL'),
    },
  }),
  file: option('PUBLIC_FILE', {
    label: 'File',
    value: '',
    configuration: {
      condition: showIf('type', 'EQ', 'File'),
    },
  }),
  css: variable('Inline CSS', {
    value: [''],
    configuration: {
      condition: showIf('type', 'EQ', 'Inline'),
    },
  }),

  ...advanced('StyleSheet'),
};
