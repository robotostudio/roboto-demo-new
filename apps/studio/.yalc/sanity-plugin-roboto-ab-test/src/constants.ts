import {PluginConfig} from './types'
export const METADATA_SCHEMA_NAME = `features.metadata`
export const FEATURES_ARRAY_NAME = `features`
export const API_VERSION = `2023-05-22`
export const DEFAULT_CONFIG: Required<PluginConfig> = {
  schemaTypes: [],
  apiVersion: API_VERSION,
  featureField: `feature`,
}
