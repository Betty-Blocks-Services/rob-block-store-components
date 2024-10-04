(() => ({
  name: 'Style Sheet',
  icon: 'HtmlIcon',
  category: 'LAYOUT',
  keywords: ['style sheet', 'stylesheet', 'styling', 'css'],
  structure: [
    {
      name: 'Style Sheet',
      options: [
        {
          type: 'CUSTOM',
          key: 'type',
          label: 'Type',
          value: 'From URL',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'From URL', value: 'From URL' },
              { name: 'Inline', value: 'Inline' },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Style sheet URL',
          key: 'url',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'From URL',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Inline CSS',
          key: 'css',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'type',
              comparator: 'EQ',
              value: 'Inline',
            },
          },
        },
        {
          value: false,
          label: 'Advanced settings',
          key: 'advancedSettings',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Test attribute',
          key: 'dataComponentAttribute',
          value: ['styleSheet'],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'advancedSettings',
              comparator: 'EQ',
              value: true,
            },
          },
        },
      ],
      descendants: [],
    },
  ],
}))();
