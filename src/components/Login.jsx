import React, { useEffect, useState } from "react";
import styles from './Login.module.css'
import ShopInput from "../commom_component/ShopInput";
import ShopButton from "../commom_component/ShopButton";
import { loginUser } from "../apis/userApi";

const Login = () => {

  // axios.get 으로 여러 데이터를 전달하는 방법
  // axios.get('url',{ params:{전달할 데이터} } )
  // 전달할 데이터는 객체형식

  //delete도 가능!

  //위 방식으로 전달한 데이터는 스프링에서 
  // 1.@RequsetParam 어노테이션을 사용해서 받거나
  // 2.DTO객체로 데이터를 받으면 된다.

  //PS. REACT 2번 PDF(페이지 번호 23번) Query String으로 전달된 데이터를 받는 방식과 일치

  const[loginData,setLoginData]=useState({
    userId : '',
    userPw : ''
  })

  const chageLogin = (e) =>{
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  const login = () => {
    loginUser(loginData)
    .then((res)=>{
      console.log(res.data)
      //자바에서 null데이가 넘어오면 리엑트는 ''(빈문자)로 받는다
      if(res.data === ''){
        alert('로그인 실패')
      }else{
        alert('로그인 성공')
        //로그인 성공하면 
        //sessionStroage에 로그인하는 회원의 아이디, 이름, 권한 정보를 저장한다. 
        sessionStorage.setItem('회원아이디',res.data.userId)
        sessionStorage.setItem('회원이름',res.data.userName)
        sessionStorage.setItem('회원권한정보',res.data.userRoll)
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className={styles.container}>
      <h3>로그인</h3>
      <div className={styles.contentContainer}>
        <div>
          <p>아이디 입력</p>
          <ShopInput size='wide' name='userId' value={loginData.userId} onChange={(e)=>{
            chageLogin(e)
          }}/>
        </div>
        <div>
          <p>비밀번호 입력</p>
          <ShopInput size="wide" type="password" name='userPw' value={loginData.userPw} onChange={(e)=>{
            chageLogin(e)
          }} />
        </div>
        <div>
          <ShopButton title="로그인" click={(e)=>{login()}}/>
        </div>
      </div>
    </div>
  );
};

export default Login;
