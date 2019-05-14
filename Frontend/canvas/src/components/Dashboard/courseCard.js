import React, { Component } from 'react'
import { Card, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

export default class CourseCard extends Component {

  render() {
    return (
      <div>
          <Card className='col-md-3 mx-3'  fa-flip-horizontal cardName={this.props.course_Name} style={{ float: "left", height: "260px", width: "550px", marginTop: "20px", marginBottom: "10px", padding: "0"}}>
            <div className="card cardColorBackground text-white pl-0 ml-0" style={{ backgroundColor: this.props.color, height: "150px", width: "236px", color: "white" }}>
            </div>
            <CardBody>
                <u><a href={'courses/'+this.props.course_number} cardID={this.props.course_id} className="courselink" style={{ color: this.props.color,fontSize:"14px", fontWeight: "900", textDecorationColor: "#0055a2" }}>
                    <CardTitle style={{width: "105%"}}>{this.props.course_term}19:&nbsp;{this.props.course_id}&nbsp;{this.props.shortercoursename}</CardTitle>
                </a></u>
                <u><a href={'courses/'+this.props.course_number} cardID={this.props.course_id} className="courselink" style={{ color: "grey", fontWeight: "1000", fontSize:"14px", textDecorationColor: "#0055a2" }}>
                    <CardSubtitle>{this.props.course_term}19:&nbsp;{this.props.course_id}&nbsp;{this.props.shortercoursename}</CardSubtitle>
                </a></u>
                <div>
                <a><i style={{color: "#737a82", padding:"10px 10px 10px 10px"}} class="fas fa-bullhorn fa-lg"></i></a>
                <a><i style={{color: "#737a82", padding:"10px 10px 10px 10px"}} class="fas fa-clipboard-list fa-lg"></i></a>
                <a><i style={{color: "#737a82", padding:"10px 10px 10px 10px"}} class="fas fa-comments fa-lg"></i></a>
                <a><i style={{color: "#737a82", padding:"10px 10px 10px 10px"}} class="fas fa-folder fa-lg"></i></a>
                </div>
            </CardBody>
        </Card>
      </div>
    )
  }
}




