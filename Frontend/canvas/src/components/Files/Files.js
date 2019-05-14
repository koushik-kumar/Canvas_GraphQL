import React, { Component } from 'react'
import './Files.css';
import axios from 'axios';
export default class Files extends Component {
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
        if(localStorage.getItem('Role')=="faculty"){
          this.state.btnvis="visible"
        }
       
    }
    folderChangeHandler=(e)=>{
      if(e.target.name=="fldrName"){
        this.setState({
          fldrName:e.target.value
        })
        
      }
    }
    folderviewHandler=(e)=>{
this.setState({
  folderview:e.target.value
})
    }
    uploadFile=(e)=>{
      const data = new FormData()
        
        data.append('file', this.state.fileselctd)
        console.log(this.state.fileselctd);
        data.append('UserID',localStorage.getItem('UserID'))
       console.log(data)
       const data1 = {
         data:data,
         foldname:this.state.folderview
       }
       
       console.log("data1",data1)
       alert("data1")
        axios.post('http://localhost:3001/uploadfile',data,{
          params:{
            CourseID:localStorage.getItem('CourseID'),
            foldname:this.state.folderview
          }
        },
        {fileselctd: this.state.fileselctd,
        onUploadProgress: ProgressEvent => {
        this.setState({
        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),})},})
        .then(res => {
        console.log(res.statusText)
        if(res.status === 200){
           alert("hello")
        }
        }).catch(error => {
        console.log(error.message);
        })
    }
    handleselectedFile = event => {

      this.setState({
      fileselctd: event.target.files[0],
      loaded: 0,
      },()=>{
      // console.log(this.state.fileselctd);
      })
      
      }
      foldviewfiles=(e)=>{
        this.state.files=[]
        console.log(e.target.name)
        localStorage.setItem('foldid','\\'+e.target.name)
        axios.defaults.withCredentials = true;
      axios.get('http://localhost:3001/seeFoldFiles',{
        params:{
          path:e.target.name
        }
      }).
      then(response => {
              console.log("in then")
              console.log(response.data)
              this.setState({files : this.state.files.concat(response.data)})
              console.log(this.state.files[0]);
              console.log("After setting",this.state.files)
      })
  
      }
      handleDownload=(e)=> {
        const val2={
          pathfile:localStorage.getItem('foldid')
        }
        //console.log(value);
        console.log(e.target.name)
        
        var url  = 'http://localhost:3001/dwnldfile-file/'+e.target.name
        
        axios.post(url,val2,{
        }).then(response=>{
          this.state.fvis="visible"
            // console.log("Downloaded");
            alert("hello")
            this.setState({
                base64img : response.data
            })
            
         })
         .catch(response=>console.log(response.data))
    }
      componentDidMount(){
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/seeFolders',{params:{courseCourseIDid:localStorage.getItem('CourseID')}}).
        then(response => {
              this.setState({
                folders:response.data
              })
              console.log(this.state.folders)
        })
      }
    createfolder=(e)=>{
      
      var data1={
        foldname:"./files/"+localStorage.getItem('CourseID')
      }
   axios.post('http://localhost:3001/createfolder',data1)
      .then((response) => {
        if(response.status === 200){  
          console.log("success childddd")
      //update the state with the response data
      this.setState({
          assDetails:response.data
      });
      
     
    }
  });
    
  var data1={
    foldname:"./files/"+localStorage.getItem('CourseID')+'/'+this.state.fldrName
  }
      axios.post('http://localhost:3001/createfolder',data1)
      .then((response) => {
        if(response.status === 200){  
          console.log("success childddd")
      //update the state with the response data
      this.setState({
          assDetails:response.data
      });
      
     
    }
  });
    }
    
  render() {
    var foldlist = null;
    if(this.state.folders){
      foldlist = this.state.folders.map((direct,idx)=>{
        return(
        <div>
        {console.log(direct.substring(6))}
       
          <a href="#" name={direct} onClick={this.foldviewfiles} style={{color:"blue"}}>{direct.substring(10)}</a>
          
          </div>
        )
      })
    }
    var foldfiles=null;
    if(this.state.files){
      foldfiles = this.state.files.map((file,idx)=>{
        return(
        <div>
          <a name = {file} href = {"data:application/pdf;base64,"+this.state.base64img} download={file} onClick={this.handleDownload}>{file}</a>
        </div>
        )
      })
    }
    return (
      <div>
       
        <div style={{height:"100px"}}>
        <h2>Files</h2>
        <div>
            <input type="search"></input>
        </div>
        </div>
      
        <form > 
        <div class="row form-group" style={{height:"60px ",visibility:this.state.btnvis}}>
        <div class="col col-sm-2">
        <input type="text" onChange={this.folderChangeHandler} name="fldrName" class="form-control" placeholder="Folder Name"></input>
        </div>
        <div class="col col-sm-3">
        <button  onClick={this.createfolder} class="btn btn-primary">Create Folder</button>
        
        </div></div>
        

        <div class="row form-group" style={{height:"60px",visibility:this.state.btnvis}} >
        <div class="col col-sm-2">
        <input type="text"  onChange={this.folderviewHandler}class="form-control" placeholder="Folder Name"></input>
        <input type="file" name="file_name" id="file_id" onChange={this.handleselectedFile} />
        </div>
        <div class="col col-sm-3">
        <button onClick={this.uploadFile} class="btn btn-primary">Upload File</button>
        </div>
       
        </div>
      
        <div class="col col-sm-4">
        {foldlist}
        </div>
        
        <div style={{borderLeft: "2px solid black",height:"200px"}} class="col col-sm-3">
       {foldfiles}
       
       </div>
</form>
      
       
       {/* <a class="btn btn-primary" style={{position:"absolute"}} href = {"data:application/pdf;base64,"+this.state.base64img} download="200-HW4_013707187.pdf">Download</a> */}
      
       </div>

    )
  }
}
