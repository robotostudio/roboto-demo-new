import {FeatureReference} from '../types'

export function createReference(
  key: string,
  ref: string,
  type: string,
  strengthenOnPublish: boolean = true,
): FeatureReference {
  return {
    _key: key,
    _type: 'featureReferenceValue',
    value: {
      _type: 'reference',
      _ref: ref,
      _weak: true,
      // If the user has configured weakReferences, we won't want to strengthen them
      ...(strengthenOnPublish ? {_strengthenOnPublish: {type}} : {}),
    },
  }
}
