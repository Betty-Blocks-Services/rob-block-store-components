import * as React from 'react';
import { BeforeCreateArgs, Icon, prefab } from '@betty-blocks/component-sdk';
import { AzureFileUpload } from './structures';

const beforeCreate = ({
  close,
  components: {
    Label,
    Content,
    Field,
    Footer,
    Header,
    TextInput: Text,
    CircleQuestion,
    BBTooltip,
  },
  prefab: originalPrefab,
  save,
  helpers,
}: BeforeCreateArgs) => {
  const { prepareInput, useActionIdSelector, setOption, createUuid } = helpers;

  const [variableInput, setVariableInput] = React.useState(null);
  const actionId = useActionIdSelector();
  const [prefabSaved, setPrefabSaved] = React.useState(false);

  let name: string | undefined;
  let propertyKind;
  const componentId = createUuid();

  const structure = originalPrefab.structure[0];
  if (structure.type !== 'COMPONENT')
    return <div>expected component prefab, found {structure.type}</div>;

  if (!actionId && !prefabSaved) {
    setPrefabSaved(true);
    save(originalPrefab);
  }

  const actionVariableOptionType = structure.options.find(
    (option: { type: string }) => option.type === 'ACTION_JS_VARIABLE',
  );

  const actionVariableOption = actionVariableOptionType?.key || null;
  const labelOptionKey = 'label';
  const nameOptionKey = 'actionVariableId';

  return (
    <>
      <Header onClose={close} title="Configure form input field" />
      <Content>
        <Field>
          <Label>
            Action input variable
            <CircleQuestion
              color="grey500"
              size="medium"
              data-tip="You can use this action input variable in the action itself."
              data-for="variable-tooltip"
            />
          </Label>
          <BBTooltip
            id="variable-tooltip"
            place="top"
            type="dark"
            effect="solid"
          />
          <Text
            onChange={(e): void => setVariableInput(e.target.value)}
            color="orange"
          />
        </Field>
      </Content>
      <Footer
        onClose={close}
        canSave={variableInput}
        onSave={async (): Promise<void> => {
          // eslint-disable-next-line no-param-reassign
          structure.id = componentId;

          const kind = propertyKind || 'STRING';
          const variableName = variableInput || name;
          const result = await prepareInput(
            actionId,
            variableName,
            kind,
            propertyKind,
          );

          const newPrefab = { ...originalPrefab };
          if (newPrefab.structure[0].type !== 'COMPONENT') {
            throw new Error('expected Component');
          }
          setOption(newPrefab.structure[0], actionVariableOption, (option) => ({
            ...option,
            value: variableName,
            configuration: {
              condition: {
                type: 'SHOW',
                option: 'property',
                comparator: 'EQ',
                value: '',
              },
            },
          }));
          setOption(newPrefab.structure[0], labelOptionKey, (option) => ({
            ...option,
            value: [variableName],
          }));

          setOption(newPrefab.structure[0], nameOptionKey, (option) => ({
            ...option,
            value: result.variable.variableId,
          }));
          save({ ...originalPrefab, structure: [newPrefab.structure[0]] });
        }}
      />
    </>
  );
};

const attr = {
  icon: Icon.FileInputIcon,
  category: 'FORM',
  keywords: ['Form', 'input', 'file', 'upload', 'fileupload', 'azure', 'multi'],
};

export default prefab('Azure File Upload Input', attr, beforeCreate, [
  AzureFileUpload({ label: 'Azure File Upload' }, []),
]);
