import React from 'react'
import AutoLogout from './AutoLogout'

describe('<AutoLogout />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AutoLogout />)
  })
})