import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { defaultDocumentNode, structure } from './structure';
import { assist } from '@sanity/assist';
import { documentInternationalization } from '@sanity/document-internationalization';
import { media } from 'sanity-plugin-media';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { internationalizedDocuments } from './schemaTypes/documents';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { resolve } from './resolve-presentation-document';
import { getFlag } from './utils/helper';

export default defineConfig({
  name: 'default',
  title: 'roboto-demo',

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
    presentationTool({
      resolve: resolve,
      previewUrl: {
        origin:
          window.location.hostname === 'localhost'
            ? 'http://localhost:3000'
            : 'https://demo.roboto.studio',
        previewMode: {
          enable: '/api/presentation-draft',
        },
      },
    }),
    documentInternationalization({
      schemaTypes: internationalizedDocuments,
      supportedLanguages: [
        { id: 'en-GB', title: 'English' },
        { id: 'de', title: 'German' },
        { id: 'fr', title: 'French' },
        { id: 'ar', title: 'Arabic' },
      ],
    }),
  ],

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === 'global') return [];
      return prev;
    },
  },
  scheduledPublishing: {
    enabled: false,
  },
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
