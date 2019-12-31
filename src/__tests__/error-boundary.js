// import React from 'react'
// import {render} from '@testing-library/react'
// import {reportError as mockReportError} from '../api'
// import {ErrorBoundary} from '../error-boundary'

// jest.mock('../api')

// afterEach(() => {
//   jest.clearAllMocks()
// })

// function Bomb({shouldThrow}) {
//   if (shouldThrow) {
//     throw new Error('💣')
//   } else {
//     return null
//   }
// }

// test('calls reportError and renders that there was a problem', () => {
//   mockReportError.mockResolvedValueOnce({success: true})
//   const {rerender} = render(
//     <ErrorBoundary>
//       <Bomb />
//     </ErrorBoundary>,
//   )

//   rerender(
//     <ErrorBoundary>
//       <Bomb shouldThrow={true} />
//     </ErrorBoundary>,
//   )

//   const error = expect.any(Error)
//   const info = {componentStack: expect.stringContaining('Bomb')}
//   expect(mockReportError).toHaveBeenCalledWith(error, info)
//   expect(mockReportError).toHaveBeenCalledTimes(1)
// })

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {reportError as mockReportError} from '../api'
import {ErrorBoundary} from '../error-boundary'

jest.mock('../api')
// this is only here to make the error output not appear in the project's output
// even though in the course we don't include this bit and leave it in it's incomplete state.
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterAll(() => {
  console.error.mockRestore()
})

afterEach(() => {
  jest.clearAllMocks()
})

function Bomb({shouldThrow}) {
  if (shouldThrow) {
    throw new Error('💣')
  } else {
    return null
  }
}

test('calls report error and renders that there was a problem', () => {
  mockReportError.mockResolvedValueOnce({success: true})

  const {rerender, getByText, queryByRole, queryByText} = render(<Bomb />, {
    wrapper: ErrorBoundary,
  })
  rerender(<Bomb shouldThrow={true} />)

  const error = expect.any(Error)
  const info = {componentStack: expect.stringContaining('Bomb')}
  expect(mockReportError).toHaveBeenCalledWith(error, info)
  // expect(mockReportError).toHaveBeenCalledTimes(1)
  expect(console.error).toHaveBeenCalledTimes(2)

  console.error.mockClear()
  mockReportError.mockClear()

  rerender(<Bomb />)

  fireEvent.click(getByText(/try again/i))

  expect(mockReportError).not.toHaveBeenCalled()
  expect(console.error).not.toHaveBeenCalled()

  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
