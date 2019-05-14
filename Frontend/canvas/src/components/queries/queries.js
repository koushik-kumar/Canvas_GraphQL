    
import { gql } from 'apollo-boost';


const Login = gql`
    query User($studentid:String, $password:String,$stufac:String){
        User(studentid:$studentid,password:$password,stufac:,$stufac){
        status
        data{
            username
            studentid
        }
      

    }
  }
`;


const retriveCourses = gql`
    query getCourses($studentid:String,$stuname:String, $stufac:String){
        getCourses(studentid:$studentid,stuname:$stuname,stufac:$stufac){

            course_result{
            courseid,
            coursecol,
            coursename,
            coursestatus,
            
        }
        status
    }
  }
`;
const getProfile = gql`
    query getProfile($loginid:String, $stufac:String){
        getProfile(loginid:$loginid,stufac:$stufac){
        result{
            name
            email 
            phonenumber
            about
            school
            city
            country
            company
            hometown
            language
            gender
        }
        status
    }
  }
`;

export {checkUEmail,signup,getCourses,getProfile}