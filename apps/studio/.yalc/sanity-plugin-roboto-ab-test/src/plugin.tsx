import {defineField, definePlugin, defineType} from 'sanity'

import {ABTestProvider} from './components/ab-test-context'
import {DEFAULT_CONFIG} from './constants'
import {PluginConfig} from './types'

const variantSchemaType = (types: string[]) =>
  defineField({
    name: 'abTestVariant',
    title: 'AB Test Variant',
    type: 'object',
    fields: [
      defineField({
        name: 'key',
        type: 'string',
        options: {
          list: ['control', 'variant'],
        },
      }),
      defineField({
        name: 'resource',
        type: 'reference',
        options: {disableNew: true},
        to: types.map((v) => ({type: v})),
      }),
    ],
  })

const abTestSchema = (schemaTypes: string[]) =>
  defineType({
    name: 'abTest',
    title: 'AB Test',
    type: 'document',
    fields: [
      defineField({name: 'title', type: 'string'}),
      defineField({name: 'description', type: 'string'}),
      defineField({name: 'feature', type: 'string'}),
      defineField({
        name: 'variants',
        type: 'array',
        validation: (r) => [r.min(1), r.max(2)],
        of: [variantSchemaType(schemaTypes)],
      }),
    ],
  })

export const abTest = definePlugin<PluginConfig>((config) => {
  const pluginConfig = {...DEFAULT_CONFIG, ...config}
  const {apiVersion, schemaTypes} = pluginConfig
  console.log(
    '🚀 ~ abTest ~ apiVersion, schemaTypes:',
    apiVersion,
    schemaTypes,
    'here hot reload check',
  )

  return {
    name: 'abTest',
    studio: {
      components: {
        layout: (props) => ABTestProvider({...props, pluginConfig}),
      },
    },
    schema: {
      types: [abTestSchema(schemaTypes)],
    },
  }
})
