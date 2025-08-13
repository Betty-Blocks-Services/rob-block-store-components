import {
  color,
  size,
  sizes,
  ThemeColor,
  showIf,
  toggle,
} from '@betty-blocks/component-sdk';

export const styles = {
  width: size('Width', {
    value: '',
    configuration: {
      as: 'UNIT',
    },
  }),
  height: size('Height', {
    value: '245px',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['M', '0rem', 'S', '0rem'],
  }),

  useDarkMode: toggle('Dark mode'),
  hideLabel: toggle('Hide label'),
  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
    configuration: {
      condition: showIf('hideLabel', 'EQ', false),
    },
  }),
  placeholderColor: color('Placeholder color', { value: '#222f3eb3' }),
  borderColor: color('Border color', { value: ThemeColor.ACCENT_1 }),
  borderHoverColor: color('Border color (hover)', { value: ThemeColor.BLACK }),
  helperColor: color('Helper color', { value: ThemeColor.ACCENT_2 }),
  errorColor: color('Error color', { value: ThemeColor.DANGER }),
};
