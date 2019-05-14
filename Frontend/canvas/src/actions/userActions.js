import {LOGIN_VALIDATION, REGISTER_USER , PROFILE_INFO, GET_ERROR_INFO, SET_LOGIN_USER} from './types'
import axios from "axios"
import cookies from "react-cookies"
import { BackendIP, BackendPort } from '../config';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../setAuthToken';

const BackendURL = BackendIP+BackendPort


export function loginValidation(data) {
    return function (dispatch) {
        console.log("Validating user...");
        let userID = data.userID;
        // console.log(userID);
        // let authFlag = false
        axios.defaults.withCredentials = true;
        axios.post(`${BackendURL}/login`, data)
            .then(response => {
                console.log("@@@@@@@@@@@@@@@@@@@@@"+response)
                var {Role} = response.data;
                localStorage.setItem('Role', Role);
                var {UserID} = response.data;
                localStorage.setItem('UserID', UserID);
                var { token } = response.data;
                localStorage.setItem('jwtToken', token);
                setAuthToken(token);
                var decodedToken = jwt_decode(token);
                // let authFlag = true;
                dispatch(setLoginUser(decodedToken))

                // if (response.status === 200) {
                //     localStorage.setItem('Role', response.data);
                //     // localStorage.setItem('UserID', this.state.UserID);
                //     let authFlag = true;
                //     dispatch({
                //         type: LOGIN_VALIDATION,
                //         flag: authFlag,
                //         payload: response.data,
                //         payloadStatus: response.status
                //     })
                // } else {
                //     let authFlag = false
                //     dispatch({
                //         type: LOGIN_VALIDATION,
                //         flag: authFlag,
                //         payload: response.data,
                //         payloadStatus: response.status
                //     })
                //     console.log("Invalid Password");//retu;rn callback(new Error('Invalid password'));
                // }
            }).catch(err => {
                dispatch({
                    type: GET_ERROR_INFO,
                    payload: err.response.data
                });

                //return callback(new Error('Invalid username and password'))
            });
    }
}

export const setLoginUser = decodedToken => {
    return {
        type : SET_LOGIN_USER,
        payload: decodedToken
    }
}

export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('Role');
    localStorage.removeItem('UserID');
    localStorage.removeItem('courseCards');
    localStorage.removeItem('CourseID');
    localStorage.removeItem('CourseName');
    localStorage.removeItem('TeacherID');
    setAuthToken(false);
    dispatch(setLoginUser({}));
    if(history)
        history.push('/login');
}

// export function getCourses(data) {
//     return async function (dispatch) {
//         console.log("Retrieving courses of ");
//         let userID = data.userID;
//         console.log(userID);
//         axios.defaults.withCredentials = true;
//         await axios.post(`${BackendURL}/getCourses`, data)
//         .then(response => {
//             if(response.status === 200){
//                 dispatch({
//                     type: GET_COURSES,
//                     payload: response.data,
//                     payloadStatus: response.status
//                 })
//                 sessionStorage.setItem('courseCards', JSON.stringify(response.data));
//             }
//         })
//     }
// }

export function registerUser(data) {
    return async function (dispatch) {
        console.log("Inside Registering user...");
        // let userID = data.userID;
        let message
        axios.defaults.withCredentials = true;
        await axios.post(`${BackendURL}/register`, data)
            .then(response => {
                console.log("Response status : ",response.status);
                console.log("Response Data : ",response.data);
                if(response.status === 200){
                    console.log("User successfully registered")
                    dispatch({
                        type: REGISTER_USER,
                        payload: response.data,
                        payloadStatus: response.status
                    })
                } else {
                    console.log("User not registered")
                    dispatch({
                        type: REGISTER_USER,
                        payload: response.data,
                        payloadStatus: response.status
                    })
                }
            });
    }
}

export function profileInfo(data) {
    return async function (dispatch) {
        // alert("Inside Profile actions");
        console.log("Inside PROFILE_ACTIOINS");
        axios.default.withCredentials = true;
        console.log("EHRER"+JSON.stringify(data))
        await axios.post('http://localhost:3001/updateProfile', data)
        .then(response =>{
            console.log("Response status : ",response.status);
            console.log("Response Data : ",response.data);
            console.log("In Response from the userActions: "+JSON.stringify(response.data))
            dispatch({
                type: PROFILE_INFO,
                payload: response.data,
                payloadStatus: response.status
            })
        })
    }
}