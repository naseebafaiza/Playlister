import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ERROR: "ERROR",
    GUEST: "GUEST",
    VIEW_HOME: "VIEW_HOME",
    VIEW_ALL_LISTS: "VIEW_ALL_LISTS",
    VIEW_USERS: "VIEW_USERS"
}

const view = {
    NONE : "NONE",
    HOME: "HOME",
    ALL_LISTS : "ALL_LISTS",
    USERS: "USERS"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null,
        view: view.NONE
    });
    const history = useHistory();
    const visitor  = {
        NONE: "NONE",
        REGISTERED: "REGISTERED",
        GUEST: "GUEST"
    }

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: null,
                    view: auth.view,
                    visitor: auth.visitor
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    errorMessage: payload.errorMessage,
                    view: view.HOME,
                    visitor: visitor.REGISTERED
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: null,
                    view: view.NONE,
                    visitor: visitor.NONE
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage,
                    view: view.NONE,
                    visitor: visitor.NONE
                })
            }
            case AuthActionType.GUEST: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    errorMessage: "",
                    view: view.ALL_LISTS,
                    visitor: visitor.GUEST
                })
            }
            case AuthActionType.ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    errorMessage: payload.errorMessage,
                    view: auth.view,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.VIEW_HOME: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: "",
                    view: view.HOME,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.VIEW_ALL_LISTS: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: "",
                    view: view.ALL_LISTS,
                    visitor: auth.visitor
                })
            }
            case AuthActionType.VIEW_USERS: {
                return setAuth({
                    user: auth.user,
                    loggedIn: auth.loggedIn,
                    errorMessage: "",
                    view: view.USERS,
                    visitor: auth.visitor
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    auth.registerUser = async function(userName, firstName, lastName, email, password, passwordVerify) {
        console.log("REGISTERING USER");
        try{   
            const response = await api.registerUser(userName, firstName, lastName, email, password, passwordVerify);   
            if (response.status === 200) {
                console.log("Registered Sucessfully");
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                history.push("/login");
                console.log("NOW WE LOGIN");
                auth.loginUser(email, password);
                console.log("LOGGED IN");
            }
        } catch(error){
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: error.response.data.errorMessage
                }
            })
        }
    }

    auth.loginUser = async function(email, password) {
        try{
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user,
                        loggedIn: true,
                        errorMessage: null
                    }
                })
                history.push("/");
            }
        } catch(error){
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: auth.user,
                    loggedIn: false,
                    errorMessage: error.response.data.errorMessage
                }
            })
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    auth.goHome = function() {
        authReducer( {
            type: AuthActionType.VIEW_HOME,
            payload: {}
        })
    }
    auth.goAllLists = function() {
        authReducer( {
            type: AuthActionType.VIEW_ALL_LISTS,
            payload: {}
        })
    }
    auth.goUsers = function() {
        authReducer( {
            type: AuthActionType.VIEW_USERS,
            payload: {}
        })
    }

    auth.useAsGuest = async function () {
        try {
            let response = await api.registerUser("Guest", "Guest", "User", "guest@playlister.stonybrook.org", "password", "password");
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.GUEST,
                    payload: {
                        user: response.data.user
                    }
                })
                response = await api.loginUser("guest@playlister.stonybrook.org","password");
                if (response.status === 200) {
                    authReducer({
                        type: AuthActionType.GUEST,
                        payload: {
                            user: response.data.user
                        }
                    })
                }
            }
        } catch (error) {
            let response2 = await api.loginUser("guest@playlister.stonybrook.org","password");
            if (response2.status === 200) {
                authReducer({
                    type: AuthActionType.GUEST,
                    payload: {
                        user: response2.data.user
                    }
                })
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };