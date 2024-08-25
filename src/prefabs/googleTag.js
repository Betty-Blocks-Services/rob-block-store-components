(() => ({
  name: 'GoogleTag OLD structure',
  icon: 'HtmlIcon',
  category: 'CONTENT',
  structure: [
    {
      name: 'Google Tag Manager',
      options: [
        {
          type: 'CUSTOM',
          key: 'type',
          label: 'Type',
          value: 'gtm',
          configuration: {
            as: 'BUTTONGROUP',
            dataType: 'string',
            allowedInput: [
              { name: 'GTM-TAG', value: 'gtm' },
              { name: 'G-TAG', value: 'g' },
            ],
          },
        },
        {
          type: 'VARIABLE',
          key: 'gTag',
          label: 'TAG-ID (the G- number, no script)',
          value: [''],
        },
        {
          type: 'VARIABLE',
          key: 'gtmTag',
          label: 'CONTAINER-ID (the GTM- number, no script)',
          value: [''],
        },
      ],
      descendants: [],
    },
  ],
}))();
