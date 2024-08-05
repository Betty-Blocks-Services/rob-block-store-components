import * as React from 'react';
import {
  prefab as makePrefab,
  Icon,
  BeforeCreateArgs,
} from '@betty-blocks/component-sdk';

const attrs = {
  icon: Icon.NavbarIcon,
  type: 'page',
  description: 'Full height page with a header and footer',
  detail:
    'Start with a full height page containing a header, footer and body that will scale to the height of the content.',
  previewUrl: 'https://preview.betty.app/header-and-footer',
  previewImage:
    'https://assets.bettyblocks.com/efaf005f4d3041e5bdfdd0643d1f190d_assets/files/Page_Template_Header_And_Footer.jpg',
  category: 'LAYOUT',
};

const beforeCreate = ({
  save,
  close,
  prefab,
  components: { Header, Footer },
}: BeforeCreateArgs) => {
  return (
    <>
      <Header onClose={close} title="Configure header and footer" />
      <Footer
        onClick={close}
        onSave={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
        onSkip={() => {
          const newPrefab = { ...prefab };
          save(newPrefab);
        }}
      />
    </>
  );
};

export default makePrefab('Empty page', attrs, beforeCreate, []);
