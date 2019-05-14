import React, { Component } from 'react'
import { FormGroup, Input } from 'reactstrap';

export default class FilesMain extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state={
      fldrName:"",
      fileselctd: null,
      loaded: 0, 
      folders:[],
      files:[],
      folderview:"",
      btnvis:"hidden"
    }
    if(localStorage.getItem('Role')=="Professor"){
      this.state.btnvis="visible"
    }
   
}
  render() {
    return (
      <div>
        <div>
          <h2>Files</h2>
        </div>
        <div>
          <hr></hr>
          <FormGroup>
            <Input type="file" name="file" style={{
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block"
            }} id="Files" />
          </FormGroup>
        </div>
        <div><h3>Displays list of files and preview them in ths place</h3></div>
      </div>
    )
  }
}
