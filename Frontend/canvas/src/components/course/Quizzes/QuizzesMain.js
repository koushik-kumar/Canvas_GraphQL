import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, InputGroup, InputGroupAddon, FormText } from 'reactstrap';


export default class QuizzesMain extends Component {

  constructor() {
    super();

    this.state = {
      title: '',
      due: '',
      points: '',
      questions: ''
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
      [name]: value

    });
  }

  render() {
    return (
      <div>
        <div>
          <ul class="list-group" style={{ color: "#2d3b45", background: "#f5f5f5", borderBottom: "1px dashed #A5AFB5" }}>
            <li class="list-group-item-ctray" style={{ backgroundColor: "faded" }}>
              <div style={{ paddingBottom: "50px", paddingTop: "2px" }}>
                <div className="col-md-8" style={{ float: "left", height: "40px" }}><h2>Quizzes</h2></div>
                <div className="col-md-4" style={{ color: "blue", float: "right", height: "40px", display: "flex", justifyContent: "center" }}>
                  <button style={{ backgroundColor: "#0055a2", color: "white", width:"150px", borderRadius: "5px" }} onClick={this.toggle}><h5>+Quiz</h5></button>
                </div>
              </div>

              <div>
                <li style={{ background: "white", display: "block", boxSizing: "border-box", position: "relative", border: "1px solid #C7CDD1", padding: "12px 6px 12px 10px" }}>Quiz1
                  <FormText color="muted">
                    Due: 2019-04-18T00:00:00.000Z {this.state.due} | {this.state.points} points 50 | {this.state.questions} Questions 10
                  </FormText>
                </li>
                <li style={{ background: "white", display: "block", boxSizing: "border-box", position: "relative", border: "1px solid #C7CDD1", padding: "12px 6px 12px 10px" }}>Quiz2
                <FormText color="muted">
                    Due: Due 2019-04-30T00:00:00.000Z {this.state.due} | {this.state.points} points 40 | {this.state.questions} Questions 20
                  </FormText>
                </li>
                <li style={{ background: "white", display: "block", boxSizing: "border-box", position: "relative", border: "1px solid #C7CDD1", padding: "12px 6px 12px 10px" }}>Quiz3
                <FormText color="muted">
                    Due 2019-04-30T00:00:00.000Z {this.state.due} | {this.state.points} points 30 | {this.state.questions} Questions 15
                  </FormText>
                </li>
              </div>
            </li>
          </ul>
        </div>

        <div>

          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}><h3>Create a Quiz</h3></ModalHeader>
            <ModalBody>
              <Form onSubmit={(e) => e.preventDefault()}>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Title: &nbsp;</InputGroupAddon>
                    <Input name="title" type="text" value={this.state.title} onChange={this.inputChangeHandler} placeholder="" />
                  </InputGroup>
                  <br></br>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Due: &nbsp;</InputGroupAddon>
                    <Input name="due" type="Date" value={this.state.due} onChange={this.inputChangeHandler} placeholder="" />
                  </InputGroup>
                  <br></br>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Points: &nbsp;</InputGroupAddon>
                    <Input name="points" type="text" value={this.state.points} onChange={this.inputChangeHandler} placeholder="" />
                  </InputGroup>
                  <br></br>

                  <InputGroup>
                    <InputGroupAddon addonType="prepend">No. of Questions: &nbsp;</InputGroupAddon>
                    <Input name="questions" type="number" value={this.state.questions} onChange={this.inputChangeHandler} placeholder="" />
                  </InputGroup>
                  <br></br>

                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

      </div>
    )
  }
}
