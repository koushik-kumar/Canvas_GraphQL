import React, { Component } from 'react'
import { InputGroup, InputGroupAddon, Form, InputGroupText, Input, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { cookie } from 'react-cookies';
import axios from "axios"



export default class AddCourseMain extends Component {

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required="true" for this component
        this.state = {
            addCourseModal: false,
            CUID:Math.random(),
            courseName:'',
            courseID:'',
            department:'',
            description:'',
            room:'',
            capacity:'',
            waitlist:'',
            term:'',
            color:'',
            UserID:''
        }

        this.toggle = this.toggle.bind(this); 
        this.createCourse = this.createCourse.bind(this);

    }

    createCourse= (e) => {

        console.log("COKOEKOEKOEKOKE:"+localStorage.getItem('UserID'))

        const newCourseData = {
            CUID:this.state.CUID,
            courseName:this.state.courseName,
            courseID:this.state.courseID,
            department:this.state.department,
            description:this.state.description,
            room:this.state.room,
            capacity:this.state.capacity,
            waitlist:this.state.waitlist,
            term:this.state.term,
            color:this.state.color,
            // UserID:cookie.get('userID')
            UserID:localStorage.getItem('UserID')
        }

        this.setState(prevState => ({
            addCourseModal: !prevState.addCourseModal
        }));


        //    this.props.registerUser(newUserData);
        // axios.defaults.withCredentials = true;
        // axios.post('localhost:3001/createCourse', newCourseData)
        // .then(response => {
        //     console.log("Response status : ",response.status);
        //     console.log("Response Data : ",response.data);
        // });

        await this.props.addCoursemutation({
 
            variables: {
              coursename:this.state.coursename,
              courseid:this.state.courseid,
              coursedes:this.state.coursedes,
              coursedept:this.state.coursedept,
              courseterm:this.state.courseterm,
              coursecol:this.state.coursecol,
              coursecap:this.state.coursecap,
              coursewaitcap:this.state.coursewaitcap,
              courseroom:this.state.courseroom,
              facultyid:localStorage.getItem('loginid')
             
            }
        }).then(async(response)=>{
console.log("res",response)
        })
    }

    toggle(e) {
        this.setState(prevState => ({
            addCourseModal: !prevState.addCourseModal
        }));
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        // const rand = '#'+Math.floor(Math.random()*16777215).toString(16);

        const target = e.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]:value

        });
    }
  
    componentDidMount(){
        console.log(this.props.addCourseModal)
    }

  render() {
    return (
      <div>
          <Modal isOpen={this.state.addCourseModal}  toggle={this.toggle}>
                    <ModalHeader>Add a course</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Course Name</InputGroupAddon>
                                    <Input name="courseName" type="input" value={this.state.courseName} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Course ID</InputGroupAddon>
                                    <Input name="courseID" type="input" value={this.state.courseID} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Department</InputGroupAddon>
                                    <Input name="department" type="input" value={this.state.department} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Description</InputGroupAddon>
                                    <Input name="description" type="file" value={this.state.description} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Course Room</InputGroupAddon>
                                    <Input name="room" type="file" value={this.state.room} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Course Capacity</InputGroupAddon>
                                    <Input name="capacity" type="file" value={this.state.capacity} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Waitlist Capacity</InputGroupAddon>
                                    <Input name="waitlist" type="file" value={this.state.waitlist} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Course Term</InputGroupAddon>
                                    <Input name="term" type="file" value={this.state.term} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">Course Color</InputGroupAddon>
                                    <Input name="color" type="file" value={this.state.color} onChange={this.inputChangeHandler} placeholder="" />
                                </InputGroup>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.createCourse}>Add</Button>{' '}
                        <Button color="secondary" onClick={!this.props.modal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
        
      </div>
    )
  }
}
