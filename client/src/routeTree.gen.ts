/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as StatusesImport } from './routes/statuses'
import { Route as CategoriesImport } from './routes/categories'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const StatusesRoute = StatusesImport.update({
  id: '/statuses',
  path: '/statuses',
  getParentRoute: () => rootRoute,
} as any)

const CategoriesRoute = CategoriesImport.update({
  id: '/categories',
  path: '/categories',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/categories': {
      id: '/categories'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof CategoriesImport
      parentRoute: typeof rootRoute
    }
    '/statuses': {
      id: '/statuses'
      path: '/statuses'
      fullPath: '/statuses'
      preLoaderRoute: typeof StatusesImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/categories': typeof CategoriesRoute
  '/statuses': typeof StatusesRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/categories': typeof CategoriesRoute
  '/statuses': typeof StatusesRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/categories': typeof CategoriesRoute
  '/statuses': typeof StatusesRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/categories' | '/statuses'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/categories' | '/statuses'
  id: '__root__' | '/' | '/categories' | '/statuses'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CategoriesRoute: typeof CategoriesRoute
  StatusesRoute: typeof StatusesRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CategoriesRoute: CategoriesRoute,
  StatusesRoute: StatusesRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/categories",
        "/statuses"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/categories": {
      "filePath": "categories.tsx"
    },
    "/statuses": {
      "filePath": "statuses.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
