import { prefab, Icon } from '@betty-blocks/component-sdk';
import { PageExitGuard } from './structures/PageExitGuard';

const attributes = {
  category: 'NAVIGATION',
  icon: Icon.AlertIcon,
  keywords: ['close', 'page', 'interaction'],
};

export default prefab('Page Exit Guard', attributes, undefined, [PageExitGuard({})]);
