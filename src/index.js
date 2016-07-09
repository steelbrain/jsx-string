/* @flow */
/** @jsx h */

import escapeHTML from 'escape-html'

function h(name: string, props: ?Object = null, ...children: Array<Object>) {
  return {
    name,
    props,
    children,
  }
}

function jsx(item: any, escape: boolean = true): string {
  const type = typeof item
  if (type === 'undefined' || item === null) {
    return ''
  }
  if (type === 'number' || type === 'boolean') {
    return String(item)
  }
  if (type === 'string') {
    if (escape) {
      return escapeHTML(item)
    }
    return item
  }
  if (type !== 'object') {
    console.warn('[jsx-string] Unknown object type encountered:', type, 'of', item)
  }
  if (Array.isArray(item)) {
    const output = []
    for (let i = 0, length = item.length; i < length; ++i) {
      const result = jsx(item[i], escape)
      if (result.length) {
        output.push(result)
      }
    }
    return output.join('')
  }
  if (typeof item.name !== 'string' || typeof item.props !== 'object' || !Array.isArray(item.children)) {
    throw new Error('Unknown item encountered in jsx-string')
  }
  const attributes = []
  if (item.props !== null) {
    const props = Object.keys(item.props)
    for (let i = 0, length = props.length; i < length; ++i) {
      const name = props[i]
      const value = item.props[name]
      if (typeof value !== 'undefined' && value !== 'null') {
        const renderFriendlyName = name.replace('_', ':')
        attributes.push(`${renderFriendlyName}="${escapeHTML(value)}"`)
      }
    }
  }
  const output = [`<${item.name}${attributes.length ? ` ${attributes.join(' ')}` : ''}>`]
  const children = jsx(item.children, escape)
  if (children.length) {
    output.push(children)
  }
  output.push(`</${item.name}>`)
  return output.join('')
}

module.exports = jsx
module.exports.h = h
