import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { createAction } from '../../hooks/createAction';
import { Configuration } from '../Configuration';
import { options as defaults } from './options';

const $afterCreate = [createAction];

export const Fetch = (
  config: Configuration,
  descendants: PrefabReference[] = [],
) => {
  const options = { ...(config.options || defaults) };
  const style = { ...config.style };
  const ref = config.ref ? { ...config.ref } : undefined;
  const label = config.label ? config.label : undefined;

  return component(
    'Fetch',
    { options, $afterCreate, style, ref, label },
    descendants,
  );
};
