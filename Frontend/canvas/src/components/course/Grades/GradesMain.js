import React, { Component } from 'react'
import { Table, Input, Label, Form, FormGroup} from 'reactstrap';

export default class GradesMain extends Component {

  constructor() {
    super();

    this.state = {
      username:'Koushik Kumar Kamala',
      userCourses: JSON.parse(localStorage.getItem('courseCards')),
      due:'Feb 23 by 11:59pm'

      
    }
  }


  render() {

    let courseName='';

    courseName = this.state.userCourses.map(course => {

      return (
        <option>{course.CourseName}</option>
      )
    })


    return (
      <div>
        
        <div style={{color:"black"}}><h1>Grades for &nbsp;{this.state.username}</h1></div>
        <div style={{paddingTop:"30px"}}>
          <Form inline>
            <FormGroup>
              <div style={{ color:"black", paddingRight:"50px", paddingBottom:"0"}}>
                <Label style={{float:"left", textAlign:"left"}} for="course"><h6>Course</h6></Label><br></br>
                <Input type="select" name="course" id="course">
                  {courseName}
                </Input>
                </div>
                <div style={{ color:"black", paddingLeft:"50px", paddingBottom:"0"}}>
                <Label style={{float:"left", textAlign:"left"}}  for="arrangeBy"><h6>Arrange By</h6></Label><br></br>
                <Input type="select" name="arrangeBy" id="arrangeBy">
                  <option value="Assignment Group">Assignment Group</option>
                  <option value="Due Date">Due Date</option>
                  <option value="Title">Title</option>
                </Input>
              </div>
            </FormGroup>
          </Form>
        </div>
        <div>
        <Table hover style={{marginTop:"50px"}}>
        <thead>
          <tr style={{color:"black"}}>
            <th>Name</th>
            <th>Due</th>
            <th>Status</th>
            <th>Score</th>
            <th>Out of</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Homework1</td>
            <td>{this.state.due}</td>
            <td>Late</td>
            <td>10</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Midterm</td>
            <td>{this.state.due}</td>
            <td></td>
            <td>5</td>
            <td>10</td>
          </tr>
          <tr>
            <td>Homework1</td>
            <td>{this.state.due}</td>
            <td></td>
            <td>10</td>
            <td>10</td>
          </tr>
        </tbody>
      </Table>
        </div>
      </div>
    )
  }
}
