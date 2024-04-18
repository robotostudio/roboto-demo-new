import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { defaultDocumentNode, structure } from './structure';
import { assist } from '@sanity/assist';
import { documentInternationalization } from '@sanity/document-internationalization';
import { abTest } from 'sanity-plugin-roboto-ab-test';
import { media } from 'sanity-plugin-media';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { internationalizedDocuments } from './schemaTypes/documents';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

export default defineConfig({
  name: 'default',
  title: 'roboto-demo-new',

  projectId: 's6kuy1ts',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    abTest({ schemaTypes: ['page', 'blog'] }),
    visionTool(),
    assist(),
    unsplashImageAsset(),
    media(),
    iconPicker(),
    documentInternationalization({
      schemaTypes: internationalizedDocuments,
      supportedLanguages: [
        { id: 'en-GB', title: 'English' },
        { id: 'de', title: 'German' },
        { id: 'fr', title: 'French' },
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
