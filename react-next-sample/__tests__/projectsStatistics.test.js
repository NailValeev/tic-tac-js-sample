/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import ProjectsStatistics from '../pages/projectsStatistics.js'

describe('ProjectsStatistics, with Enzyme', () => {
  it('ProjectsStatistics shows table header "Projects statistics"', () => {
  const props = { stats: [], deltas: [], errors : ['No errors, it is just a mock'] } 
  const app = shallow(<ProjectsStatistics {...props} />)

      expect(app.find('h2').text()).toEqual('Projects statistics')

  })
})

describe('ProjectsStatistics, with Snapshot Testing', () => {
  it('ProjectsStatistics shows header "Projects statistics"', () => {
    const props = { stats: [], deltas: [], errors : ['No errors, it is just a mock'] }
    const component = renderer.create(<ProjectsStatistics {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
