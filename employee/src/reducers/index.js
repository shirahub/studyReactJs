import { combineReducers } from "redux"

const loginInfo = {
    isLogin: false,
    theUser: '',
    userID: '',
    role: ''
}

const employee = {
    employeeList: localStorage.getItem("employee")
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
            var newEmployee = {id:'', user: '', pass:'', name:action.name, motto: action.motto,photo:action.photo,github:action.github}
            var employees = JSON.parse(employee.employeeList)
            employees.push(newEmployee)
            localStorage.setItem("employee", JSON.stringify(employees))
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



