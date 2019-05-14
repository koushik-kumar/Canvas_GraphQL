import React, { Component } from 'react';
// import MainNavigation from '../MainNavigation/MainNavigation'
// import { SketchPicker } from 'react-color';
import CourseCard from './courseCard'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import cookie from 'react-cookies';
import axios from "axios"
import {Redirect} from 'react-router';


import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    InputGroup,
    InputGroupAddon,
    Form,
    FormGroup,
    Input,
    Button
    } from "reactstrap";

class Dashboard extends Component {

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
// var randomColor = require('randomcolor');
// var x = Math.floor(Math.random() * 256);
//     var y = Math.floor(Math.random() * 256);
//     var z = Math.floor(Math.random() * 256);
//     console.log("1: ------------------------------------------------"+x+" 2: "+y+" 3: "+z)
//     var bgColor = "rgb(" + x + "," + y + "," + z + ")";
//     console.log(bgColor)

        this.state = {
            UserID : '',
            // courses:'',
            courses:JSON.parse(localStorage.getItem('courseCards')),
            color:'#' + (Math.random().toString(16) + "000000").substring(2,8),
            courseNumber : '',
            courseTerm:'',
            shortercoursename:'',
            addCourseModal: false,
            courseName:'',
            CourseID:'',
            department:'',
            description:'',
            room:'',
            capacity:'',
            waitlist:'',
            term:'',
            visibleFlag1:'',
            visibleFlag2:'',
            userRole:'',
            CUID:Math.floor(Math.random()*100)
        }
        this.toggle = this.toggle.bind(this); 
        this.createCourse = this.createCourse.bind(this);
    }

    createCourse= (e) => {

        // console.log("User ID:"+cookie.load('UserID'))
        console.log("User ID:"+localStorage.getItem('UserID'))
        console.log("CUID"+this.state.CUID)
        console.log("courseName:"+this.state.courseName)
        console.log("courseID:"+this.state.courseID)
        console.log("department:"+this.state.department)
        console.log("description:"+this.state.description)
        console.log("room:"+this.state.room)
        console.log("capacity:"+this.state.capacity)
        console.log("waitlist:"+this.state.waitlist)
        console.log("term:"+this.state.term)
        console.log("color:"+this.state.color)

        const newCourseData = {
            CUID:this.state.CUID,
            CourseName:this.state.courseName,
            CourseID:this.state.courseID,
            department:this.state.department,
            description:this.state.description,
            room:this.state.room,
            capacity:this.state.capacity,
            waitlist:this.state.waitlist,
            term:this.state.term,
            color:this.state.color,
            // UserID:cookie.load('UserID')
            UserID:localStorage.getItem('UserID')
        }

        this.setState(prevState => ({
            addCourseModal: !prevState.addCourseModal
        }));

        const data = {
            UserID : this.state.UserID
        }

        //    this.props.registerUser(newUserData);
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/createCourse', newCourseData)
        .then(response => {
            window.location.reload()
            // this.props.logoutUser(this.props.history)
            // this.props.loginValidation(data);

            console.log("Response status : ",response.status);
            console.log("Response Data : ",response.data);
        });
        

    }

    // componentWillMount() {
    //     this.setState({
    //         courses:JSON.parse(sessionStorage.getItem('courseCards'))
    
    //         })
    // }

    componentDidMount(){

        // console.log("HURRRAAAAA"+(localStorage.getItem('UserID')!=null))
        if (localStorage.getItem('UserID')!=null) {
            // courses:JSON.parse(localStorage.getItem('courseCards'))
            this.state.userRole = localStorage.getItem('Role')

            if((this.state.userRole).toUpperCase() == 'PROFESSOR') {
                this.setState({
                    visibleFlag1 : "visible",
                    visibleFlag2 : "hidden"
                })
                // console.log(this.state.visibleFlag1)
                // console.log("hahahah"+this.state.visibleFlag1+"TTTTTTT"+this.state.visibleFlag2)
            } else{
                this.setState({
                    visibleFlag1 : "hidden",
                    visibleFlag2 : "visible"
                })
            }
        }
  }

    toggle=(e)=> {
        this.setState({
            addCourseModal: !this.state.addCourseModal
        });
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
        let details=''

        let redirectVar = null;
        if (!localStorage.getItem('UserID')) {
            redirectVar = <Redirect to="/login" />
        }
        if (localStorage.getItem('UserID')){
            if ((this.state.courses).length>0) {
                console.log("Rendering the course card details")
                details = this.state.courses.map(course => {
                        this.state.color = course.cardColor;
                        this.state.courseNumber = course.CourseID;
                        this.state.courseTerm = (course.CourseTerm).toUpperCase().substr(0,1);
                        this.state.shortercoursename = (course.CourseName).substr(0,18);
                    return (
                        <CourseCard course_Name={course.CourseName} course_id={course.CourseID} course_term={(course.CourseTerm).toUpperCase().substr(0,1)} course_number={course.CourseID} shortercoursename={(course.CourseName).substr(0,18)} color={course.cardColor} />
                    );
                })
            } else{
                details = <div className='col-md-9 offset-3 pt-5'> <h1 className=' pt-5'>No courses registered yet.</h1></div>
            }
        }

        console.log(this.state.addCourseModal);
        
        return (

            <div>
            {redirectVar}
            <div className="col col-sm-10" style={{position:"relative"}}>
                <div className="kkk col-md-10 offset-md-1" style={{position:"absolute", paddingLeft:"5px"}} >
                    <div className="col-md-12" style={{paddingTop:"10px"}} >
                        <span style={{fontSize:"1.8em"}} >Dashboard</span>
                        <i className="fas fa-ellipsis-v col-xs-1 Dashboard-Options" style ={{float:"right", fontSize:"38x", paddingTop:"15px"}} onClick={this.showOptions}></i> 
                    </div>
                        <hr width="97%"></hr>

                    <div  className="col-md-12">
                        {/* <div className="col-md-2" style={{ float:"left"}}>
                            <Button style={{background:"#0055a2", border:"#0055a2"}}>Register Courses</Button>{" "}
                        </div> */}
                        <div className="col-md-2" style={{ float:"left", visibility: this.state.visibleFlag2}}>
                            <a href="/search" ><Button style={{background:"#0055a2", border:"#0055a2" }}>Search Courses</Button></a>
                        </div>
                        <div className="col-md-2" style={{ float:"left", visibility: this.state.visibleFlag1}}>
                        <Button style={{background:"#0055a2", border:"#0055a2" }} onClick={this.toggle}>Add a course</Button>
                        </div>
                    </div>
                    <br></br>

                    <div className='col-md-12' style={{paddingTop:"25px"}} >
                        {details}
                    </div>
                </div>
                {this.state.addCourseModal}?(
                <div>
                    <Modal isOpen={this.state.addCourseModal} >
                        <ModalHeader>Add a course</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Course Name</InputGroupAddon>
                                        <Input name="courseName" type="text" value={this.state.courseName} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Course ID</InputGroupAddon>
                                        <Input name="courseID" type="text" value={this.state.courseID} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Department</InputGroupAddon>
                                        <Input name="department" type="text" value={this.state.department} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Description</InputGroupAddon>
                                        <Input name="description" type="text" value={this.state.description} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Course Room</InputGroupAddon>
                                        <Input name="room" type="text" value={this.state.room} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Course Capacity</InputGroupAddon>
                                        <Input name="capacity" type="number" value={this.state.capacity} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Waitlist Capacity</InputGroupAddon>
                                        <Input name="waitlist" type="number" value={this.state.waitlist} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroupAddon addonType="prepend">Course Term</InputGroupAddon>
                                        <Input name="term" type="text" value={this.state.term} onChange={this.inputChangeHandler} placeholder="" />
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.createCourse}>Add</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
                ):(<div></div>)
                
            </div>
            </div>
        )
    }
}

export default Dashboard;