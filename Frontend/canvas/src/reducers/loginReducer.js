import { LOGIN_VALIDATION, REGISTER_USER, PROFILE_INFO, GET_ERROR_INFO, SET_LOGIN_USER } from "../actions/types";
import isEmpty from './../validation/isEmpty'


const init={
    authFlag:false,
    respStatus:'',
    resp:{},
    message:'',
    isAuthenticated: false,
    user:{}
}

export default function(state=init, action){
    switch(action.type){
        case SET_LOGIN_USER:
            return{
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        // case LOGIN_VALIDATION:
        //     // console.log("LOGIN_VALIDATION Reducer...")
        //     // console.log("Existing State")
        //     // console.log(...state)
        //     // console.log("Payload: "+action.payload)
        //     return{
        //         ...state,
        //         authFlag:action.flag,
        //         message:action.payload,
        //         respStatus:action.payloadStatus
        //     };
        case REGISTER_USER:
            return{
                ...state,
                message:action.payload,
                respStatus: action.payloadStatus
            };
        case PROFILE_INFO:
            // alert("inside profile reducer")
            return{
                ...state,
                message:action.payload,
                respStatus: action.payloadStatus
            };
        case GET_ERROR_INFO:
            return action.payload
        
        default:
            // console.log("Inside get courses reducer")
            return state;
    }
}