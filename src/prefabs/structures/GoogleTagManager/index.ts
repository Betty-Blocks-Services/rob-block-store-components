import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { Configuration } from '../Configuration';
import { googleTagManagerOptions as defaultOptions } from './options';

export const GoogleTagManager = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaultOptions) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  return component(
    'Google Tag Manager',
    { options, ref, style, label },
    descendants,
  );
};
