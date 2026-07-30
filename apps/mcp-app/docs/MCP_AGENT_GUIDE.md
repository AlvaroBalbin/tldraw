# tldraw MCP agent guide

What an agent needs to know to get a diagram onto a tldraw canvas on the first try. The full API reference is the `search` tool, not this file.

## Search before you exec

The `exec` runtime is not a stock tldraw app. `editor` is a focused Editor proxy, and the only other identifiers in scope are the exec helpers. Code copied from the tldraw docs often calls something that isn't there, which fails with `x is not defined`.

When you are unsure, ask `search` first:

```js
// which helpers can exec code call?
return spec.helpers.map((h) => h.name)

// does this Editor method exist, and what does it take?
return spec.members.filter((m) => m.name.includes('align'))
```

## Create shapes with the flat format

The focused Editor takes plain string shape IDs and flat shapes keyed by `_type`, with no `props` nesting:

```js
editor.createShape({
	_type: 'rectangle',
	shapeId: 'box1',
	x: 0,
	y: 0,
	w: 320,
	h: 120,
	text: 'Search first',
})
editor.createShape({ _type: 'note', shapeId: 'note1', x: 400, y: 0, text: 'Then exec' })
editor.createShape({
	_type: 'arrow',
	shapeId: 'a1',
	fromId: 'box1',
	toId: 'note1',
	x1: 0,
	y1: 0,
	x2: 100,
	y2: 0,
})
```

Raw tldraw partials (`{ type: 'geo', props: { richText: toRichText('Hi') } }`) also work, but the flat format is shorter and needs fewer lookups. Use `search` for the per-type fields: `return spec.types.shapes.find((s) => s.shapeType === 'arrow')`.

## Reuse the canvas id

Omit `canvasId` and `exec` starts a new blank canvas. Every result reports the canvas id it used, so pass that id back to keep refining the same board instead of scattering half-finished canvases.

## Footguns

- **Newlines.** Shape `text` renders real line breaks, which means a single escape in the JSON `code` string: `text: 'First line\nSecond line'`. Escaping twice (`\\n`) puts a literal `\n` on the canvas.
- **`shapeId`, not `id`.** Shapes read back from the focused Editor carry `shapeId`. For bulk operations use `editor.deleteShapes(editor.getCurrentPageShapes().map((s) => s.shapeId))`.
- **`getCurrentPageShapeIds()` returns a `Set`.** Spread it before passing it to a method that expects an array.
- **No network or timers.** `fetch`, `XMLHttpRequest`, `setTimeout`, and `setInterval` are disabled while exec code runs, and a script that runs longer than ten seconds is cut off.
