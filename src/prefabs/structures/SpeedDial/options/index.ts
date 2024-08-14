import {
  ThemeColor,
  addChild,
  color,
  icon,
  option,
  reconfigure,
  sizes,
  size,
  toggle,
  buttongroup,
  showIf,
} from '@betty-blocks/component-sdk';

import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Position',
    expanded: false,
    members: ['placement', 'tooltipPlacement'],
  },
  {
    label: 'State',
    expanded: false,
    members: ['disabled'],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'size',
      'outerSpacing',
      'buttonColor',
      'iconColor',
      'isTooltipVisible',
    ],
  },
  {
    label: 'Advanced Options',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const speedDialOptions = {
  isMenuVisible: toggle('Toggle menu', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),
  icon: icon('Icon', { value: 'None' }),

  placement: option('CUSTOM', {
    label: 'Menu Placement',
    value: 'down',
    configuration: {
      as: 'DROPDOWN',
      allowedInput: [
        {
          name: 'Top',
          value: 'up',
        },
        {
          name: 'Right',
          value: 'right',
        },
        {
          name: 'Bottom',
          value: 'down',
        },
        {
          name: 'Left',
          value: 'left',
        },
      ],
    },
  }),
  tooltipPlacement: option('CUSTOM', {
    label: 'Tooltip Placement',
    value: 'left',
    configuration: {
      as: 'DROPDOWN',
      allowedInput: [
        {
          name: 'Top start',
          value: 'top-start',
        },
        {
          name: 'Top',
          value: 'top',
        },
        {
          name: 'Top end',
          value: 'top-end',
        },
        {
          name: 'Right start',
          value: 'top-start',
        },
        {
          name: 'Right',
          value: 'right',
        },
        {
          name: 'Right end',
          value: 'right-end',
        },
        {
          name: 'Bottom start',
          value: 'bottom-start',
        },
        {
          name: 'Bottom',
          value: 'bottom',
        },
        {
          name: 'Bottom end',
          value: 'bottom-end',
        },
        {
          name: 'Left start',
          value: 'left-start',
        },
        {
          name: 'Left',
          value: 'left',
        },
        {
          name: 'Left end',
          value: 'left-end',
        },
      ],
    },
  }),
  position: buttongroup(
    'Position',
    [
      ['Static', 'static'],
      ['Fixed', 'fixed'],
    ],
    {
      value: 'static',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  top: size('Top position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('position', 'EQ', 'fixed'),
    },
  }),
  right: size('Right position', {
    value: '50px',
    configuration: {
      as: 'UNIT',
      condition: showIf('position', 'EQ', 'fixed'),
    },
  }),
  bottom: size('Bottom position', {
    value: '50px',
    configuration: {
      as: 'UNIT',
      condition: showIf('position', 'EQ', 'fixed'),
    },
  }),
  left: size('Left position', {
    value: '',
    configuration: {
      as: 'UNIT',
      condition: showIf('position', 'EQ', 'fixed'),
    },
  }),

  disabled: toggle('Disabled', { value: false }),

  size: option('CUSTOM', {
    value: 'medium',
    label: 'Button Size',
    configuration: {
      as: 'BUTTONGROUP',
      dataType: 'string',
      allowedInput: [
        { name: 'Large', value: 'large' },
        { name: 'Medium', value: 'medium' },
        { name: 'Small', value: 'small' },
      ],
    },
  }),
  outerSpacing: sizes('Button Outer space', {
    value: ['0rem', '0rem', '0rem', '0rem'],
  }),
  buttonColor: color('Button color', { value: ThemeColor.PRIMARY }),
  iconColor: color('Icon color', { value: ThemeColor.WHITE }),
  isTooltipVisible: toggle('Toggle tooltip', {
    value: true,
    configuration: { as: 'VISIBILITY' },
  }),

  ...advanced('SpeedDial'),
};
