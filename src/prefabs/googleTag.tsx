import { prefab, Icon } from '@betty-blocks/component-sdk';
import { GoogleTagManager } from './structures';

const attributes = {
  category: 'LAYOUT',
  icon: Icon.BarChartIcon,
  keywords: ['Google tag manager', 'script', 'tracking', 'gtm'],
};

export default prefab('Google Tag Manager', attributes, undefined, [
  GoogleTagManager({}),
]);
