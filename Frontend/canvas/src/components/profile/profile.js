import React, { Component } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { InputGroup, InputGroupAddon, Form, InputGroupText, Input, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import { connect } from "react-redux";
import { profileInfo} from './../../actions/index';


export class profile extends Component {

    constructor(props) {
      super(props);

      this.toggleNavbar = this.toggleNavbar.bind(this);
      this.state = {
        modal: false,
        collapsed: false,
        colWidth:"col col-9",
        display:'',
        username:'',
        contact:'',
        biography:'',
        links:''
      };
    }

    toggleNavbar() {
      this.setState({
        collapsed: !this.state.collapsed,
      });
      if(this.state.colWidth==="col col-9"){
          this.setState({
              colWidth:"col col-11"
          })
      } else {
          this.setState({
              colWidth:"col col-9"
          })
      }
    }

    toggle=(e)=> {
      this.setState({
          modal: !this.state.modal
      });
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        // const rand = '#'+Math.floor(Math.random()*16777215).toString(16);
        
        const target = e.target;
        const name = target.name;
        const value = target.value;
        console.log("target: "+target)
        console.log("name: "+name)
        console.log("value: "+value)
        this.setState({
            [name]:value
        });
        
    }

    updateHandler = (e) => {
        e.preventDefault();
        const data = {
            UserID: localStorage.getItem('UserID'),
            contact:this.state.contact,
            biography: this.state.biography,
            links: this.state.links
        }
        console.log("Update Handler:"+JSON.stringify(data));
        // axios.default.withCredentials = true;
        // axios.post('http://localhost:3001/updateProfile', data)
        // .then(response =>{
        //     console.log("In Response from the frontend: "+JSON.stringify(response.data))
        // })
        this.props.profileInfo(data);
        console.log("Response Status: "+this.props.respStatus);
        console.log(this.props.message);

        this.toggle()

    }

//   displayHandler = (e) =>{
//       // alert('handler');
//           // e.preventDefault();
//           this.setState({
//               value:e
//           })
//           console.log("HERE----------"+this.state.value);
//   }

componentDidMount() {
    const data = {
        UserID: localStorage.getItem('UserID')
    }
    console.log("RENDUUuuuuuuuuu:"+data);
    axios.default.withCredentials = true;
    
    await this.props.client.query({
        query : getProfile,
        variables: {
            loginid : localStorage.getItem('loginid'),
            stufac:    localStorage.getItem('stufac')
        }
    })
    .then(async (response)=>{
console.log("res",response)
if(response.data.getProfile){

        
          this.setState({
                            username : (response.data.getProfile.result.FirstName+" "+response.data.getProfile.result.LastName).toUpperCase(),
                            contact: response.data.getProfile.result.PhoneNo,
                            biography: response.data.getProfile.result.AboutMe,
                            links: response.data.getProfile.result.Links
                        })
      
    }
    })
    // axios.post('http://localhost:3001/getProfileData', data)
    //     .then(response =>{
    //         console.log("Status Code : ",response.status);
    //         console.log("HERE after response:"+(JSON.stringify(response.data.FirstName)));
    //         // console.log("HERE after response:"+(JSON.stringify(response.data[0].FirstName)));
    //         if(response.status === 200){
    //             this.setState({
    //                 username : (response.data.FirstName+" "+response.data.LastName).toUpperCase(),
    //                 contact: response.data.PhoneNo,
    //                 biography: response.data.AboutMe,
    //                 links: response.data.Links
    //             })
    //         }
    //     })

}

  render() {
    console.log(this.state.colWidth);
    return (
      
      
      <div style={{position:"relative"}}>
        <div className="col col-sm-9" style={{ marginLeft:"85px"}}>
            <div style={{ position: "relative"}}>
            <Navbar color="faded" light>
                <NavbarToggler href="#" onClick={this.toggleNavbar} className="mr-1" />
                <NavbarBrand href="#" style={{color:'black'}} className="mr-auto">{this.state.username}'s Profile</NavbarBrand>
            </Navbar>
            </div>
                <hr></hr>
            <div className="col col-2" style={{position: "relative", float:"left"}}>
                <Navbar light >
                    <Collapse isOpen={!this.state.collapsed} style={{backgroundColor:"white", width:"90px", color:"black"}} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink  href="#" >Notifications</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#">Profile</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#" >Files</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink  href="#" >Settings</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        
        </div>

        <div className={this.state.colWidth} style={{position: "relative", float:"right"}}>
        
          <div className="col col-2" style={{float:"left"}} >
            <img style={{width:"150px", borderRadius:"50%"}}
                alt="LOGO HERE"
                className="Logo"
                src={require("../../images/profilePic.jpg")}
              />
          </div>
         
          <div className="col col-8" style={{paddingLeft:"50px", float:"left"}} >
            <div style={{color:"black"}}><h1>{this.state.username}</h1></div>
            <div><br></br></div>
            <div><br></br></div>
            <div><h1 style={{color:"black"}}>Contact</h1><h4>{this.state.contact}</h4></div>
            <div><br></br></div>
            <div><h1 style={{color:"black"}}>Biography</h1><h4>{this.state.biography}</h4></div>
            <div><br></br></div>
            <div><h1 style={{color:"black"}}>Links</h1><h4>{this.state.links}</h4></div>
          </div>
          <div className="col col-1" style={{float:"right"}} >
            <button onClick={this.toggle} type="button">Edit Profile</button>
          </div>
        </div>
        
        <Modal isOpen={this.state.modal}>
        <ModalHeader ><h1>{this.state.username}</h1></ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
                <InputGroup>
                    <InputGroupAddon  addonType="prepend">Contact</InputGroupAddon>
                    <Input name="contact"  type="input" placeholder={this.state.contact} onChange={this.inputChangeHandler} />
                    {/* <Input name="contact"  type="input" placeholder={this.state.contact} onChange={this.inputChangeHandler} /> */}
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroupAddon  addonType="prepend">Biography</InputGroupAddon>
                    <Input name="biography"  type="input" placeholder={this.state.biography} onChange={this.inputChangeHandler} />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroupAddon  addonType="prepend">Links</InputGroupAddon>
                    <Input name="links"  type="input" placeholder={this.state.links} onChange={this.inputChangeHandler} />
                </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.updateHandler}>Update</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
        </Modal>

      </div>

    

    )
  }
}


const mapStateToProps = (state) => ({
    authFlag: state.login.authFlag,
    message : state.login.message,
    respStatus : state.login.respStatus
})

export default connect(mapStateToProps, { profileInfo })(profile);