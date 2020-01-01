import React from 'react'
import {render as rtlRender, fireEvent} from '@testing-library/react'
import {Router} from 'react-router-dom'
import {createMemoryHistory} from 'history'

import {Main} from '../main'

function render(ui, {route = '/', ...renderOptions} = {}) {
  const history = createMemoryHistory({initialEntries: [route]})

  function Wrapper({children}) {
    return <Router history={history}>{children}</Router>
  }

  // return rtlRender(ui, {wrapper: Wrapper, ...renderOptions})
  return {
    ...rtlRender(ui, {wrapper: Wrapper, ...renderOptions}),
    history,
  }
}

test('main renders about and home and I can navigate to those pages', () => {
  const {getByRole, getByText} = render(<Main />)

  expect(getByRole('heading')).toHaveTextContent(/home/i)
  fireEvent.click(getByText(/about/i))
  expect(getByRole('heading')).toHaveTextContent(/about/i)
})

test('landing on a bad page shows no match component', () => {
  const {getByRole} = render(<Main />, {
    route: '/bad-url',
  })

  expect(getByRole('heading')).toHaveTextContent(/404/i)
})
