import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Provider} from 'react-redux'

import {createStore} from 'redux'
import {reducer} from '../redux-reducer'
import {Counter} from '../redux-counter'

function render(
  ui,
  {initialState, store = createStore(reducer, initialState), ...options} = {},
) {
  function Wrapper({children}) {
    return <Provider store={store}>{children}</Provider>
  }

  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...options}),
    store,
  }
}

test('can render with redux with defaults', () => {
  const {getByLabelText, getByText} = render(<Counter />)
  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const {getByLabelText, getByText} = render(<Counter />, {
    initialState: {count: 3},
  })

  fireEvent.click(getByText('-'))
  expect(getByLabelText(/count/i)).toHaveTextContent('2')
})
