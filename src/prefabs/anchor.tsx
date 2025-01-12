import { prefab, Icon } from '@betty-blocks/component-sdk';
import { Anchor } from './structures/Anchor';

const attributes = {
  category: 'NAVIGATION',
  icon: Icon.HiddenInputIcon,
  keywords: ['anchor', 'link', 'scroll', 'target'],
};

export default prefab('Anchor', attributes, undefined, [Anchor({})]);
