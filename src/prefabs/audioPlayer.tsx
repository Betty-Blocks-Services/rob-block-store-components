import { prefab, Icon } from '@betty-blocks/component-sdk';

import { AudioPlayer } from './structures/AudioPlayer';

const attributes = {
  category: 'CONTENT',
  icon: Icon.SliderComponentIcon,
  keywords: [''],
};

export default prefab('AudioPlayer', attributes, undefined, [AudioPlayer({})]);
