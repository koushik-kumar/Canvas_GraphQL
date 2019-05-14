import React, { Component } from 'react'

export default class Announcement extends Component {



  render() {
    return (
      // <div style={{border:"1px solid green", color:"black"}}>
      <div>
        <div >
            {/* render the main content of the announcement here from  */}
            <u>{this.props.display}</u>
        </div>
      </div>
    )
  }
}
