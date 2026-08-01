---
title: Toolbar groups
component: ./ToolbarGroupsExample.tsx
keywords:
  [
    toolbar,
    toolbar groups,
    TldrawUiMenuGroup,
    DefaultToolbar,
    customize toolbar,
    toolbar items,
    toolbar layout,
    orientation,
  ]
---

Create groups within the toolbar to separate related concepts.

---

The default toolbar presents every tool in a single run. Once an app adds its own tools, or hides some of the defaults, it helps to break the toolbar into runs so that related tools sit together—selection and navigation in one group, drawing tools in another, shapes in a third.

To do this, override the `Toolbar` component and render `DefaultToolbar` with your own children, wrapping each run in a `TldrawUiMenuGroup`. Each group needs a unique `id`, and tldraw draws a divider between adjacent groups. The individual items are the same toolbar item components the default toolbar uses, such as `SelectToolbarItem` and `RectangleToolbarItem`, so you can reorder or omit them freely and mix in `TldrawUiMenuItem` for your own tools.

`DefaultToolbar` also takes an `orientation` prop, which this example toggles between `horizontal` and `vertical` to show the groups laid out both ways.
