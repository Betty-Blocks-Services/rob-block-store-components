import { component, PrefabReference } from '@betty-blocks/component-sdk';
import { updateOption } from '../../../utils';
import { deleteActionVariable } from '../../hooks/deleteActionVariable';
import { Configuration } from '../Configuration';
import { tinyMCEOptions, categories as defaultCategories } from './options';

const $afterDelete = [deleteActionVariable];

export const TinyMCE = (
  config: Configuration,
  children: PrefabReference[] = [],
) => {
  const options = { ...(config.options || tinyMCEOptions) };
  const ref = config.ref ? { ...config.ref } : undefined;
  const optionCategories = config.optionCategories
    ? config.optionCategories
    : defaultCategories;

  if (config.type) {
    options.type = updateOption(options.type, { value: config.type });
  }

  if (config.inputLabel) {
    options.label = updateOption(options.label, { value: [config.inputLabel] });
  }

  return component(
    'TinyMCE',
    { label: config.label, options, ref, $afterDelete, optionCategories },
    children,
  );
};
