import React, {
  Component
} from 'react'
import axios from 'axios';
import './AssignmentsStyle.css'

export default class AssignmentsMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assgnmnts: "",
      addvis: "",
      asngmntName: "",
      asngmntDue: "",
      asngmntMarks: "",
      asngmntUpt: "initial"
    }
    if (localStorage.getItem('Role') == "student") {
      this.state.addvis = "hidden"
    }
  }
  asgNameChangeHandler = (e) => {
    this.setState({
      asngmntName: e.target.value
    })
  }
  asgDueChangeHandler = (e) => {
    this.setState({
      asngmntDue: e.target.value
    })
  }
  asgMarksChangeHandler = (e) => {
    this.setState({
      asngmntMarks: e.target.value
    })
  }
  componentDidMount() {
    const postData = {
      CourseID: localStorage.getItem('CourseID')
    }
    axios.defaults.withCredentials = true;

    axios.post('http://localhost:3001/getAssignment', postData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)

          this.setState({
            assgnmnts: response.data
          });
        }
      });

  }
  change = (var) => (e) => {

    localStorage.setItem('assID',
      var.assID)

    this.props.cbParnt();
  }
  asgnmntupdate = (e) => {
    const postData = {
      CourseID: localStorage.getItem('CourseID'),
      asngmntName: this.state.asngmntName,
      asngmntDue: this.state.asngmntDue,
      asngmntMarks: this.state.asngmntMarks
    }
    axios.defaults.withCredentials = true;
    axios.post('http://localhost:3001/createAssignment', postData)
      .then((response) => {
        if (response.status === 200) {
          console.log(this.state.asngmntUpt)
          this.setState({
            asngmntUpt: " Assignment updated"
          })
        }
      });
  }

  render() {


    if (this.state.assgnmnts) {
      var assignmentsLst = this.state.assgnmnts.map(assignment => {
        return (

          <
          li class = "border fntsty" >

          <
          div class = "minHeight row" >
          <
          i class = "fal fa-edit padng" > < /i> <
          a onClick = {
            this.change(assignment)
          } > {
            assignment.name
          } < /a> <
          br > < /br> <
          span class = "fntst padng"
          style = {
            {
              marginLeft: "2.5%"
            }
          } > Due {
            assignment.due
          } < /span>

          <
          /div> <
          /li>


        )
      })
    }
    return ( <
      div >
      <
      div >
      <
      button type = "button"
      class = "btn mr-auto"
      data - toggle = "modal"
      data - target = "#asgnModal"
      onClick = {
        this.createassignment
      }
      style = {
        {
          backgroundColor: "#0055a2",
          color: "white",
          visibility: this.state.addvis,
          float: "right",
          marginLeft: "200px"
        }
      } > < i class = "fas fa-plus fa-sm" > < /i>Assignments</button >
      <
      /div> <
      div class = "modal fade"
      id = "asgnModal"
      tabindex = "-1"
      role = "dialog"
      aria - labelledby = "exampleModalLabel"
      aria - hidden = "true" >
      <
      div class = "modal-dialog"
      style = {
        {
          width: "30%"
        }
      } >


      <
      div class = "modal-content" >
      <
      div class = "modal-header" >
      <
      button type = "button"
      class = "close"
      data - dismiss = "modal" > & times; < /button> <
      center > < h4 class = "modal-title" > Create Assignment < /h4></center >
      <
      div class = "lessspace" > < /div> <
      /div> <
      div class = "modal-body" >
      <
      center >
      <
      form style = {
        {
          width: "1-0%"
        }
      } >
      <
      div class = "row" >
      <
      div class = " form-group col col-sm-5" >
      Assignment Name <
      /div> <
      div class = "col col-sm-7" >
      <
      input onChange = {
        this.asgNameChangeHandler
      }
      type = "text"
      name = "asgmntname"
      class = "form-control"
      placeholder = "Assignment Name" > < /input> <
      /div> <
      /div> <
      div class = "lessspace" > < /div> <
      div class = "row" >
      <
      div class = " form-group col col-sm-5" >
      Assignment Due <
      /div> <
      div class = "col col-sm-7" >
      <
      input onChange = {
        this.asgDueChangeHandler
      }
      type = "date"
      name = "asgmntdue"
      class = "form-control"
      placeholder = "Assignment DUe" > < /input> <
      /div> <
      /div> <
      div class = "lessspace" > < /div> <
      div >
      <
      div class = " form-group col col-sm-5" >
      Assignment Marks <
      /div> <
      div class = "col col-sm-7" >
      <
      input onChange = {
        this.asgMarksChangeHandler
      }
      type = "number"
      name = "asgmntmarks"
      class = "form-control" > < /input> <
      /div> <
      /div> <
      div class = "space" > < /div>

      <
      div class = "form-group"
      style = {
        {
          width: "40%"
        }
      } >
      <
      button onClick = {
        this.asgnmntupdate
      }
      type = "submit"
      class = "btn btn-primary btn-block" > Update < /button> <
      /div>         <
      /form> <
      /center> <
      /div> <
      div class = "modal-footer" >
      <
      button type = "button"
      class = "btn btn-default"
      data - dismiss = "modal" > Close < /button> <
      /div> <
      /div>

      <
      /div> <
      /div> <
      div class = "container border divsty" >


      <
      span class = "fontbold" > Assignments < /span> <
      div class = "lessspace" > < /div>

      <
      ul style = {
        {
          listStyle: "none"
        }
      } > {
        assignmentsLst
      } <
      /ul>


      <
      /div> <
      /div>
    )
  }
}