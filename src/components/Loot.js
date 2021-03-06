import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchBitcoin } from '../actions/bitcoin'

export class Loot extends Component {
  componentDidMount() {
    this.props.fetchBitcoin()
  }
  computeBitcoin() {
    const { bitcoin } = this.props
    if (Object.keys(bitcoin).length === 0) return ''

    return this.props.balance / bitcoin.bpi.USD.rate_float
  }
  render() {
    return <h3>Bitcoin balance: {this.computeBitcoin()}</h3>
  }
}

export default connect(
  state => state,
  { fetchBitcoin }
)(Loot)
