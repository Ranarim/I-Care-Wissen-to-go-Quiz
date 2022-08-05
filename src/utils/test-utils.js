import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux'
// Import my own reducer
import {combineReducers as reducer} from "../reducers/index"

function render(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }