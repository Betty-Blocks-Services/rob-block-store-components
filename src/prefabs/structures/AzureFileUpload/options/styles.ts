import {
  size,
  sizes,
  buttongroup,
  color,
  ThemeColor,
  toggle,
} from '@betty-blocks/component-sdk';

export const styles = {
  dropzoneHeight: size('Dropzone height', {
    value: '100px',
    configuration: {
      as: 'UNIT',
    },
  }),
  outerSpacing: sizes('Outer space', {
    value: ['M', '0rem', 'S', '0rem'],
  }),

  hideLabel: toggle('Hide label', {
    value: false,
  }),
  labelColor: color('Label color', {
    value: ThemeColor.BLACK,
  }),
  borderColor: color('Border color', {
    value: ThemeColor.LIGHT,
  }),
  borderWidth: size('Border thickness', {
    value: '2px',
    configuration: {
      as: 'UNIT',
    },
  }),
  borderStyle: buttongroup(
    'Border style',
    [
      ['None', 'none'],
      ['Solid', 'solid'],
      ['Dashed', 'dashed'],
      ['Dotted', 'dotted'],
    ],
    {
      value: 'dashed',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  borderRadius: size('Border radius', {
    value: '10px',
    configuration: {
      as: 'UNIT',
    },
  }),
  helperColor: color('Helper color', {
    value: ThemeColor.ACCENT_2,
  }),
  dragAndDropColor: color('Drag and drop color', {
    value: ThemeColor.PRIMARY,
  }),
  errorColor: color('Error color', {
    value: ThemeColor.DANGER,
  }),
  successColor: color('Success color', {
    value: ThemeColor.SUCCESS,
  }),
};
