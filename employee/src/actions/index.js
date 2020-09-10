export const setLogin = (user, id, role) => ({
    type: "LOGIN",
    user: user,
    id: id,
    role: role
})

export const setLogout = () => ({
    type: "LOGOUT",
    user: '',
    id: '',
    role: '',
})

export const makeNewEmployee = (name, email, password, github, phone, motto, photo) => ({
    type: "NEW",
    name: name,
    email: email,
    password: password,
    github: github,
    phone: phone,
    motto: motto,
    photo: photo
})

export const editEmployee = (name, email, github, phone, motto, photo) => ({
    type: "EDIT",
    name: name,
    email: email,
    github: github,
    phone: phone,
    motto: motto,
    photo: photo
})

export const deleteEmployee = (email) => ({
    type: "DELETE",
    email: email
})
