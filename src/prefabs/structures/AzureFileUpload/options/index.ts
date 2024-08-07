import { option, toggle, variable } from '@betty-blocks/component-sdk';
import { validation } from './validation';
import { styles } from './styles';
import { advanced } from './advanced';

export const azureFileUploadOptions = {
  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Name',
    value: '',
  }),

  sasUrl: variable('SAS URL Azure', { value: [] }),
  folder: variable('Folder name for Azure', { value: [] }),

  label: variable('Label', {
    value: ['Upload file(s)...'],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  disabled: toggle('Disabled', { value: false }),
  dropText: variable('Drop text', {
    value: ['Drag and drop to upload or click to browse for files'],
  }),
  helperText: variable('Helper text', { value: [] }),

  ...validation,
  ...styles,
  ...advanced,
};
