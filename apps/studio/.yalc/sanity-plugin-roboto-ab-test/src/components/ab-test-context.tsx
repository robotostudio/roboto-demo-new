import {createContext, useContext} from 'react'
import {LayoutProps} from 'sanity'

import {DEFAULT_CONFIG} from '../constants'
import {PluginConfig} from '../types'
import {ThemeProvider} from '@sanity/ui'
import {QueryClient, QueryClientProvider} from 'react-query'

const ABTestContext = createContext<Required<PluginConfig>>(DEFAULT_CONFIG)

export function useABTestContext() {
  return useContext(ABTestContext)
}

type ABTestProviderProps = LayoutProps & {
  pluginConfig: Required<PluginConfig>
}
const queryClient = new QueryClient()

/**
 * This Provider wraps the Studio and provides the DocumentInternationalization context to document actions and components.
 */
export function ABTestProvider(props: ABTestProviderProps) {
  const {pluginConfig} = props

  return (
    <ABTestContext.Provider value={pluginConfig}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{props.renderDefault(props)}</ThemeProvider>
      </QueryClientProvider>
    </ABTestContext.Provider>
  )
}
