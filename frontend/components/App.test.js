import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
// Write your tests here

test("Should find and press left button", () => {
  render(<AppFunctional/>)
  const coords = screen.getByTestId("coords")
  const leftButton = screen.getByTestId("left")
  fireEvent.click(leftButton)
  expect(coords.textContent).toBe("Coordinates (1, 2)")
})
test("Should find and press right button", () => {
  render(<AppFunctional/>)
  const coords = screen.getByTestId("coords")
  const rightButton = screen.getByTestId("right")
  fireEvent.click(rightButton)
  expect(coords.textContent).toBe("Coordinates (3, 2)")
})
test("Should find and press up button", () => {
  render(<AppFunctional/>)
  const coords = screen.getByTestId("coords")
  const upButton = screen.getByTestId("up")
  fireEvent.click(upButton)
  expect(coords.textContent).toBe("Coordinates (2, 1)")
})
test("Should find and press down button", () => {
  render(<AppFunctional/>)
  const coords = screen.getByTestId("coords")
  const downButton = screen.getByTestId("down")
  fireEvent.click(downButton)
  expect(coords.textContent).toBe("Coordinates (2, 3)")
})
test("input value will change", () => {
  render(<AppFunctional/>)
  const inputField = screen.getByTestId("email")
  fireEvent.change(inputField,{
    target: {
      value: "testing input value change"
    }
  })
  expect(inputField.value).toBe("testing input value change")
})