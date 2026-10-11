---
name: Canvas preview domain lookup
description: Construct mockup iframe URLs from the development domain without assuming it exists as a durable runtime global.
---

For canvas mockup previews, resolve `REPLIT_DOMAINS` through `shellExec` inside CodeExecution rather than reading it as a JavaScript global.

**Why:** The durable CodeExecution runtime does not expose that shell environment variable as a global; a direct reference fails even though the variable is available to shell commands.

**How to apply:** When building a `https://<domain>/__mockup/preview/...` URL for `applyCanvasActions`, read the domain using `shellExec`, keep it internal, and do not request or set the runtime-managed variable.
