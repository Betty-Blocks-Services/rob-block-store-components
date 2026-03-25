import {
  prefab,
  Icon,
  PrefabInteraction,
} from '@betty-blocks/component-sdk';

import { Dialog } from './structures';

const interactions: PrefabInteraction[] = [];

const attr = {
  icon: Icon.DialogIcon,
  category: 'CONTENT',
  keywords: [
    'Content',
    'dialog',
    'popup',
    'modal',
    'pop-up',
    'popover',
    'pop-over',
  ],
  interactions,
};

export default prefab('Dialog', attr, undefined, [
  Dialog({ ref: { id: '#dialog' } }, []),
]);
