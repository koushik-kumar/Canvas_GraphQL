import React, {
  Component
} from 'react'
import Submitassignment from './Submitassignment';


import {
  withRouter
} from 'react-router-dom';
export default class AssDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assDetails: [],
      files: [],
      asgnmntFiles: [],
      filename: "",
      dwnldfile: "",
      filevis: "",
      filesfacvis: "",
      fvis: "hidden",
      base64img: "",
      subvis: "hidden",
      altersub: "visible",
      studentLST: [],
      btxt: "Submit Assignment",
      clickid: localStorage.getItem('UserID')
    }
    if (localStorage.getItem('Role') == "student") {
      this.state.filevis = "visible",
        this.state.filesfacvis = "hidden"
    } else {
      this.state.filevis = "hidden",
        this.state.filesfacvis = "visible"

    }
  }
  popSbmt = (e) => {
    this.setState({
      subvis: "visible",
      altersub: "hidden"
    })
  }
  myCB = (e) => {
    this.setState({
      subvis: "hidden",
      altersub: "visible",
      btxt: "Resubmit Assignment"
    })

  }
  viewDW = (e) => {
    // alert("hi")
    axios.defaults.withCredentials = true;
    const FileDownload = require('js-file-download');
    axios.get('http://localhost:3001/downloadAssign', {
        params: {
          file: '/submissions/' + localStorage.get('CourseID') + '/' + localStorage.getItem('UserID') + '/' + localStorage.getItem('assID') + this.state.filename

        }

      })
      .then((response) => {
        if (response.status === 200) {
        }
      });
  }

  viewAssignment(value) {
    this.state.asgnmntFiles = []
    this.setState({
      clickid: value
    })
    axios.defaults.withCredentials = true;

    axios.get('http://localhost:3001/checkFiles', {
      params: {
        CourseID: localStorage.getItem('CourseID'),
        Role: "student",
        UserID: value,
        assID: localStorage.getItem('assID')
      }
    }, ).
    then(response => {
        console.log(response.data)
        this.setState({
          asgnmntFiles: this.state.asgnmntFiles.concat(response.data)
        })
      })
      .catch(err => {
        console.log(err.message)
      })

  }
  handleDownload(value) {
    this.state.base64img = ""
    this.state.filename = value.filename


    var url = 'http://localhost:3001/dwnload-File/' + value


    axios.post(url, {
        data: {
          CourseID: localStorage.getItem('CourseID'),
          UserID: this.state.clickid,
          assID: localStorage.getItem('assID')
        }
      }, {}).then(response => {
        this.state.fvis = "visible"
        this.setState({
          base64img: response.data
        })

      })
      .catch(response => console.log(response.data))
  }

  componentDidMount() {

    axios.defaults.withCredentials = true;
    const postD = {
      CourseID: localStorage.getItem('CourseID')
    }

    axios.post('http://localhost:3001/getpeople', postD)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            studentLST: response.data
          })
        }

      })


    axios.get('http://localhost:3001/checkFiles', {
      params: {
        CourseID: localStorage.getItem('CourseID'),
        Role: localStorage.getItem('Role'),
        UserID: localStorage.getItem('UserID'),
        assID: localStorage.getItem('assID')
      }
    }, ).
    then(response => {
      console.log(response.data)
      this.setState({
        files: this.state.files.concat(response.data)
      })
      console.log("After setting", this.state.files)
    })

    const dataq = {
      assID: localStorage.getItem('assID'),
      CourseID: localStorage.getItem('CourseID')
    }


    axios.post('http://localhost:3001/getassignmentdet', dataq)
      .then((response) => {
        if (response.status === 200) {
          console.log("successfull sub folder")
          this.setState({
            assDetails: response.data
          });

        }
      });
  }
  render() {
    let displayFiles = null;
    let studentLST = null;
    let disStdntFiles = null;
    if (this.state.studentLST.length > 0) {
      studentLST = this.state.studentLST.map((student, id) => {
        return ( <
          div >
          <
          a onClick = {
            this.viewAssignment.bind(this, student.UserID)
          } > {
            student.UserID
          } < /a> < /
          div >
        )
      })
    }
    if (this.state.files) {

      displayFiles = this.state.files.map((file, id) => {
        console.log("Filesimg" + this.state.base64img);
        return (

          <
          div >
          <
          td value = {
            file
          }
          onClick = {
            () => this.handleDownload(file)
          } > < a style = {
            {
              color: "blue"
            }
          } > {
            file
          } < /a></td > < br > < /br>

          <
          /div>
        )
      })
    }
    if (this.state.asgnmntFiles.length > 0) {

      disStdntFiles = this.state.asgnmntFiles.map((file, id) => {
        console.log("Filesimg" + this.state.base64img);

        return (

          <
          div >
          <
          td value = {
            file
          }
          onClick = {
            () => this.handleDownload(file)
          } > < a style = {
            {
              color: "blue"
            }
          } > {
            file
          } < /a></td > < br > < /br>

          <
          /div>
        )
      })
    }
    if (this.state.assDetails) {
      var assign_det = this.state.assDetails.map(assignment => {
          return (

              <
              div >
              <
              h3 > {
                assignment.name
              } <
              button onClick = {
                this.popSbmt
              }
              class = "btn btn-primary"
              style = {
                {
                  float: "right",
                  visibility: this.state.altersub
                }
              }
              type = "button" > {
                this.state.btxt
              } < /button> < /
              h3 >


              <
              hr > < /hr> <
              div >
              <
              div class = "col col-sm-1" > < span > < b > Date < /b></span > < /div> <
              div class = "col col-sm-2" > {
                assignment.due.substring(0, 10)
              } < /div> <
              div class = "col col-sm-1" > < span > < b > Points < /b></span > < /div> <
              div class = "col col-sm-2" > {
                assignment.marks
              } < /div> <
              div class = "col col-sm-3" > < span > < b > Submitting: < /b></span >
              <
              div class = "col col-sm-2" > < /div>File upload</div >
              <
              /div> <
              div class = "lessspace" > < /div> <
              div class = "col  col-sm-1" >
              <
              span > < b > Available: < /b></span >
              <
              /div> <
              div class = "col col-sm-3" >
              <
              span > {
                assignment.due.substring(0, 10)
              } < /span> < /
              div > <
              div class = "lessspace" > < /div> <
              hr > < /hr>

              <
              span > No Content < /span> <
              div style = {
                {
                  padding: "30px"
                }
              } >
              <
              tr style = {
                {
                  float: "right",
                  position: "relative"
                }
              } >
              <
              div style = {
                {
                  visibility: this.state.filesfacvis
                }
              } >
              Student List <
              br > < /br> {
              studentLST
            } {
              disStdntFiles
            } <
            /div> <
          div style = {
              {
                visibility: this.state.filevis
              }
            } >

            {
              displayFiles
            } <
            /div> < /
            tr > <
            a class = "btn btn-primary"
          style = {
            {
              position: "absolute"
            }
          }
          href = {
            "data:application/pdf;base64," + this.state.base64img
          }
          download = {
              this.state.filename
            } > Download < /a>

            <
            iframe style = {
              {
                visibility: this.state.fvis,
                marginTop: "40px"
              }
            }
          src = {
            "data:application/pdf;base64," + this.state.base64img
          }
          width = "80%"
          height = "600"
          frameBorder = "0"
          allowFullScreen > < /iframe> < /
            div > <
            /div>
        )
      })
  }

  return ( <
    div >
    <
    div class = "container border"
    style = {
      {
        width: "80%"
      }
    } >

    {
      assign_det
    } <
    div class = "border"
    style = {
      {
        visibility: this.state.subvis,
        marginTop: "10%"
      }
    } >
    <
    Submitassignment cbParnt = {
      this.myCB
    }
    /> < /
    div > <
    /div>

    <
    /div>
  )
}
}