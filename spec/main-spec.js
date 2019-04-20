import jsxString, { h } from '..'
import test from 'ava'

/** @jsx h */

test('works well', function(t) {
  t.is(
    jsxString(
      <div>
        <span>Hello World</span>
      </div>,
    ),
    '<div><span>Hello World</span></div>',
  )
})
test('escapes bodies properly', function(t) {
  t.is(jsxString(<div>{'<script />'}</div>), '<div>&lt;script /&gt;</div>')
})
test('supports attributes', function(t) {
  t.is(
    jsxString(
      <div a="b">
        <span c_d="e">Hey</span>Man
      </div>,
    ),
    '<div a="b"><span c:d="e">Hey</span>Man</div>',
  )
})
test('supports attributes with more than one colon in self closing tags', function(t) {
  t.is(jsxString(<div a_b_c="d" />), '<div a:b:c="d" />')
})
test('supports escaping in attributes', function(t) {
  t.is(jsxString(<div a={'<script "" />'} />), '<div a="&lt;script &quot;&quot; /&gt;" />')
})
test('supports disabling escaping', function(t) {
  t.is(jsxString(<div>{'<script />'}</div>, { escape: false }), '<div><script /></div>')
})
