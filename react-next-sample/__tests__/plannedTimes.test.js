/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import PlannedTimes from '../pages/plannedTimes.js'

describe('PlannedTimes, with Enzyme', () => {
  it('PlannedTimes shows header "Time planning"', async () => {
    const props = { plans: [], errors : ['No errors, it is just a mock'] }
    const app = shallow(<PlannedTimes {...props}/>)
      expect(app.find('h2').text()).toEqual('Time planning.')

  })
})

describe('PlannedTimes, with Snapshot Testing', () => {
  it('PlannedTimes shows header "Time planning"', () => {
    const props = { plans: [], errors : ['No errors, it is just a mock'] }
    const component = renderer.create(<PlannedTimes {...props}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
