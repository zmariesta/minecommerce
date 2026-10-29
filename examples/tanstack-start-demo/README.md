# TanStack Start Mini Demo (isolated example)

This optional folder is intentionally isolated from the main Next.js app, because a repository should not combine two competing root routers. It contains a minimal TanStack Start app with a file-based index route, a server function, route loader, SSR, and root document. Package versions use `latest` because this optional framework changes quickly; resolve and verify current versions in this folder before committing a lockfile.

The code in this folder is a minimal starting point. If the framework plugin changes, the safest supported scaffold path is the official CLI:

```bash
npx @tanstack/cli@latest create tanstack-start-demo
```

Choose the React + file-router setup. Then copy the route pattern and project concepts from the official docs:

- https://tanstack.com/start/latest/docs/framework/react/getting-started
- https://tanstack.com/start/latest/docs/framework/react/build-from-scratch

Recommended mini-demo scope: `/` with a loader and server-rendered product count, `/products` with a typed route search parameter, and one validated server function. Keep this small and explain the differences in routing/SSR from Next.js. The primary CommercePilot app remains fully self-contained at repository root.
