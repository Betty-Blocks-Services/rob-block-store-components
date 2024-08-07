import {
  option,
  variable,
  buttongroup,
  toggle,
  hideIf,
  showIfTrue,
} from '@betty-blocks/component-sdk';

export const options = {
  urlInput: variable('URL', {
    value: [''],
  }),
  method: buttongroup(
    'Method',
    [
      ['GET', 'GET'],
      ['POST', 'POST'],
      ['DELETE', 'DELETE'],
      ['PUT', 'PUT'],
    ],
    {
      value: 'GET',
    },
  ),
  bodyInput: variable('Body', {
    value: [''],
    configuration: {
      condition: hideIf('method', 'EQ', 'GET'),
    },
  }),
  error: variable('Default error', {
    value: [''],
  }),
  validate: toggle('Validate response', {
    value: false,
  }),
  path: variable('Path to value', {
    value: [''],
    configuration: {
      condition: showIfTrue('validate'),
    },
  }),
  value: variable('Compare to value', {
    value: [''],
    configuration: {
      condition: showIfTrue('validate'),
    },
  }),
  actionId: option('ACTION_JS', {
    label: 'Action for token',
    value: '',
    configuration: {
      disabled: true,
    },
  }),
};
