import React, { Component } from 'react'
// import announcement from './announcement';
import DateAndTime from './dateandtime';
// import header from './header';
import Announcement from './announcement';
import Heading from "./heading";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap';



class AnnouncementsMain extends Component {

  constructor() {
    super();

    this.state = {
      time:'29th Oct, 2018',
      heading:'Announcement',
      announcement:"Hi everyone, this homework consists of basic coding snippets on javascript.",
      announcementModal : false,
      title:'',
      announcementContent:''

      
    };

    this.toggle = this.toggle.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
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
    return (
      <div >

        <div style={{paddingBottom:"50px", paddingTop:"10px"}}>
          <div className="col-md-9" style={{float:"left", height:"60px"}}><h1 >Announcements</h1></div>
          <div className="col-md-3" style={{color:"blue", float:"right", height:"60px",display:"flex", justifyContent:"center"}}>
            <button style={{backgroundColor:"#0055a2", color:"white" }} onClick={this.toggle}><h5>+Announcement</h5></button>
          </div>
        </div>
        {/* <hr></hr> */}

        <div >
          <div className="col-md-9" style={{float:"left", height:"80px"}}>
            <div style={{ color:"black",padding:"5px 0 5px 0"}}>
              <Heading display={this.state.heading}/>
            </div>
            <div >
              <Announcement display={this.state.announcement}/>
            </div>
          </div>
          <div className="col-md-3 " style={{color:"black", float:"right", height:"80px", textAlign: "right", lineHeight:"70px"}}>
            <DateAndTime display={'Posted on:'+this.state.time} />
          </div>
        </div>
        {/* <hr/> */}
        <div >
          
          <div className="col-md-9" style={{float:"left", height:"80px"}}>
            <div style={{ color:"black",padding:"5px 0 5px 0"}}>
              <Heading display={this.state.heading}/>
            </div>
            <div >
              <Announcement display={this.state.announcement}/>
            </div>
          </div>

          <div className="col-md-3 " style={{color:"black", float:"right", height:"80px", textAlign: "right", lineHeight:"70px"}}>
            <DateAndTime display={'Posted on:'+this.state.time} />
          </div>
        </div>
        {/* <hr></hr> */}
        <div>
          
          <div className="col-md-9" style={{float:"left", height:"80px"}}>
            <div style={{ color:"black",padding:"5px 0 5px 0"}}>
              <Heading display={this.state.heading}/>
            </div>
            <div >
              <Announcement display={this.state.announcement}/>
            </div>
          </div>

          <div className="col-md-3 " style={{color:"black", float:"right", height:"80px", textAlign: "right", lineHeight:"70px"}}>
            <DateAndTime display={'Posted on:'+this.state.time} />
          </div>
        </div>
          
        {/* Create an announcement */}
        <div>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}><h3>Make an announcement</h3></ModalHeader>
          <ModalBody>
          <Form onSubmit={(e) => e.preventDefault()}>
          <FormGroup>
            <InputGroup>
                <InputGroupAddon  addonType="prepend">Title: &nbsp;</InputGroupAddon>
                <Input name="title" type="text" value={this.state.title} onChange={this.inputChangeHandler} placeholder="" />
            </InputGroup>
<br></br>

            <InputGroup>
                <InputGroupAddon addonType="prepend">Announcement: &nbsp;</InputGroupAddon>
                <Input name="announcementContent" type="textarea" placeholder="" value={this.state.announcementContent} onChange={this.inputChangeHandler} />
            </InputGroup>
          </FormGroup>
        </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Post</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      
      </div>
    )
  }
}

export default AnnouncementsMain;
