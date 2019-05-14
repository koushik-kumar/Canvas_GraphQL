import React from 'react';
import {Route} from 'react-router-dom';
import MainNavigation from "./MainNavigation/MainNavigation";
import dashboard from "./Dashboard/dashboard";
import CoursesTray from "./course/Navbar/CoursesTray";
import profile from "./profile/profile";
import Login from "./Login/Login";
import announcementsMain from './course/announcements/announcementsMain';
import SearchMain from "./search/searchMain";
import AddCourseMain from "./AddCourses/addCourseMain"

import jwt_decode from 'jwt-decode';
import setAuthToken from './../setAuthToken';
import store from './../store';
import {setLoginUser, logoutUser} from './../actions/index'


if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setLoginUser(decoded));
    
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/login'
    }
  }

class Main extends React.Component {

    render(){
        return(
            <div>
                <Route path="/" component={MainNavigation}/>
                <Route path="/login"  component={Login}/>
                <Route path="/dashboard"  component={dashboard}/>
                <Route path="/courses/:course_id" component={CoursesTray}/>
                <Route path="/profile" component={profile}/>
                <Route path="/announcements" component={announcementsMain}/>
                <Route path="/search" component={SearchMain}/>
                {/* <Route path="/addCourse" component={AddCourseMain}/> */}
            </div>
        )
    }
}

export default Main;