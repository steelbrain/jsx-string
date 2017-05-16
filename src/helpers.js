/* @flow */

import type { Options } from './types'

// eslint-disable-next-line import/prefer-default-export
export function fillOptions(param): Options {
  const given = param || {}
  const options = {}

  if (typeof given.escape !== 'undefined') {
    options.escape = !!given.escape
  } else options.escape = true

  return options
}
