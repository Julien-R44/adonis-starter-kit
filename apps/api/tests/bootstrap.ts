import type { Config } from '@japa/runner/types'

import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import { urlFor } from '@adonisjs/core/services/url_builder'
import testUtils from '@adonisjs/core/services/test_utils'
import app from '@adonisjs/core/services/app'

import { registry } from '../.adonisjs/client/registry.js'

/**
 * This file is imported by the "bin/test.ts" entrypoint file
 */

/**
 * Configure Japa plugins in the plugins array.
 * Learn more - https://japa.dev/docs/runner-config#plugins-optional
 */
export const plugins: Config['plugins'] = [
  assert(),
  pluginAdonisJS(app),
  apiClient({
    registry: registry.routes,
    patternSerializer: (pattern: any, params) => urlFor(pattern, params),
  }),
]

type RegistryRoutes = typeof registry.routes
declare module '@japa/api-client/types' {
  interface UserRoutesRegistry extends RegistryRoutes {}
}

/**
 * Configure lifecycle function to run before and after all the
 * tests.
 *
 * The setup functions are executed before all the tests
 * The teardown functions are executed after all the tests
 */
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [],
  teardown: [],
}

/**
 * Configure suites by tapping into the test suite instance.
 * Learn more - https://japa.dev/docs/test-suites#lifecycle-hooks
 */
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
