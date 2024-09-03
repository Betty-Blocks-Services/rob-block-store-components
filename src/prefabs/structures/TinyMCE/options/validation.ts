import {
  showIf,
  text,
  number,
  variable,
  toggle,
} from '@betty-blocks/component-sdk';

export const validation = {
  disabled: toggle('Disabled', { value: false }),
  required: toggle('Required', { value: false }),
  validationValueMissing: variable('Value required message', {
    value: ['This field is required'],
    configuration: { condition: showIf('required', 'EQ', true) },
  }),
  maxFileSize: number('Maximum single file size (mb)'),
  maxFileSizeMessage: variable('Invalid maximum file size message', {
    value: ['Maximum file size exceeded'],
  }),
  maxTotalSize: number('Maximum total size (mb)'),
  maxTotalSizeMessage: variable('Invalid maximum total size message', {
    value: ['Maximum total size exceeded'],
  }),
  placeholderText: variable('Placeholder'),
  helperText: variable('Helper text'),
  type: text('Type', {
    value: '',
    configuration: { condition: showIf('type', 'EQ', 'never') },
  }),
};
