import React, {useEffect, useState} from 'react';
import './App.css';
import {AuthAPI} from "./auth/auth.api";
import {OptionalAuthUser} from "./auth/auth.model";
import {AxiosError} from "axios";
import LoginPage from "./LoginPage";


const axios = require('axios');


// intercepter injects id token if present, and if caller hasent set arbitrary noauth header to any string
axios.interceptors.request.use(function(config: {headers: {Authorization: string, noauth?: string}}) {

  const token = AuthAPI.storedUser()?.idToken

  console.log(token )
  if(config.headers.noauth === undefined) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, function(err: AxiosError) {
  return Promise.reject(err);

});

const App = () =>  {

  const [currentUser, setCurrentUser] = useState<OptionalAuthUser>(undefined);

  // Subscribe whenever auth user changes then this page knows it!
  // so for example if you hav a login page, it can set this value
  useEffect(() => {
    AuthAPI.authUserSubject.subscribe(user => setCurrentUser(user));
  }, [currentUser])

  return (
    <div className="App">
      {
        currentUser ? (<p>{currentUser.username}</p>) : (<div><LoginPage/></div>)
      }
    </div>
  );
}

export default App;
