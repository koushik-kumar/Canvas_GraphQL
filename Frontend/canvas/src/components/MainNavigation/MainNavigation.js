import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import setAuthToken from './../../setAuthToken';
import { logoutUser } from './../../actions/index';
import { connect } from "react-redux";





import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { Button } from "reactstrap";

class MainNavigation extends Component {
  constructor() {
    super();

    this.state = {
      trayAccount: false,
      trayCourses: false,
      trayGroup: false,
      trayHelp: false,
      userCourses: [],
      modal: false
      // coursehref:[]
    };

    this.trayAccount = this.trayAccount.bind(this);
    this.trayCourses = this.trayCourses.bind(this);
    this.profileEditHandler = this.profileEditHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  // coursePageHandler = id => e => {
  //   e.preventDefault();
  //   axios.defaults.withCredentials = true;
  //   console.log("On clicking course of ID:"+id);
  //   const data = {
  //     courseID : id
  //   }
  //   axios.post('http://localhost:3001/courses/', data)
  //           .then((response) => {
  //               if(response.status === 200){
  //                   console.log(response.data);
  //               }
  //           });
  // }
  componentDidMount() {
    this.setState({
      userCourses: JSON.parse(localStorage.getItem("courseCards"))
    });
  }

  logoutHandler(e){
    e.preventDefault();
    console.log("Inside Logout Handler")
    this.props.logoutUser(this.props.history)
    // localStorage.remove('jwtToken');
    // setAuthToken(false)
    // // dispatchEvent()
    // // cookie.remove('UserID');
    // // cookie.remove('connect.sid');
    // // localStorage.clear();
    // // sessionStorage.clear();
    // window.location.reload(); 
    
    // console.log("data cleared")
  }

  toggle(e) {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  trayAccount(event) {
    event.preventDefault();
    if (
      this.state.trayAccount ||
      this.state.trayCourses ||
      this.state.trayGroup ||
      this.state.trayHelp
    ) {
      console.log(this.state.trayAccount+" "+this.state.trayCourses+" "+this.state.trayGroup+" "+this.state.trayHelp);
      this.setState({
        trayAccount: false,
        trayCourses: false,
        trayGroup: false,
        trayHelp: false
      });
    } else {
      this.setState(previousState => ({
        trayAccount: !previousState.trayAccount
      }));
    }
  }

  checkIfTrayOpen(event) {
    if (
      this.state.trayAccount ||
      this.state.trayCourses ||
      this.state.trayGroup ||
      this.state.trayHelp
    ) {
      // console.log(this.state.trayAccount+" "+this.state.trayCourses+" "+this.state.trayGroup+" "+this.state.trayHelp);
      this.setState({
        trayAccount: false,
        trayCourses: false,
        trayGroup: false,
        trayHelp: false
      });
    }
  }

  trayCourses(event) {
    // console.log(this.state.userCourses);
    event.preventDefault();
    if (
      this.state.trayAccount ||
      this.state.trayCourses ||
      this.state.trayGroup ||
      this.state.trayHelp
    ) {
      console.log(
        this.state.trayAccount +
          " " +
          this.state.trayCourses +
          " " +
          this.state.trayGroup +
          " " +
          this.state.trayHelp
      );
      this.setState({
        trayAccount: false,
        trayCourses: false,
        trayGroup: false,
        trayHelp: false
      });
    } else {
      this.setState(previousState => ({
        trayCourses: !previousState.trayCourses
      }));
    }
  }

  profileEditHandler = e => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:3001/editProfile").then(response => {
      console.log("Status Code : ", response.status);
      if (response.status === 200) {
        console.log("Response : " + response.body);
      }
    });
  };

  render() {
    let details = "";

    if (this.state.userCourses) {
      details = this.state.userCourses.map(course => {
        return (
          <li key={course.CourseID}>
            <a
              href={"/courses/" + course.CourseID}
              CourseID={course.CourseID}
              style={{ textDecoration: "underline", fontSize: "17px" }}
            >
              <span>
                {course.CourseTerm}19:&nbsp;{course.CourseID}&nbsp;
                {course.CourseName}
              </span>
            </a>
          </li>
        );
      });
    }

    let redirectVar = null;
    // if (!cookie.load("UserID")) {
    if (!localStorage.getItem('UserID')) {
      redirectVar = <Redirect to="/login" />;
    }

    let renderSidebar = false;
    // if (cookie.load("UserID")) {
    if (localStorage.getItem('UserID')) {
      renderSidebar = true;
    }

    return (
      <div>
        {redirectVar}
        <div>
          {renderSidebar ? (
            <div className="" style={{ position: "absolute" }}>
              <div
                className="sidebar"
                style={{ position: "absolute", zIndex: "3" }}
              >
                <div className="Navigation" elements>
                  <div className="logomark_container">
                    <a href="/dashboard">
                      <img
                        alt="LOGO HERE"
                        className="Logo"
                        src={require("../../images/SJSU University monogram_Web_Gold.png")}
                      />
                    </a>
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item">
                      <a href="#" onClick={this.trayAccount}>
                        <div>
                          <img
                            alt="profilePic"
                            className="profilePic"
                            src={require("../../images/profilePic.jpg")}
                          />
                        </div>
                        <div className="label">Account</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="/dashboard">
                        <div>
                          <i className="fas fa-tachometer-alt fa-2x" />
                        </div>
                        <div className="label">Dashboard</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#" onClick={this.trayCourses}>
                        <div>
                          <i className="fas fa-book fa-2x" />
                        </div>
                        <div className="label">Courses</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <div>
                          <i className="fas fa-user-friends" />
                        </div>
                        <div className="label">Groups</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <div>
                          <i className="far fa-calendar-alt  fa-2x" />
                        </div>
                        <div className="label">Calendar</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <div>
                          <i className="fas fa-inbox  fa-2x" />
                        </div>
                        <div className="label">Inbox</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <div>
                          <i className="far fa-question-circle  fa-2x" />
                        </div>
                        <div className="label">Help</div>
                      </a>
                    </li>
                    <li className="list-group-item">
                      <a href="#">
                        <div>
                          <i className="fas fa-book-reader  fa-2x" />
                        </div>
                        <div className="label">Library</div>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="SecondNavigation">
                  {/* <button className="toggle-btn"> */}
                  <i className="fas fa-arrow-left fa-lg" />
                  {/* </button> */}
                </div>
              </div>
              {this.state.trayAccount ? (
                <div
                  className="trayAccount bord"
                  style={{
                    position: "absolute",
                    zIndex: "2",
                    marginLeft: "85px",
                    backgroundColor: "white",
                    width: "364px",
                    height: "100vh"
                  }}
                >
                  <div>
                    <a href="#" className="closeButton">
                      <i
                        className="fas fa-times fa-lg"
                        style={{
                          color: "black",
                          float: "right",
                          padding: "15px"
                        }}
                      />
                    </a>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div
                      className="profilePicinTray-div"
                      style={{ paddingTop: "10px", paddingLeft: "55px" }}
                    >
                      <img
                        className="profilePicinTray"
                        src={require("../../images/profilePic.jpg")}
                      />
                    </div>
                    <div className="profileName">Koushik Kumar Kamala</div>
                  </div>
                  <div className="logout-div">
                    <button className="logout-btn" onClick={this.logoutHandler}>Logout</button>
                  </div>
                  <hr style={{ paddingLeft: ".25em", paddingRight: ".25em" }} />
                  <ul className="TrayList">
                    <li>
                      <a href="/profile">
                        <span>Profile</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Settings</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Notifications</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>Files</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span>ePortFolios</span>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}

              {this.state.trayCourses ? (
                <div
                  className="trayCourses bord"
                  style={{
                    position: "absolute",
                    zIndex: "2",
                    marginLeft: "85px",
                    backgroundColor: "white",
                    width: "364px",
                    height: "100vh"
                  }}
                >
                  <div>
                    <a href="#" className="closeButton">
                      <i
                        className="fas fa-times fa-lg"
                        style={{
                          color: "black",
                          float: "right",
                          padding: "15px"
                        }}
                      />
                    </a>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div className="Courses">Courses</div>
                  </div>
                  <hr style={{ paddingLeft: ".25em", paddingRight: ".25em" }} />
                  <ul className="TrayList">{details}</ul>
                  <hr />
                  <div
                    style={{
                      width: "90%",
                      paddingLeft: "25px",
                      fontSize: "0.9em",
                      lineHeight: "1.7"
                    }}
                  >
                    Welcome to your courses! To customize the list of courses,
                    click on the "All Courses" link and star the courses to
                    display.
                  </div>
                  

                </div>
              ) : null}

              
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated : state.login.message
})



export default connect(mapStateToProps, { logoutUser})(MainNavigation);
