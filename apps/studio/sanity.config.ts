import { assist } from '@sanity/assist';
import { documentInternationalization } from '@sanity/document-internationalization';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';
import { internationalizedDocuments } from './schemaTypes/documents';
import { defaultDocumentNode, structure } from './structure';
import { getFlag } from './utils/helper';

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
    visionTool(),
    assist({
      translate: {
        document: {
          languageField: 'language',
        },
      },
    }),
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
    templates: (prev) => {
      const _internalizedDocs = internationalizedDocuments.map(
        (doc) => `${doc}`,
      );

      const filtered = prev
        .filter((template) => !_internalizedDocs.includes(template.id))
        .map((template) => {
          return {
            ...template,
            ...(template?.value?.language && {
              title: `${getFlag(template.value.language)} ${template.title}`,
            }),
          };
        });

      return [...filtered];
    },
  },
});
