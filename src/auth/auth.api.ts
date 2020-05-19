
import {AuthUser} from "./auth.model";
import {API} from "../constants/api";
import {AxiosError, AxiosResponse} from "axios";
import { BehaviorSubject } from 'rxjs';

export type AuthResult = {
    authUser?: AuthUser,
    error?: AxiosError,
    isErr: boolean
}

const storedUser = () => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? new AuthUser(JSON.parse(storedUser)) : undefined;
}

// initialize authuser from storage if present
const authUserSubject = new BehaviorSubject<AuthUser | undefined>(storedUser());

const authError = (error: AxiosError): AuthResult => {
    return {error: error, isErr: true}
}

const authSuccess = (authUser: AuthUser): AuthResult => {
    return {authUser, isErr: false}
}
const axios = require('axios');


// use this if you want to manage then / catch with the caller
const login = (username: string, password: string) => {
    const payload = {username, password};
    return axios.post(API.auth_path, payload);
}

// use this if you want to wait for and do something with the promise after
// transformed into an auth result
const loginAsync = async (username: string, password: string): Promise<AuthResult> => {


    let authResult: AuthResult = {isErr: true}
    login(username, password).then((response: AxiosResponse) => {
        authResult = authSuccess(new AuthUser(response.data));
    }).catch((error: AxiosError) => {
        authResult = authError(error);
    })

    return authResult;
}

// use this if you want to auth and subscript
// transformed into an auth result
const loginAndUseSubscriber = async (username: string, password: string) => {

    login(username, password).then((response: AxiosResponse) => {
        updateSubscriberAndStorage(new AuthUser(response.data))
    }).catch((error: AxiosError) => {
        updateSubscriberAndStorage(undefined);
    })

}

const updateSubscriberAndStorage = (authUser: (AuthUser | undefined)) => {
    authUserSubject.next(authUser);
    if(authUser)
        localStorage.setItem('currentUser', JSON.stringify(authUser));
    else
        localStorage.removeItem("currentUser");

}



export const AuthAPI = {
    login,
    loginAsync,
    loginAndUseSubscriber,
    authUserSubject,
    storedUser,
}
