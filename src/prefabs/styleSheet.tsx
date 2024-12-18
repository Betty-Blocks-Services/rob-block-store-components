import { prefab, Icon } from '@betty-blocks/component-sdk';

import { Stylesheet } from './structures/Stylesheet';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.HtmlIcon,
  keywords: ['style sheet', 'stylesheet', 'styling', 'css'],
};

export default prefab('Style Sheet', attributes, undefined, [Stylesheet({})]);
