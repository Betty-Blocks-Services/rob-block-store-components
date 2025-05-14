import { Icon, prefab } from '@betty-blocks/component-sdk';
import { Fetch } from './structures/Fetch';

const attributes = {
  category: 'FORM',
  icon: Icon.HiddenInputIcon,
  keywords: ['Action', 'hidden', 'input', 'fetch'],
};

export default prefab('Fetch', attributes, undefined, [Fetch({})]);
