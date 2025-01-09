import {
  size,
  color,
  ThemeColor,
  option,
  toggle,
  variable,
  buttongroup,
  dropdown,
} from '@betty-blocks/component-sdk';

export const categories = [
  {
    label: 'Styling',
    expanded: false,
    members: ['placement', 'backgroundColor', 'textColor', 'fontSize', 'arrow'],
  },
  {
    label: 'Animation',
    expanded: false,
    members: ['enterDelay', 'leaveDelay', 'transition', 'transitionDuration'],
  },
  {
    label: 'Advanced',
    expanded: false,
    members: ['followCursor'],
  },
];

export const tooltipOptions = {
  hasVisibleTooltip: toggle('Toggle tooltip visibility', {
    value: false,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  content: variable('Content', {
    value: ['Type your content here...'],
  }),

  placement: dropdown(
    'Placement',
    [
      ['Default', 'default'],
      ['Top start', 'top-start'],
      ['Top', 'top'],
      ['Top end', 'top-end'],
      ['Right', 'right'],
      ['Left', 'left'],
      ['Bottom start', 'bottom-start'],
      ['Bottom', 'bottom'],
      ['Bottom end', 'bottom-end'],
    ],
    {
      value: 'bottom',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  backgroundColor: color('Background color', {
    value: ThemeColor.DARK,
  }),
  textColor: color('Text color', {
    value: ThemeColor.WHITE,
  }),
  fontSize: size('Font size', {
    value: '0.625rem',
    configuration: {
      as: 'UNIT',
    },
  }),
  arrow: toggle('Arrow', {
    value: false,
  }),

  enterDelay: option('NUMBER', {
    label: 'Show delay (in ms)',
    value: 500,
  }),
  leaveDelay: option('NUMBER', {
    label: 'Hide delay (in ms)',
    value: 200,
  }),
  transition: buttongroup(
    'Transition',
    [
      ['Grow', 'grow'],
      ['Fade', 'fade'],
      ['Zoom', 'zoom'],
    ],
    {
      value: 'grow',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  transitionDuration: option('NUMBER', {
    label: 'Transition duration (in ms)',
    value: 400,
  }),

  followCursor: toggle('Follow cursor', {
    value: false,
  }),
};
