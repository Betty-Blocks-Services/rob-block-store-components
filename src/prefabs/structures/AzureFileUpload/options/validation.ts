import { toggle, variable, number, showIf } from '@betty-blocks/component-sdk';

export const validation = {
  required: toggle('Required'),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: { condition: showIf('required', 'EQ', true) },
  }),
  hideDefaultError: toggle('Hide default error', {
    value: false,
  }),
  defaultErrorText: variable('Default error message', {
    value: ['An unknown error occurred'],
  }),
  fileExistsErrorText: variable('File already exists message', {
    value: ['This file already exists on azure, you can not override files'],
  }),
  incorrectTypeErrorText: variable('Incorrect type message', {
    value: ['Error with file types'],
  }),
  accept: variable('Accept files', {
    value: ['*'],
  }),
  maxFileSize: number('Max file size (mb)'),
  maxFileSizeMessage: variable('Invalid max file size message', {
    value: ['Maximum file size exceeded'],
  }),
};
