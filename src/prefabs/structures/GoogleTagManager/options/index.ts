import { buttongroup, variable, showIf } from '@betty-blocks/component-sdk';

export const googleTagManagerOptions = {
  type: buttongroup(
    'Type',
    [
      ['GTM-TAG', 'gtm'],
      ['G-TAG', 'g'],
    ],
    {
      value: 'gtm',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  gtmTag: variable('CONTAINER ID (the GTM- number, no script)', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'gtm'),
    },
  }),
  gTag: variable('TAG ID (the G- number, no script)', {
    value: [],
    configuration: {
      condition: showIf('type', 'EQ', 'g'),
    },
  }),
};
