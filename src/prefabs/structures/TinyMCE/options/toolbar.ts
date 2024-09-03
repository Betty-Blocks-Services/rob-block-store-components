import { showIf, toggle, buttongroup } from '@betty-blocks/component-sdk';

export const toolbar = {
  toolbar: toggle('Toggle toolbar visibility', {
    value: true,
    configuration: {
      as: 'VISIBILITY',
    },
  }),
  toolbarMode: buttongroup(
    'Toolbar mode',
    [
      ['Float', 'floating'],
      ['Slide', 'sliding'],
      ['Scroll', 'scrolling'],
      ['Wrap', 'wrap'],
    ],
    {
      value: 'floating',
      configuration: {
        dataType: 'string',
        condition: showIf('toolbar', 'EQ', true),
      },
    },
  ),
  fontType: toggle('Font type', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  fontFamily: toggle('Font family', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  fontSize: toggle('Font size', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  bold: toggle('Bold', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  italic: toggle('Italic', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  underline: toggle('Underline', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  strikethrough: toggle('Strikethrough', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  align: toggle('Align', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  lists: toggle('Lists', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  link: toggle('Link', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  image: toggle('Image', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  table: toggle('Table', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  codeSample: toggle('Code sample', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  accordion: toggle('Accordion', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  lineHeight: toggle('Line height', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  indent: toggle('Indent', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  textColor: toggle('Text color', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  backgroundColor: toggle('Background color', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  removeFormat: toggle('Remove format', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  sourceCode: toggle('Source code', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  fullScreen: toggle('Full screen', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  preview: toggle('Preview', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
  print: toggle('Print', {
    value: true,
    configuration: { condition: showIf('toolbar', 'EQ', true) },
  }),
};
