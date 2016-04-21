'use babel'

import jsxString from '../'

/** @jsx jsxString.h */

describe('JSX String', function() {
  it('works well', function() {
    expect(jsxString(
      <div><span>
        {'Hello World'}
      </span></div>
    )).toBe('<div><span>Hello World</span></div>')
  })
  it('escapes bodies properly', function() {
    expect(jsxString(
      <div>{'<script />'}</div>
    )).toBe('<div>&lt;script /&gt;</div>')
  })
  it('supports attributes', function() {
    expect(jsxString(
      <div a="b">
        <span c_d="e">Hey</span>Man
      </div>
    )).toBe('<div a="b"><span c:d="e">Hey</span>Man</div>')
  })
  it('supports escaping in attributes', function() {
    expect(jsxString(
      <div a={'<script "" />'}></div>
    )).toBe('<div a="&lt;script &quot;&quot; /&gt;"></div>')
  })
})
