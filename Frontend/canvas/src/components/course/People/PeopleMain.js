import React, { Component } from 'react'
import { Table, Input, Label, Form, FormGroup} from 'reactstrap';

export default class PeopleMain extends Component {

  constructor() {
    super();

    this.state = {
      name: 'Koushik Kumar Kamala',
      section: 'SP19: CMPE-180C Section 02',
      role: 'Student'

    }
  }

  render() {
    return (
      <div>
        <div>
          <div><h2>People</h2></div>
        </div>

        <div>
          <Table hover style={{ marginTop: "50px" }}>
            <thead>
              <tr style={{ color: "black" }}>
                <th>Name</th>
                <th>Section</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody style={{ color: "black" }}>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.section}</td>
                <td>{this.state.role}</td>
              </tr>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.section}</td>
                <td>{this.state.role}</td>
              </tr>
              <tr>
                <td>{this.state.name}</td>
                <td>{this.state.section}</td>
                <td>{this.state.role}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}
