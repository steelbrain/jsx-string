/* @flow */
/** @jsx h */

import escapeHTML from 'escape-html'
import type { Options } from './types'

function h(name: string, props: ?Object = null, ...children: Array<Object>) {
  return {
    name,
    props,
    children,
  }
}

function handleString(item: string, options: Options): string {
  if (options.escape) {
    return escapeHTML(item)
  }
  return item
}

function handleArray(items: Array<any>, options: Options): string {
  // eslint-disable-next-line no-use-before-define
  return items.map(item => handle(item, options)).join('')
}

function handleObect(item: string, options: Options): string {
  const attributes = []
  if (item.props !== null) {
    const props = Object.keys(item.props)
    for (let i = 0, length = props.length; i < length; ++i) {
      const name = props[i]
      const value = item.props[name]
      if (typeof value !== 'undefined' && value !== 'null') {
        const renderFriendlyName = name.replace(/_/g, ':')
        attributes.push(`${renderFriendlyName}="${escapeHTML(value)}"`)
      }
    }
  }
  const itemName = item.name.replace(/_/g, ':')
  const openingTag = `<${itemName}${attributes.length ? ` ${attributes.join(' ')}` : ''}>`
  if (!item.children.length) {
    return `${openingTag.slice(0, -1)} />`
  }

  const output = [openingTag]
  // eslint-disable-next-line no-use-before-define
  const children = handle(item.children, options)
  if (children.length) {
    output.push(children)
  }
  output.push(`</${item.name}>`)
  return output.join('')
}

function handle(item: any, options: Options): string {
  const type = typeof item
  if (type === 'undefined' || item === null) {
    return ''
  }
  if (type === 'number' || type === 'boolean') {
    return item.toString()
  }
  if (type === 'string') {
    return handleString(item, options)
  }
  if (Array.isArray(item)) {
    return handleArray(item, options)
  }
  if (type === 'object') {
    return handleObect(item, options)
  }
  throw new Error(`Unrecognized input type provided to jsx-string: ${type}`)
}

module.exports = handle
module.exports.h = h
