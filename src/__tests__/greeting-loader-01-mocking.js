import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-01-mocking'
// import {loadGreeting as mockLoadGreeting} from '../api'

// jest.mock('../api')

test('loads greetings on click', () => {
  const expectedGreeting = 'an expected greeting'
  const mockLoadGreeting = jest.fn()
  mockLoadGreeting.mockResolvedValueOnce({
    data: {
      greeting: expectedGreeting,
    },
  })

  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  const inputValue = 'Mary'
  nameInput.value = inputValue

  fireEvent.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenCalledWith(inputValue)
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(expectedGreeting),
  )
})
