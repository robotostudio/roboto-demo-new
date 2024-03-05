import { SanityCodegenConfig } from 'sanity-codegen';

const config: SanityCodegenConfig = {
  schemaPath: './schemaTypes',
  outputPath: '../web/src/schema.ts',
  prettierResolveConfigPath: '../web/.prettierrc.js',
};

export default config;
