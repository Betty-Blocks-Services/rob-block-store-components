import { prefab, Icon } from '@betty-blocks/component-sdk';
import { SpeedDial, SpeedDialItem } from './structures';

const attr = {
  icon: Icon.MenuIcon,
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

export default prefab('SpeedDial', attr, undefined, [
  SpeedDial({}, [SpeedDialItem({}, [])]),
]);
