import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';
import { defaultDocumentNode, structure } from './structure';

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
  ],

  schema: {
    types: schemaTypes,
  },
});
