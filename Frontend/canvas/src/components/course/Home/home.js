import React, { Component } from 'react'

export default class Home extends Component {
 

  render() {
    // alert("Home");
    return (
      <div>
            <ul class="list-group" style={{color:"#2d3b45", background:"#f5f5f5", borderBottom: "1px dashed #A5AFB5"}}>
                <li class="list-group-item-ctray" style={{backgroundColor:"faded"}}>
                    <div style={{listStyle:"none", fontSize:"25px"}}><u>Upcomings Assignments</u></div>
                    <div>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>Homework</li>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>Homework</li>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>Homework</li>
                    </div>
                </li>
            </ul>
      </div>
    )
  }
}
