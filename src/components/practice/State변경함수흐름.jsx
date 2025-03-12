import React, { useEffect, useState } from "react";

/**
 * 동기방식과 비동기 방식의 차이
 * 동기방식 : 코드의 결과를 기다리고 다음 코드를 진행
 * 비동기 방식 : 코드의 결과를 기다리지 않고 다음 코드를 작성
 * 비동식 방식으로 동작되는 대표들 : state, axios
 * 
 * 
 * state 변경함수는 모든 코드 헤석 후 마지막에 일괄 처리 
 * 때문에 state 변경 함수가 여러 줄 실행되도 한번만 제 렌더링
 * 
 * 
 */



const State변경함수흐름 = () => {

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

 

  useEffect(()=>{
    console.log(1)
    // setNum1(num1+1)
    console.log(2)
    // setNum2(num1 + 1)

    
    //변경함수를 모아 일괄처리 해서 한번만 실행
    setNum1(num1 + 1);
    setNum2(num1 + 1)

  },[])

  console.log('리렌더!!')



  return (
    <>
      <div>State변경함수흐름</div>
      <h3>{num1}</h3>
      <h3>{num2}</h3>
    </>
  );
};

export default State변경함수흐름;
