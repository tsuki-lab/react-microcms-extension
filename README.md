# react-microcms-extension

[![npm version](https://badge.fury.io/js/react-microcms-extension.svg)](https://badge.fury.io/js/react-microcms-extension)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This library will help you create [microCMS extension fields](https://document.microcms.io/manual/field-extension) in React.

There are two types of custom hooks offered.

- [useMicroCMSExtension](#usemicrocmsextension)
- [useMicroCMSExtensionState](#usemicrocmsextensionstate)

## Quick start

```shell
npm install react-microcms-extension
# or
yarn add react-microcms-extension
```

Use simple.

```tsx
import { useMicroCMSExtension } from 'react-microcms-extension'

function App() {
  const { state, post } = useMicroCMSExtension<string>()

  return (
    <input
      type="text"
      value={state?.message?.data ?? ''}
      onChange={(e) => {
        post({
          description: e.target.value,
          data: e.target.value,
        })
      }}
    />
  )
}
```

# useMicroCMSExtension

## Usage

```tsx
import { useMicroCMSExtension } from 'react-microcms-extension'

function App() {
  const { state, post } = useMicroCMSExtension<string>()

  return (
    <input
      type="text"
      value={state?.message?.data ?? ''}
      onChange={(e) => {
        post({
          description: e.target.value,
          data: e.target.value,
        })
      }}
    />
  )
}
```

## Description

```ts
type State = {
  // ...
}

const options = {
  height: 500,
  origin: 'https://example.microcms.microcms.io',
}

const { state, post, postState } = useMicroCMSExtension<State>(options)
```

### state

The state at the time of initialization can be handled.

### post

POST data to microCMS. Calls `window.parent.postMessage` internally.

Please refer to the [microCMS documentation](https://document.microcms.io/manual/iframe-field#h7f543cc470) for the parameters that can be posted.

### postState

The state of the result of executing the post() method.
It will contain information of action type `MICROCMS_POST_DATA_SUCCESS` or `MICROCMS_POST_DATA_FAILURE`.

## Options

| Key    | Type             | Default             | Description                                                            |
| ------ | ---------------- | ------------------- | ---------------------------------------------------------------------- |
| height | string \| number | 300                 | height of the extended field                                           |
| width  | string \| number | '100%'              | width of the extended field                                            |
| origin | string           | MessageEvent.origin | microCMS admin screen URL (https://\<serviceId\>.microcms.microcms.io) |

# useMicroCMSExtensionState

A custom hook that wraps `useMicroCMSExtension` so that it can be treated like `useState`.

## Usage

```tsx
import { useMicroCMSExtensionState } from 'react-microcms-extension'

function App() {
  const [state, setState] = useMicroCMSExtensionState('')

  return (
    <input
      type="text"
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  )
}
```

## Description

```ts
type State = {
  // ...
}

const initialState: State = {
  // ...
}

const options = {
  height: 500,
  origin: 'https://example.microcms.microcms.io',
}

const [state, setState] = useMicroCMSExtensionState<State>(
  initialState,
  options
)
```

## Options

Inherits `useMicroCMSExtension` options.

### parsePostMessageParams

parse MessageParams when postEvent to microCMS

#### example

```ts
type State = {
  id: string
  text: string
}

const initialState: State = {
  id: '',
  text: ''
}

const [state, setState] = useMicroCMSExtensionState<State>(initialState, {
  parsePostMessageParams: (data) => ({
    id: data.id
    description: data.text,
    data
  }),
})
```
