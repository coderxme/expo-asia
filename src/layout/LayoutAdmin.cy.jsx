import React from 'react'
import LayoutAdmin from './LayoutAdmin'

describe('<LayoutAdmin />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<LayoutAdmin />)
  })
})