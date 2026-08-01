---
title: Commenting sidebar
component: ./CommentingSidebarExample.tsx
priority: 2
keywords: [comments, commenting, sidebar, list, panel, threads, filters]
---

A thread list panel beside the canvas: every page's comments, filterable, with a host-supplied toggle button.

---

Comment pins live on the canvas, so they only show the threads on the current page and you have to pan around to find them. A sidebar is the companion to that: it lists threads across the whole document, so a reviewer can work through them in one place.

`CanvasCommentsSidebar` renders the list and `CanvasComments` renders the pins. Both are placed in the `InFrontOfTheCanvas` slot and both take the same `CommentingContext`, which tells them who the current user is and how to turn an author id into a display name and color. Building that context once and passing it to both keeps the two views consistent.

Comments are stored as records in the editor's own store, so adding `commentSchemaRecords` to the schema is all it takes for threads to persist and sync alongside shapes. Opening and closing the sidebar is left to the host: `commentsSidebarOpen` holds the state and `toggleCommentsSidebar` flips it, which this example drives from a button in the `SharePanel` slot. That button matters, because the comment tool closes the sidebar while it is active.
