import React from 'react'
import Forum from "./forum/Forum"
import MilitaryBranch from "./military-branch/MilitaryBranch"
import Category from './category/Category'

export default function Registration() {
  return (
    <div className='flex flex-col gap-5'>
        <Forum />
        <MilitaryBranch />
        <Category />
    </div>
  )
}
