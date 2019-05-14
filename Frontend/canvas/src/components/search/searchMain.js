import React, { Component } from 'react'
import {Table, Button, FormGroup, Label,Input} from 'reactstrap'

export default class searchMain extends Component {

    constructor() {
        super();
    
        this.state = {
          term:'',
          courseID:'',
          courseName:'',
          register:'',
          status:''
    
          
        }
      }

  render() {
    return (
        <div>
            <div className="kkk col-md-10 offset-md-1" style={{ position: "relative", paddingLeft: "5px" }} >
                <div className="col-md-12" style={{ paddingTop: "10px" }} >
                    <span style={{ fontSize: "1.8em" }} ><h2>Course Register</h2></span>
                </div>
                <hr ></hr>
                <div>
                    <ul class="list-group" style={{ color: "#2d3b45", background: "#f5f5f5", borderBottom: "1px dashed #A5AFB5" }}>
                        <li class="list-group-item-ctray" style={{ backgroundColor: "faded" }}>
                            <div style={{ paddingBottom: "50px", paddingTop: "2px" }}>
                                <div className="col-md-9" style={{ float: "left", height: "40px" }}><h3>Search Courses</h3></div>
                                {/* <div className="col-md-3" style={{ color: "blue", float: "right", height: "40px", display: "flex", justifyContent: "center" }}>
                                <button style={{ backgroundColor: "#0055a2", color: "white" }} onClick={this.toggle}><h5>+Announcement</h5></button>
                            </div> */}
                            </div>
                            <div className="col-md-9" style={{ padding: "15px" }}>
                                <div className="col-md-3" style={{ /*border: "1px solid red",*/ float: 'left' }}><h4>Term</h4></div>
                                <div className="col-md-3 offset-3" style={{  paddingTop: "5px" }}>
                                {/* <FormGroup> */}
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Fall</option>
                                        <option>Spring</option>
                                        <option>Summer</option>
                                    </Input>
                                {/* </FormGroup> */}
                                </div>
                            </div>
                            {/* <br></br> */}
                            <div className="col-md-9" style={{ padding: "15px" }}>
                                <div className="col-md-3" style={{ float: 'left' }}><h4>Course Name</h4></div>
                                <div className="col-md-5 offset-3" ><input style={{width:"180px", height:"40px"}}  type="text" /></div>
                            </div>
                            {/* <br></br> */}
                            <div className="col-md-10" style={{ padding: "15px" }} >
                                <div className="col-md-3" style={{ float: 'left',paddingRight:"0" }}><h4>Course ID</h4></div>
                                <div className="col-md-3 offset-3" style={{ padding:"0"}}>
                                {/* <FormGroup> */}
                                    <Input type="select" name="select" id="exampleSelect" style={{width:"180px"}}>
                                        <option>is exactly</option>
                                        <option>is greater than</option>
                                        <option>is less than</option>
                                    </Input>
                                {/* </FormGroup> */}
                                </div>
                                <div className="col-md-3 offset-6" style={{ border: "1px solid red"}} ><input style={{width:"200px"}} type="text" /></div>
                            </div>
                            <div className="col-md-2" style={{ float: "left" }}>
                                <Button style={{ background: "#0055a2", border: "#0055a2" }} onClick={this.toggle}>Search</Button>{" "}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="col-md-10 offset-md-1" style={{ position: "relative", paddingLeft: "5px"}} >
                <Table hover style={{ marginTop: "50px" }}>
                    <thead>
                        <tr style={{ color: "black" }}>
                            <th>Term</th>
                            <th>Course ID</th>
                            <th>Course Name</th>
                            <th>Register</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Homework1</td>
                            <td>123</td>
                            <td>Late</td>
                            <td>10</td>
                            <td><Button style={{ background: "#0055a2", border: "#0055a2" }} >Drop course</Button></td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>Midterm</td>
                            <td>345</td>
                            <td></td>
                            <td>5</td>
                            <td><Button style={{ background: "#0055a2", border: "#0055a2" }} >Drop course</Button></td>
                            <td>10</td>
                        </tr>
                        <tr>
                            <td>Homework1</td>
                            <td>567</td>
                            <td></td>
                            <td>10</td>
                            <td><Button style={{ background: "#0055a2", border: "#0055a2" }} >Drop course</Button></td>
                            <td>10</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
  }
}
