import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';
import './assign_style.css'

export default class AssignmentMain extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            title:'',
            due:'',
            points:'',
            instructions:''
        };

        this.toggle = this.toggle.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
    
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
      inputChangeHandler = (e) => {
        e.preventDefault();
        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value
    
        });
    }

  render() {

    if (this.state.assgn) {
        var assignmentsLst = this.state.assgn.map(assignment => {
            return (
                <li class="border" style={{ fontWeight: "600" }}>
                    <div class="row" style={{ height: "40px" }}>
                        <i class="fal fa-edit padng"></i>
                        <a onClick={this.setID(assignment)}>{assignment.name}</a>
                        <br></br>
                        <span style={{ marginLeft: "2.5%", fontWeight: "300", color: "#6A757D", padding: "10px" }}>Due {assignment.due}</span>
                    </div>
                </li >
            )
        })
    }
      
    return (
        <div>
            <div>
                <ul class="list-group" style={{ color: "#2d3b45", background: "#f5f5f5", borderBottom: "1px dashed #A5AFB5" }}>
                    <li class="list-group-item-ctray" style={{ backgroundColor: "faded" }}>
                        <div style={{ paddingBottom: "50px", paddingTop: "2px" }}>
                            <div className="col-md-9" style={{ float: "left", height: "40px" }}><h2 >Assignments</h2></div>
                            <div className="col-md-3" style={{ color: "blue", float: "right", height: "40px", display: "flex", justifyContent: "center" }}>
                                <button style={{ backgroundColor: "#0055a2", color: "white" }} onClick={this.toggle}><h5>+Announcement</h5></button>
                            </div>
                        </div>

                        <div>
                            <li style={{ background: "white", display: "block", boxSizing: "border-box", position: "relative", border: "1px solid #C7CDD1", padding: "12px 6px 12px 10px" }}>{assignmentsLst}</li>
                            {/* <li style={{ background: "white", display: "block", boxSizing: "border-box", position: "relative", border: "1px solid #C7CDD1", padding: "12px 6px 12px 10px" }}>Homework</li> */}
                            {/* <li style={{ background: "white", display: "block", boxSizing: "border-box", position: "relative", border: "1px solid #C7CDD1", padding: "12px 6px 12px 10px" }}>Homework</li> */}
                        </div>
                    </li>
                </ul>
            </div>
            
            <div>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><h3>Create an assignment</h3></ModalHeader>
          <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <InputGroup>
                <InputGroupAddon  addonType="prepend">Title: &nbsp;</InputGroupAddon>
                <Input name="title" type="text" value={this.state.title} onChange={this.inputChangeHandler} placeholder="" />
            </InputGroup>
<br></br>

            <InputGroup>
                <InputGroupAddon  addonType="prepend">Due: &nbsp;</InputGroupAddon>
                <Input name="due" type="text" value={this.state.due} onChange={this.inputChangeHandler} placeholder="" />
            </InputGroup>
            <br></br>

            <InputGroup>
                <InputGroupAddon  addonType="prepend">Points: &nbsp;</InputGroupAddon>
                <Input name="points" type="text" value={this.state.points} onChange={this.inputChangeHandler} placeholder="" />
            </InputGroup>
            <br></br>

            <InputGroup>
                <InputGroupAddon addonType="prepend">Instructions: &nbsp;</InputGroupAddon>
                <Input name="instructions" type="textarea" placeholder="" value={this.state.instructions} onChange={this.inputChangeHandler} />
            </InputGroup>
          </FormGroup>
        </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Post</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>

            </div>
    )
  }
}
