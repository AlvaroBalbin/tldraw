---
title: Text mass style updates
component: ./TextMassStyleUpdates.tsx
priority: 2
keywords: [text, contextual, mass, style, bold, italic, highlight, styles]
---

Update rich text properties on many text shapes at once, for all the text.

---

The style panel applies tldraw's own styles, like color and size, to a whole selection. Rich text marks work differently: bold, italic, and highlight live inside each shape's `richText` document rather than in a shared style prop, so there is no built-in way to toggle them across a selection. This example adds that.

Custom buttons are added by overriding the `StylePanel` component and rendering them above `DefaultStylePanelContent`, so the default styles stay available. The buttons appear only when the selection contains text.

Each `richText` value is a ProseMirror document, so the example parses it with `Node.fromJSON` and uses ProseMirror's own mark utilities instead of walking the raw JSON. `getShapeAndDescendantIds` collects text inside frames and groups as well as directly selected shapes, and every update runs inside a single `editor.run` transaction so the whole selection changes together. Toggling is decided across the selection as a whole: if every text node already carries the mark it is removed everywhere, otherwise it is added everywhere.
