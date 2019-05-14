import React, {
  Component
} from 'react'

import axios, {
  post
} from 'axios';


export default class Submitassignment extends Component {
  state = {
    fileselctd: null,
    loaded: 0,
    fldrName: ""
  }

  handleselectedFile = event => {

    this.setState({
      fileselctd: event.target.files[0],
      loaded: 0,
    }, () => {})

  }
  cncloption = (e) => {
    this.props.cbParnt()
  }
  handleUpload = async () => {


    var post_Data = {
      foldname: "./submissions/" + localStorage.getItem('CourseID')
    }
    await axios.post('http://localhost:3001/createFolder', post_Data)
      .then((response) => {
        if (response.status === 200) {

          var post_Data = {
            foldname: "./submissions/" + localStorage.getItem('CourseID') + '/' + localStorage.getItem('UserID')
          }
          axios.post('http://localhost:3001/createFolder', post_Data)
            .then((response) => {
              console.log("folder  succesfullly created")
              if (response.status === 200) {
                var post_Data = {
                  foldname: "./submissions/" + localStorage.getItem('CourseID') + '/' + localStorage.getItem('UserID') + '/' + localStorage.getItem('assID')
                }

                axios.post('http://localhost:3001/createfolder', post_Data)
                  .then((response) => {
                    if (response.status === 200) {
                      const respData = new FormData()

                      respData.append('file', this.state.fileselctd)
                      console.log(this.state.fileselctd);
                      console.log(respData)

                      alert("hello")
                      axios.post('http://localhost:3001/upload', respData, {
                          params: {
                            CourseID: localStorage.getItem('CourseID'),
                            UserID: localStorage.getItem('UserID'),
                            assID: localStorage.getItem('assID')
                          }
                        }, {
                          fileselctd: this.state.fileselctd,
                          onUploadProgress: ProgressEvent => {
                            this.setState({
                              loaded: (ProgressEvent.loaded / ProgressEvent.total * 100),
                            })
                          },
                        })
                        .then(res => {
                          console.log(res.statusText)
                          if (res.status === 200) {
                            this.props.cbParnt();
                          }
                        }).catch(error => {
                          console.log(error.message);
                        })
                    }
                  });
              }
            });
        }
      });
  }

  render() {
    return ( <
      div >
      <
      div class = "border"
      style = {
        {
          width: "60%"
        }
      } >
      <
      h4 > File Upload < /h4>  <
      input type = "file"
      name = "file_name"
      id = "file_id"
      onChange = {
        this.handleselectedFile
      }
      /> <
      div > < /div> <
      div >
      <
      button onClick = {
        this.cncloption
      }
      class = "btn btn-light col-sm-4" > Cancel < /button> <
      div class = "col-sm-1" >
      <
      /div> <button onClick={this.handleUpload} type="submit" class="btn col-sm-5-offset-1"> Submit Assignment </button >
      <
      div > {
        Math.round(this.state.loaded, 2)
      } % < /div> < /
      div > <
      /div> < /
      div >
    )
  }
}