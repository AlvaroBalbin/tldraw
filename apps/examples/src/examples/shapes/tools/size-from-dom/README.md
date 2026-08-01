---
title: DOM-based shape size
component: ./SizeFromDomExample.tsx
priority: 10
keywords:
  [
    dom sizing,
    dynamic size,
    resizeobserver,
    editoratom,
    atommap,
    getgeometry,
    measure,
    htmlcontainer,
    responsive,
  ]
---

A custom shape whose size is derived from its rendered DOM.

---

Most custom shapes store their width and height in their props, but a shape whose content is laid out by the browser—wrapping text, a table, or any HTML that sizes itself—doesn't know its own dimensions until it has rendered. This example measures the rendered DOM and feeds those measurements back into the shape's geometry.

Sizes are kept in an `EditorAtom` rather than in shape props, so measuring doesn't write to the store on every frame. The `useDynamicShapeSize` hook attaches a `ResizeObserver` to the shape's element and writes the observed dimensions into that atom, and `getGeometry` reads them back so hit-testing, selection bounds, and snapping all follow the rendered content. Because the atom is reactive, the editor re-derives geometry as soon as a measurement changes.

Two details matter when adapting this pattern: the shape opts out of culling, since a culled shape is unmounted and can no longer be measured, and it registers an after-delete handler so size entries don't outlive their shapes.
