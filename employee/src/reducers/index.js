import { combineReducers } from "redux"
import Firebase from '../config';
import { FirebaseContext } from '../config';


const loginInfo = {
    isLogin: false,
    theUser: '',
    userID: '',
    role: ''
}

var a = new Firebase()

const employee = {
    // employeeList: localStorage.getItem("employee")
    employeeList: a.getAllUser()
}
const admin = {
    admin: { "user": "shir", "pass": "leen", "id": "1" }
}

const authReducer = (state = loginInfo, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                isLogin: true,
                theUser: action.user,
                userID: action.id,
                role: action.role
            }
        case "LOGOUT":
            return {
                isLogin: false,
                theUser: action.user,
                userID: action.id,
                role: action.role
            }
        default:

            return state;
    }
};

const adminReducer = (state = admin) => {
    return state;
};

const employeeReducer = (state = employee, action) => {
    switch (action.type) {
        case "NEW":
            saveRegFirebase(action.name, action.email, action.password, action.github, action.phone, action.motto, action.photo)
            return state;
        case "EDIT":
            editFirebase(action.name, action.email, action.github, action.phone, action.motto, action.photo)
            return state;
        case "DELETE":
            deleteFirebase(action.email)
        default:
            return state;
    }
};

const allReducers = combineReducers({
    auth: authReducer,
    adminlogin: adminReducer,
    employeelist: employeeReducer
})

export default allReducers

const editFirebase = (name, email, github, phone, motto, photo) => {
    a.editFirebaseUser(name, email, github, phone, motto, photo)
        .then(user => {
            console.info(user)
        })
        .catch(err => {
            alert(err.message)
        })
}

const deleteFirebase = (email) => {
    a.deleteFirebaseUser(email)
}

const saveRegFirebase = (name, email, password, github, phone, motto, photo) => {
    a.registerFirebaseUser(email, password)
        .then(user => {
            console.info(user)
            a.insertNewUser(name, email, github, phone, motto, photo)
        })
        .catch(err => {
            alert(err.message)
        })
}

// saveUserFirebase =(name, email, github, phone, motto, photo) => {
//     a.insertNewUser(name, email, github, phone, motto, photo)
//     .then(user => {
//         console.info(user)
//     })
//     .catch(err => {
//         alert(err.message)
//     })
// }