import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Tooltip } from './structures';

const attributes = {
  category: 'CONTENT',
  icon: Icon.HiddenInputIcon,
  keywords: ['tooltip', 'info', 'helptext'],
};

export default prefab('Tooltip', attributes, undefined, [Tooltip({})]);
