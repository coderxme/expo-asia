import React from 'react'
import Program from './Program'

describe('<Program />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Program />)
  })
})