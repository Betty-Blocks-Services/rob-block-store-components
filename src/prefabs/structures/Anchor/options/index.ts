import { variable, toggle } from '@betty-blocks/component-sdk';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['smoothScroll', 'dataComponentAttribute'],
  },
];

export const anchorOptions = {
  anchor: variable('Anchor tag', {
    value: [''],
  }),

  smoothScroll: toggle('Smooth scroll', {
    value: false,
  }),
  ...advanced('Anchor'),
};
