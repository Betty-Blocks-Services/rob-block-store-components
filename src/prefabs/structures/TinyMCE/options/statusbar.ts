import { showIf, toggle } from '@betty-blocks/component-sdk';

export const statusbar = {
  statusbar: toggle('Toggle statusbar visibility', {
    value: false,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  elementpath: toggle('Element path', {
    value: true,
    configuration: { condition: showIf('statusbar', 'EQ', true) },
  }),
  help: toggle('Help', {
    value: true,
    configuration: { condition: showIf('statusbar', 'EQ', true) },
  }),
  wordCount: toggle('Word count', {
    value: true,
    configuration: { condition: showIf('statusbar', 'EQ', true) },
  }),
  branding: toggle('TinyMCE branding', {
    value: true,
    configuration: { condition: showIf('statusbar', 'EQ', true) },
  }),
};
