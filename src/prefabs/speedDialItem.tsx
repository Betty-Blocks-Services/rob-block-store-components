import { prefab, Icon } from '@betty-blocks/component-sdk';
import { SpeedDialItem } from './structures';

const attr = {
  icon: Icon.MenuItemIcon,
  category: 'NAVIGATION',
  keywords: [
    'Navigation',
    'speed dial',
    'item',
    'speed dial item',
    'dropdown item',
    'fab',
    'floating action button',
  ],
};

export default prefab('SpeedDial Item', attr, undefined, [
  SpeedDialItem({}, []),
]);
