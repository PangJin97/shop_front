
/**
 * 회원가입
 */

import axios from "axios"

export const regUser = (insertUser) =>{
 const response = axios.post('/api/users', insertUser)
 return response;
}

/**
 * 로그인
 * loginData {userId: '' , userPw:''}
 */

export const loginUser = (logindata) =>{
  const response = axios.get('/api/users/login',{params:logindata})
  return response;
}