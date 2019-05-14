import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Home from '../Home/home';
import PNbr from '../PermissionNbr/PermissionNumberMain';
import AnnouncementsMain from '../announcements/announcementsMain';
import Assignments from './../Assignments/Assignments';
import AssignmentMain from './../Assignments/AssignmentMain';
import GradesMain from './../Grades/GradesMain';
import PeopleMain from './../Files/FilesMain';
import FilesMain from './../Files/Files';
import QuizzesMain from './../Quizzes/QuizzesMain';


export default class CoursesTray extends Component {

    constructor(props) {
        super(props);
    
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            courseIDno: this.props.match.params.course_id,

            //make changes if it coursecrds exists
            // courseName : (localStorage.getItem('CourseName')) ,
            courseName : '',
            courses : JSON.parse(localStorage.getItem('courseCards')),
            

            
          collapsed: false,
          colWidth:"col col-10",
          display:'',
          sideNavBar:<Home />
        };
    }

    // componentDidMount(){
        
    // }

    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed,
        });
        if(this.state.colWidth==="col col-10"){
            this.setState({
                colWidth:"col col-12"
            })
        } else {
            this.setState({
                colWidth:"col col-10"
            })
        }
      }

    displayHandler = (e) =>{
        // alert('handler');
            // e.preventDefault();
            this.setState({
                sideNavBar:e
            })
            console.log("HERE----------"+this.state.sideNavBar);
    }
    componentDidMount() {
        this.setState({
            courseName: (localStorage.getItem('CourseName'))
          })
    }

  render() {

    let  course =''
    let id = this.state.courseIDno
    console.log("HUHUHUHUH"+id)
    
    course = ((this.state.courses).filter(element =>  element.CourseID === id))


      localStorage.setItem("CourseID", (course[0]["CourseID"]));
      
      localStorage.setItem("CourseName", (course[0]["CourseName"]));
      localStorage.setItem("TeacherID", (course[0]["TeacherID"]));
    //   console.log("***********************"+typeof(this.state.courseName))
    //   console.log("***********************"+JSON.stringify((this.state.courseName).filter(element =>  element.CourseID === "190")))
      
    // let courseIDno = this.props.match.params.course_id
      
    return (
      <div style={{position:"relative"}}>
        <div className="col col-sm-9" style={{ marginLeft:"85px"}}>
            <div style={{ position: "relative"}}>
            <Navbar color="faded" light>
                <NavbarToggler href="#" onClick={this.toggleNavbar} className="mr-1" />
                <NavbarBrand href="#" style={{color:'black'}} className="mr-auto">{this.state.courseIDno} :  {this.state.courseName}</NavbarBrand>
            </Navbar>
            </div>
                <hr></hr>
            <div className="col col-2" style={{ position: "relative", float:"left"}}>
                <Navbar light >
                    <Collapse isOpen={!this.state.collapsed} style={{backgroundColor:"white", width:"90px", color:"black"}} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <Home />)}>Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <PNbr />)}>PermissionCodes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <AnnouncementsMain />)}>Announcements</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <Assignments />)}>Assignments</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <GradesMain />)}>Grades</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <PeopleMain />)}>People</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <FilesMain />)}>Files</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >Quizzes</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >Conferences</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >Colloborations</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >Chat</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >Criterion</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >Portfolium</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink onClick={this.displayHandler.bind(this, <QuizzesMain />)} >SOTE/SOLATE</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        
            <div className={this.state.colWidth} style={{position: "relative", float:"right"}}>
            {this.state.sideNavBar}
        </div>
        </div>
      </div>
    )
  }
}
