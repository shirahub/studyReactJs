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

export const makeNewEmployee = (name, motto, photo, github) => ({
    type: "NEW",
    name: name,
    motto: motto,
    photo: photo,
    github: github
})