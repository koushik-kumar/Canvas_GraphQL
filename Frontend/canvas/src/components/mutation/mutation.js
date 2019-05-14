
import { gql } from 'apollo-boost';



const registermutation = gql`
    query UserRegister($studentid:String,$username:String, $password:String, $stufac:String){
        UserRegister(studentid:$studentid,username:$username,password:$password, stufac:$stufac){
        status
    }
  }
`;
const addCoursemutation = gql`

mutation CourseAdd($coursename:String,$courseid:String, $coursedes:String, $coursedept:String,$courseterm:String, $coursecol:String, $coursecap:String,$coursewaitcap:String, $courseroom:String, $facultyid:String){
    CourseAdd(coursename:$coursename,courseid:$courseid,coursedes:$coursedes, coursedept:$coursedept,courseterm:$courseterm,coursecol:$coursecol, coursecap:$coursecap,coursewaitcap:$coursewaitcap,courseroom:$courseroom,facultyid:$facultyid){
    status
}
}
   
`;

export {registermutation,addCoursemutation};