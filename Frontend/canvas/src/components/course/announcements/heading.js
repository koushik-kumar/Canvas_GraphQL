import React, { Component } from 'react'

export default class Heading extends Component {
  render() {
    return (
      <div>
        <h4 style={{color:"black"}}><u>{this.props.display}</u></h4>
      </div>
    )
  }
}
