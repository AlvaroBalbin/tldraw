---
title: Crash event handling
component: ./CrashEventHandlingExample.tsx
priority: 3
keywords: [crash, error handling, error tracking, editor events, reporting, sentry]
---

Listen for the editor's crash event to report fatal errors.

---

When the editor hits a fatal error while processing an event, it enters a crashed state and stops processing new events. Listen for the editor's `crash` event to send the error to your own error tracking service (like Sentry) before the error screen appears.

Open your browser's console to see the reported error.

To customize the error screen that users see after a crash, override the `ErrorFallback` component. There's a separate example showing how to do that.
