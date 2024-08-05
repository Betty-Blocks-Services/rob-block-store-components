import { Icon, prefab, sizes } from '@betty-blocks/component-sdk';
import { Box, boxOptions } from '../structures';

const attrs = {
  icon: Icon.ContainerIcon,
  category: 'LAYOUT',
  keywords: ['Layout', 'footer'],
  description: 'This is the footer partial',
};

// eslint-disable-next-line import/no-default-export
export default prefab('Footer', attrs, undefined, [
  Box(
    {
      options: {
        ...boxOptions,
        innerSpacing: sizes('Inner space', {
          value: ['L', 'L', 'L', 'L'],
        }),
      },
    },
    [],
  ),
]);
