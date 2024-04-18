import {Box, Flex} from '@sanity/ui'
import {ComponentProps} from 'react'
import {UserViewComponent} from 'sanity/structure'
import {useAbTestVariants} from '../hooks/useAbTestVariants'

export type ABTestPaneOptions = {
  variants: {
    key: string
    resource: string
  }
}
export type ABTestPaneProps = ComponentProps<UserViewComponent<ABTestPaneOptions>>

export function ABTestPane(props: ABTestPaneProps) {
  const {document, options} = props ?? {}
  const {displayed, published} = document ?? {}
  const documentId = published?._id ?? displayed?._id ?? ''

  const {data} = useAbTestVariants(documentId)
  console.log('🚀 ~ ABTestPane ~ data:', data)

  console.log('🚀 ~ ABTestPane ~ displayed:', displayed._id, options)

  return (
    <Box padding={4}>
      <Flex>A/B Tests</Flex>
      <Flex>
        {Array.isArray(data) && data.map((test) => <Box key={test._id}>{test.variant.title}</Box>)}
        {/* {data.map((variant) => (
          <Box key={variant.key}>{variant.title}</Box>
        ))} */}
      </Flex>
    </Box>
  )
}
