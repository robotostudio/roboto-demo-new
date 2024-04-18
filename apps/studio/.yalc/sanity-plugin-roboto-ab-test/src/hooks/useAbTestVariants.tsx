import {useQuery} from 'react-query'
import {useClient} from 'sanity'

import {API_VERSION} from '../constants'

const query = `*[_type == "abTest" && !(_id in path("drafts.**")) && references($id)]{
  _id,
  title,
  "variant":variants[@.resource->_id == $id][0]{
    key,
    _key,
    resource->{
      _id,
      title,
      slug
    }   
  } 
}`

type Variant = {
  key: string
  _key: string
  _id: string
  title: string
  slug: string
}

type AbTest = {
  _id: string
  title: string
  variant: Variant
}

export function useAbTestVariants(documentId: string) {
  const client = useClient({apiVersion: API_VERSION})
  return useQuery<AbTest[]>({
    queryKey: ['abTestVariants', documentId],
    queryFn: () => client.fetch<AbTest[]>(query, {id: documentId}),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })
}
