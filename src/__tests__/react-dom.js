import React from 'react'
import user from '@testing-library/user-event'
import {render} from '@testing-library/react'
import {axe} from 'jest-axe'

import {FavoriteNumber} from '../favorite-number'

// expect.extend(toHaveNoViolations)

function InaccessibleForm() {
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input placeholder="email" id="email" />
    </form>
  )
}

test('InaccessibleForm is valid', async () => {
  const {container} = render(<InaccessibleForm />)
  // console.log(container.innerHTML)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

test('entering an invalid value shows an error message', () => {
  const {getByLabelText, getByRole, queryByRole, rerender} = render(
    <FavoriteNumber />,
  )
  const input = getByLabelText(/favorite number/i)

  user.type(input, '11')
  expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)

  rerender(<FavoriteNumber max={11} />)
  expect(queryByRole('alert')).toBeNull()

  // rerender(<FavoriteNumber max={11} />)

  // const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  // const input = getByLabelText(/favorite number/i)
  // fireEvent.change(input, {target: {value: '1299'}})

  // const alert = getByRole('alert')
  // expect(alert).toHaveTextContent(/the number is invalid/i)

  // const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  // const input = getByLabelText(/favorite number/i)
  // fireEvent.change(input, {target: {value: '11'}})

  // const alert = getByRole('alert')
  // expect(alert).toHaveTextContent(/the number is invalid/i)

  // const {getByLabelText, getByRole} = render(<FavoriteNumber />)
  // const input = getByLabelText(/favorite number/i)

  // fireEvent.change(input, {target: {value: '10'}})
  // expect(getByRole('alert')).toHaveTextContent(/the number is invalid/i)
})

test('renders a number input with a label "Favorite Number"', () => {
  const {getByLabelText} = render(<FavoriteNumber />)
  const input = getByLabelText(/favorite number/i)
  expect(input).toHaveAttribute('type', 'number')
})
