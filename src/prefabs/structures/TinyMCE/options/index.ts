import {
  hideIf,
  option,
  property,
  showIf,
  toggle,
  variable,
  buttongroup,
} from '@betty-blocks/component-sdk';
import { toolbar } from './toolbar';
import { statusbar } from './statusbar';
import { validation } from './validation';
import { styles } from './styles';
import { advanced } from '../../advanced';

export const categories = [
  {
    label: 'Menubar',
    expanded: false,
    members: ['menubar'],
  },
  {
    label: 'Toolbar',
    expanded: false,
    members: [
      'toolbar',
      'toolbarMode',
      'fontType',
      'fontFamily',
      'fontSize',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'align',
      'lists',
      'link',
      'image',
      'table',
      'codeSample',
      'accordion',
      'lineHeight',
      'indent',
      'textColor',
      'backgroundColor',
      'removeFormat',
      'sourceCode',
      'fullScreen',
      'preview',
      'print',
    ],
  },
  {
    label: 'Statusbar',
    expanded: false,
    members: ['statusbar', 'elementpath', 'help', 'wordCount', 'branding'],
  },
  {
    label: 'Validation',
    expanded: false,
    members: [
      'disabled',
      'required',
      'validationValueMissing',
      'maxFileSize',
      'maxFileSizeMessage',
      'maxTotalSize',
      'maxTotalSizeMessage',
    ],
  },
  {
    label: 'Styling',
    expanded: false,
    members: [
      'useDarkMode',
      'hideLabel',
      'labelColor',
      'borderColor',
      'borderHoverColor',
      'helperColor',
      'errorColor',
    ],
  },
  {
    label: 'Spacing',
    expanded: false,
    members: ['width', 'height', 'outerSpacing'],
  },
  {
    label: 'Advanced',
    expanded: false,
    members: ['allowImagePaste', 'askBeforeLeave', 'dataComponentAttribute'],
  },
];

export const tinyMCEOptions = {
  source: buttongroup(
    'Source',
    [
      ['Cloud', 'cloud'],
      ['Self-hosted', 'self-hosted'],
    ],
    {
      value: 'cloud',
      configuration: {
        dataType: 'string',
      },
    },
  ),
  apiKey: variable('API key', {
    value: [''],
    configuration: {
      condition: showIf('source', 'EQ', 'cloud'),
    },
  }),
  scriptSrc: variable('Path to TinyMCE script', {
    value: [''],
    configuration: {
      condition: showIf('source', 'EQ', 'self-hosted'),
    },
  }),

  actionVariableId: option('ACTION_JS_VARIABLE', {
    label: 'Action input variable',
    value: '',
    configuration: {
      condition: showIf('property', 'EQ', ''),
    },
  }),
  property: property('Property', {
    value: '',
    showInReconfigure: true,
    configuration: {
      allowedKinds: ['TEXT', 'URL', 'IBAN', 'STRING'],
      disabled: true,
      condition: hideIf('property', 'EQ', ''),
      showOnDrop: true,
    },
  }),

  label: variable('Label', {
    value: [''],
    configuration: { allowFormatting: false, allowPropertyName: true },
  }),
  value: variable('Value', { value: [''] }),
  language: buttongroup(
    'Language',
    [
      ['English', 'en'],
      ['Dutch', 'nl'],
    ],
    {
      value: 'en',
      configuration: {
        dataType: 'string',
      },
    },
  ),

  menubar: toggle('Toggle menubar visibility', {
    value: false,
    configuration: {
      as: 'VISIBILITY',
    },
  }),

  ...toolbar,
  ...statusbar,
  ...validation,
  ...styles,

  allowImagePaste: toggle('Allow images in pasted contents', { value: true }),
  askBeforeLeave: toggle('Warn if leaving with unsaved changes', {
    value: false,
  }),
  ...advanced('TinyMCE'),
};
