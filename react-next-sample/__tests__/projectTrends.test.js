/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import ProjectTrends from '../pages/projectTrends.js'

describe('ProjectTrends, with Enzyme', () => {
  it('ProjectTrends shows header "Project trends, billed hours 2018"', () => {
    const props = { trends: [], errors : ['No errors, it is just a mock'] }
    const app = shallow(<ProjectTrends {...props} />)

      expect(app.find('h2').text()).toEqual('Project trends, billed hours 2018')

  })
})

describe('ProjectTrends, with Snapshot Testing', () => {
  it('ProjectTrends shows  header "Project trends, billed hours 2018"', () => {
    const props = { trends: [], errors : ['No errors, it is just a mock'] }
    const component = renderer.create(<ProjectTrends {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
