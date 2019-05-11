/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import UserStatistics from '../pages/usersStatistics.js'

describe('UserStatistics, with Enzyme', () => {
  it('UserStatistics shows header "User statistics: labor effectiveness"', () => {
    const props = { utils: [], total: [], pie: [], delta: [], errors : ['No errors, it is just a mock'] }
    var wrapper = shallow(<UserStatistics {...props} />)

      expect(wrapper.find('h2').text()).toEqual('User statistics: labor effectiveness')

  })
})

describe('UserStatistics, with Snapshot Testing', () => {
  it('App shows table header "User statistics: labor effectiveness"', () => {
    const props = { utils: [], total: [], pie: [], delta: [], errors : ['No errors, it is just a mock'] }
    const component = renderer.create(<UserStatistics {...props}/>)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
