import axios from "axios";
import React, { useEffect, useState } from "react";
import ShopInput from "../commom_component/ShopInput";
import ShopSelect from "../commom_component/ShopSelect";
import ShopButton from "../commom_component/ShopButton";
import { regUser } from "../apis/userApi";

const UserLogin = () => {
  //falsy한 데이터 
  // 빈문자 , 0, null, undefined, NaN(숫자가 없음)


  // 입력이 잘못되었을 떄 나타나는 에러 메세지 
  const[errorMsg, setErrorMsg] = useState({
    userId : '',
    userPw : '', 
    userTel: ''
  })


  //입력한 데이터를 저장하기 위한 변수
  const [insertUser, setInsertUser] = useState({
    userId: "",
    userPw: "",
    userName: "",
    userEmail: "", // 완성된 이메일
    email1: "",
    email2: "@gmail.com",
    userTel: "", // 완성된 연락처
    tel1: "",
    tel2: "",
    tel3: "",
  });


  //email1, email2 값이 변경될때만 실행 
  //useEffect로 비동기 해제
  useEffect(()=>{
    setInsertUser({
      ...insertUser,
      userEmail : insertUser.email1 + insertUser.email2
    })
  },[insertUser.email1, insertUser.email2]);


  //tel1 ,tel2, tel3 값이 변경될때만 실행
  //useEffect로 비동기 해제 
  useEffect(()=>{
    setInsertUser({
      ...insertUser,
      userTel : [insertUser.tel1, insertUser.tel2, insertUser.tel3].join('-')
    })
  },[insertUser.tel1, insertUser.tel2, insertUser.tel3])

  //값이 변경될때...! 시점이다 => useEffect
  //비동기 동기의 개념파악 



  //키보드로 데이터를 입력할떄마다 실행되는 함수
  const changeUserDate = (e) => {
      setInsertUser({
        ...insertUser,
        [e.target.name]: e.target.value,
      });
    }


  //회원가입 전 유효성 검사 
  const joinValidate = () => {
    let result = 0;

    //강제로 빈값을 줘서 오류메세지 사라지게 하기
    //만약 오류가 있다면 if문 실행
    setErrorMsg((state)=>{
      return{
        userPw : '',
        userId : '',
        userTel : '',
      }
    });

    //state 변경함수 흐름 3 참조 
    //set함수가 2번 호출 됐으니 updater함수로 정리 

    //4~16글자의 영문자로만 이루어진 정규식(GPT에몽에게 물어보기)
    const regex_id = /^[a-zA-Z]{4,16}$/;
   
    //입력받은 값이 정규식에 맞았을때 true 틀렸을때 false(=!true)을 리턴 (=> .test()호출 )
    if(!regex_id.test(insertUser.userId)){
      result = 1;
      setErrorMsg((state)=>{
        return {
          ...state,
          userId : '잘못된 아이디 입니다'
        }
      });
    }
    
    //비밀번호 정규식
    const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
    regex_pw.test(insertUser.userPw);
    if(!regex_pw.test(insertUser.userPw)){
      result = 1;
      setErrorMsg((state)=>{
        return{
          ...state,
          userPw : '잘못된 비밀번호 입니다'
        }
      });
    }

    //연락처 정규식 
    const regex_tel = /^(01[0-9]-\d{3,4}-\d{4}|0[2-9]-\d{3,4}-\d{4})$/;
    regex_tel.test(insertUser.userTel);
    if(!regex_tel.test(insertUser.userTel)){
      result = 1; 
      setErrorMsg((state)=>{
        return{
          ...state,
          userTel : '잘못된 연락처 입니다'
        }
      })
    }

    return result;
  }


  // 등록버튼 눌렀을때 회원가입 
  const join = () =>{
    
    //먼저 유효성 검사 실행
   const result = joinValidate();

   //joinValidate()가 0 이라면 오류없음
   //joinValidate()가 1 이라면 오류 있음

   if(result === 0){
    regUser(insertUser)
    .then((res)=>{
      if(res.data === 1){
        alert('회원가입성공')
      }else{
        setErrorMsg({
          ...errorMsg,
          userId : '중복된 아이디입니다'
        })
      }
    })
    .catch((error)=>{
      console.log(error)
    })
   }
  }
  
 
    return (
    <div>
      <div>회원 가입</div>

      <div>
        <div>
          <p>회원 아이디</p>
          <ShopInput
            size="wide"
            name="userId"
            value={insertUser.userId}
            onChange={(e) => {
              changeUserDate(e);
            }}
          />
        </div>
        {/* 에러메세지 */}
        {
          errorMsg.userId && <p className="error-Msg">{errorMsg.userId}</p>
          //truty falsy 개념 
          //빈문자는 false한 데이터니까 실행 조차 안함
          //빈문자가 아니면 트루니까 뒤에 조건 실행
        }
        <div>
          <p>회원 비밀번호</p>
          <ShopInput
            size="wide"
            type="password"
            name="userPw"
            value={insertUser.userPw}
            onChange={(e) => {
              changeUserDate(e);
            }}
          />
        </div>
        {
          errorMsg.userPw && <p className="error-Msg">{errorMsg.userPw}</p>
        }
        <div>
          <p>회원 이름</p>
          <ShopInput
            size="wide"
            name="userName"
            value={insertUser.userName}
            onChange={(e) => {
              changeUserDate(e);
            }}
          />
        </div>

        <div>
          <p>회원 이메일</p>
          <ShopInput
            name="email1"
            value={insertUser.email1}
            onChange={(e) => {
              changeUserDate(e);
            }}
          />

          <ShopSelect
            name="email2"
            value={insertUser.email2}
            onChange={(e) => {
              changeUserDate(e);
            }}
          >
            <option value="@naver.com">@naver.com</option>
            <option value="@gmail.com">@gmail.com</option>
          </ShopSelect>
        </div>

        <div>
          <p>회원 전화번호</p>
          <ShopInput
            name="tel1"
            value={insertUser.tel1}
            onChange={(e) => {
              changeUserDate(e);
            }}
            maxLength = {3}
          />
          <span>-</span>
          <ShopInput
            name="tel2"
            value={insertUser.tel2}
            onChange={(e) => {
              changeUserDate(e);
            }}
            maxLength = {4}
          />
          <span>-</span>
          <ShopInput
            name="tel3"
            value={insertUser.tel3}
            onChange={(e) => {
              changeUserDate(e);
            }}
            maxLength = {4}
          />
        </div>
        {
          errorMsg.userTel && <p className="error-Msg">{errorMsg.userTel}</p>
        }
      </div>
        
      <div>
        <ShopButton title="등록" click={(e) => {
            join(insertUser)
          }}/>
      </div>
    </div>
  );
};

export default UserLogin;
