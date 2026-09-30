import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setUser,setAccessToken } from '../state/auth.slice'



const Me = () => {
  const user = useSelector((state) => state.auth.user);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const dispatch = useDispatch();

  const api = axios.create({
    withCredentials: true,
  });

  api.interceptors.request.use(
    config=>{
      config.headers.Authorization = `Bearer ${accessToken}`
      return config;
    }
  );

  api.interceptors.response.use(
    response=>{
      return response;
    },
    async(error)=>{
      if(error.response.status === 401){
        const response = await axios.post("http://localhost:5173/api/auth/refresh",{},{
          withCredentials: true
        });

        const data = response.data;
        dispatch(setAccessToken(data.accessToken))

        error.config.headers.Authorization = `Bearer ${data.accessToken}`;

        return axios(error.config);
      }
      return Promise.reject(error);
    }
  );



 async function fetchMe(){
    const response = await api.get("http://localhost:5173/api/auth/me");
    dispatch(setUser(response.data.user))
  }

useEffect(()=>{
  fetchMe()
  
},[])

  return (
    <div>Me</div>
  )
}

export default Me