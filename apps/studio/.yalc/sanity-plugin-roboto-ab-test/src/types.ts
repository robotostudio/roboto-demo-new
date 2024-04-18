import {KeyedObject, ObjectSchemaType, Reference} from 'sanity'

export type PluginConfig = {
  schemaTypes: string[]
  apiVersion?: string
  featureField?: string
}

export type DocumentABTestMenuProps = {
  schemaType: ObjectSchemaType
  documentId: string
}

export type FeatureReference = KeyedObject & {
  _type: 'featureReferenceValue'
  value: Reference
}

export type Metadata = {
  _id: string
  _createdAt: string
  features: FeatureReference[]
}
