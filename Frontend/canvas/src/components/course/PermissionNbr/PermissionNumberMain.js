import React, { Component } from 'react'
import axios from 'axios';


export default class PNbr extends Component {
 
    constructor(props) {
        super(props);
    
        this.state = {
            gen_codes:'',
            courseCapacity:'',
            waitlistCapacity:'',
            totalStudents:''
        };
        
        this.generateHandler = this.generateHandler.bind(this)
    }

    generateHandler() {
        let codes =[]
        let min = 1000000
        let max = 9999999
        for(let i =0; i<20; i++){
            
            const rand = Math.floor(min + Math.random() * (max - min));
            // codes[i] = rand+"\n"
            codes.push(rand)
        }
        console.log("Permission codes")
        const data = {
            pnr_codes : codes,
            CourseID:  localStorage.getItem('CourseID') ,
            TeacherID:  localStorage.getItem('TeacherID'),
            Validity: "available"
        }
        // this.setState({
        //     gen_codes:codes
        // })
        axios.post('http://localhost:3001/genPNbr', data)
            .then(response => {
                if (response.status === 200){
                    this.setState({
                        gen_codes: JSON.stringify(response.data)
                    })
                }
            }
        )
    }

    componentDidMount() {

        const data = {
            CourseID:  localStorage.getItem('CourseID') ,
            TeacherID:  localStorage.getItem('TeacherID')
            // Validity: "available"
        }
        
        axios.post('http://localhost:3001/getCourseDetails',data)
        .then(response => {
            if (response.status === 200){
                this.setState({
                    courseCapacity:'',
                    waitlistCapacity:'',
                    totalStudents:''
                })
            }
        })

        axios.post('http://localhost:3001/getPNumbers', data)
            .then(response => {
                if (response.status === 200){
                    let pNumbers =[]
                    for(let i=0; i<20;i++){
                        pNumbers[i] = JSON.stringify((response.data)[i]["WaitListNumber"])+", "
                    }
                    // setTimeout(() => {
                        this.setState({
                            gen_codes: pNumbers
                        })
                    // }, 2000)
                }
            }
        )

    }

  render() {
    // alert("Home");
    return (
      <div>
            <ul class="list-group" style={{color:"#2d3b45", background:"#f5f5f5", borderBottom: "1px dashed #A5AFB5"}}>
                <li class="list-group-item-ctray" style={{backgroundColor:"faded"}}>
                    <div style={{listStyle:"none", fontSize:"25px"}}><u>Course Enrollment Details</u></div>
                    <div>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>
                            Course Capacity: 40
                        </li>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>
                            Waitlist Capacity:10
                        </li>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>
                            Total Students: 50
                        </li>
                        <br></br>
                        <button onClick={this.generateHandler}>Generate Permission Numbers</button>
                        <li style={{background:"white", display: "block", boxSizing:"border-box",position: "relative", border: "1px solid #C7CDD1",padding: "12px 6px 12px 10px"}}>
                            {this.state.gen_codes}
                        </li>
                    </div>
                </li>
            </ul>
      </div>
    )
  }
}
