(() => ({
  name: 'Fetch',
  icon: 'HiddenInputIcon',
  category: 'FORM',
  keywords: ['action', 'hidden', 'input', 'fetch'],
  structure: [
    {
      name: 'Fetch',
      options: [
        {
          type: 'VARIABLE',
          label: 'URL',
          key: 'urlInput',
          value: [''],
        },
        {
          label: 'Method',
          key: 'method',
          value: 'POST',
          type: 'CUSTOM',
          configuration: {
            as: 'DROPDOWN',
            dataType: 'string',
            allowedInput: [
              {
                name: 'GET',
                value: 'GET',
              },
              {
                name: 'POST',
                value: 'POST',
              },
              {
                name: 'DELETE',
                value: 'DELETE',
              },
              {
                name: 'PUT',
                value: 'PUT',
              },
            ],
          },
        },
        {
          type: 'VARIABLE',
          label: 'Headers',
          key: 'headersInput',
          value: [''],
        },
        {
          type: 'VARIABLE',
          label: 'Body',
          key: 'bodyInput',
          value: [''],
          configuration: {
            condition: {
              type: 'HIDE',
              option: 'method',
              comparator: 'EQ',
              value: 'GET',
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Default error',
          key: 'error',
          value: [''],
        },
        {
          value: false,
          label: 'Validate response',
          key: 'validate',
          type: 'TOGGLE',
        },
        {
          type: 'VARIABLE',
          label: 'Path to value',
          key: 'path',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validate',
              comparator: 'EQ',
              value: true,
            },
          },
        },
        {
          type: 'VARIABLE',
          label: 'Compare to value',
          key: 'value',
          value: [''],
          configuration: {
            condition: {
              type: 'SHOW',
              option: 'validate',
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
