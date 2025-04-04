import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import ShopInput from "../../commom_component/ShopInput";
import ShopButton from "../../commom_component/ShopButton";
import { loginUser } from "../../apis/userApi";
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginInfo }) => {
  const nav = useNavigate();

  // axios.get 으로 여러 데이터를 전달하는 방법
  // axios.get('url',{ params:{전달할 데이터} } )
  // 전달할 데이터는 객체형식

  //delete도 가능!

  //위 방식으로 전달한 데이터는 스프링에서
  // 1.@RequsetParam 어노테이션을 사용해서 받거나
  // 2.DTO객체로 데이터를 받으면 된다.

  //PS. REACT 2번 PDF(페이지 번호 23번) Query String으로 전달된 데이터를 받는 방식과 일치

  const [loginData, setLoginData] = useState({
    userId: "",
    userPw: "",
  });

  const chageLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const login = () => {
    loginUser(loginData)
      .then((res) => {
        console.log(res.data);
        //자바에서 null데이가 넘어오면 리엑트는 ''(빈문자)로 받는다
        
          alert("로그인 성공");
          //로그인 성공하면
          //sessionStroage에 로그인하는 회원의 아이디, 이름, 권한 정보를 저장한다.
          // sessionStorage.setItem('회원아이디',res.data.userId)
          // sessionStorage.setItem('회원이름',res.data.userName)
          // sessionStorage.setItem('회원권한정보',res.data.userRoll)

          // 1. 먼저 로그인한 회원의 아이디, 이름, 권한 정보만 가진 객체 생성
          const loginInfo = {
            userId: res.data.userId,
            userName: res.data.userName,
            userRoll: res.data.userRoll,
          };

          //sessionStorage엔 문자나 숫자만 저장가능, 객체는 저장되지 않는다
          //그러니 
          //loginInfo 객체를 json(객체 형태로 생긴 문자열)으로 변환 후
          //세션에 저장
          
          //JSON.stringify(객체) => 객체를 문자열화(json)한다.
          //JSON.pars(json) -> json 데이터를 객체로 변환

          sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
          //문자열화 되어 sessionStorage에 들어감
         
         
          //그걸 꺼내서 쓰려면 다시 객체로 변환
          // =>JSON.pars(json)

          //sessionStorage에 있는 loginIfo 데이터 받아오기
          
          //받은 데이터는 객체가 아닌 json데이터다(문자열 데이터)
          
          //사용하려면 객체로 변환
          //JSON.parse(json데이터)
          // const data = sessionStorage.getItem('loginInfo')
          // console.log(data)
          // console.log(JSON.parse(data))
          // console.log(JSON.parse(data).userId)


          //스프링 pdf 4 참조 (JSON 개념)
          setLoginInfo(loginInfo);
          //app.jsx에 있는 setLoginInfo를 프롭스로 받는다. 그러면
          //loginInfo가 있는 state변수가 있는 컴포넌트가 재랜더링 => app이 재 랜더링

          nav(loginInfo.userRoll === 'USER' ? '/': '/admin/reg-item' );
          //로그인 성공하면 첫 페이지로 이동
          //로그인한 유저의 권한에 따라 이동할 페이지 지정 
          //일반 회원 : 상품 목록 페이지
          //관리자 : 상품 등록 페이지 
        
      })
      .catch((e) => {
        console.log(e)
        console.log(e.response.data)
        console.log(e.status);

        if(e.status === 404){
          alert(e.response.data);
        }
        else{
          console.log(e)
          alert("오류발생. 관리자에 문의")
        }
      });
  };

  return (
    <div className={styles.container}>
      <h3>로그인</h3>
      <div className={styles.contentContainer}>
        <div>
          <p>아이디 입력</p>
          <ShopInput
            size="wide"
            name="userId"
            value={loginData.userId}
            onChange={(e) => {
              chageLogin(e);
            }}
          />
        </div>
        <div>
          <p>비밀번호 입력</p>
          <ShopInput
            size="wide"
            type="password"
            name="userPw"
            value={loginData.userPw}
            onChange={(e) => {
              chageLogin(e);
            }}
          />
        </div>
        <div>
          <ShopButton
            title="로그인"
            click={(e) => {
              login();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
