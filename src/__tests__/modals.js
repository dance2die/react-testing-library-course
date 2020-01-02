import React from 'react'
import {render, queries} from '@testing-library/react'
import {Modal} from '../modal'

test('modal show the children', () => {
  // const {getByTestId, debug} = render(
  // const bodyUtils = render(
  const {getByTestId} = render(
    <>
      <div data-testid="foo" />
      <Modal>
        <div data-testid="test" />
      </Modal>
    </>,
    {baseElement: document.getElementById('modal-root')},
  )

  // const {getByTestId} = within(document.getElementById('modal-root'))
  // within(document.body).getByTestId('foo')
  queries.getByTestId(document.body, 'foo')
  expect(getByTestId('test')).toBeInTheDocument()
})
