import React from 'react'
import { mount, shallow, configure } from 'enzyme'
import { Loot } from './Loot'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Loot', () => {
  const mockFetchBitcoin = jest.fn()
  let props = { balance: 10, bitcoin: {} }
  let loot = shallow(<Loot {...props} />, { disableLifecycleMethods: true })

  it('renders properly', () => {
    expect(loot).toMatchSnapshot()
  })

  describe('when mounted', () => {
    beforeEach(() => {
      props.fetchBitcoin = mockFetchBitcoin
      loot = mount(<Loot {...props} />)
    })

    it('dispatches the `fetchBitoin()` method it receives from props', () => {
      expect(mockFetchBitcoin).toHaveBeenCalled()
    })
  })

  describe('when there are valid bitcoin props', () => {
    beforeEach(() => {
      props = { balance: 10, bitcoin: { bpi: { USD: { rate_float: 1000 } } } }
      loot = shallow(<Loot {...props} />, { disableLifecycleMethods: true })
    })

    it('display the correct bitcoin value', () => {
      expect(loot.find('h3').text()).toEqual('Bitcoin balance: 0.01')
    })
  })
})
