import React from 'react'
import btnLogout from './ButtonLogout'

describe('<btnLogout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<btnLogout />)
  })
})