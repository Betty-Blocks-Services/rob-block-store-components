import { PrefabReference, component } from '@betty-blocks/component-sdk';
import { azureFileUploadOptions } from './options';
import { Configuration } from '../Configuration';

const defaultCategories = [
  {
    label: 'Validation',
    expanded: false,
    members: [
      'required',
      'validationValueMissing',
      'hideDefaultError',
      'defaultErrorText',
      'fileExistsErrorText',
      'incorrectTypeErrorText',
      'accept',
      'maxFileSize',
      'maxFileSizeMessage',
    ],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'dropzoneHeight',
      'outerSpacing',
      'hideLabel',
      'labelColor',
      'borderColor',
      'borderWidth',
      'borderStyle',
      'borderRadius',
      'helperColor',
      'dragAndDropColor',
      'errorColor',
      'successColor',
    ],
  },
  {
    label: 'Advanced settings',
    expanded: false,
    members: ['dataComponentAttribute'],
  },
];

export const AzureFileUpload = (
  config: Configuration = {},
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || azureFileUploadOptions) };
  const categories = [...(config.optionCategories || defaultCategories)];

  return component(
    'Azure File Upload Input',
    { options, label: config.label, optionCategories: categories },
    descendants,
  );
};
