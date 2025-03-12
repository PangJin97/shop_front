import React, { useEffect, useState } from 'react'

const State변경함수흐름2 = () => {
  const [num, setNum] = useState(0);

  const changeNum = () =>{
    // setNum(num + 1); // 0 -> 2
    // // => set함수는 킵했다가 나중에 일괄처리(마지막에 동시처리)
    // setNum(num+1); // 0.1 -> 0.2
    // setNum(num+1); // 0.2 -> 2.2
    // //set함수는 여러줄 있어도 일괄 처리되기때문에 '한번'만 재랜더링 그러니 num = 1 


    // 위처럼 비동기가 아니라 일반적인 흐름 차례대로 하고 싶다!

  // state 변경함수의 인자로는 데이터, 함수가 전달한다.
  // state 변경함수의 인자로 전달되는 함수를 updater
  // 인자로 함수를 사용하면 항상 최신의 state 값을 전달 받을 수 있음. 

    //매개변수 : state 변수의 값. 이 값은 항상 '최신의 값'을 유지
    //함수의 리턴값을 state 변수의 값으로 업데이트  
    //아래처럼 코드를 작성한다고 해도 여전히 비동기로 동작
    
    //updater를 사용한 state 변경함수는 
    //state 변경함수가 2회 연속 진행되면서 2번째 state변경함수의 기능이 첫번째 state 변경함수의 결과에 의존적 일때 사용.

    //state = num
    setNum((state)=>{
      return state + 1 
    })
    console.log('a = ', num)
    setNum((state)=>{
      return state + 1 
    })
    console.log('a = ', num)
    setNum((state)=>{
      return state + 1 
    })

  
    //동기 방식으로 결과값이 나온다 해도 결국은 state변경함수라서
    //비동기로 실행되어 state함수는 일괄처리 되므로 a는 여전히 0 
  }

  useEffect(()=>{
    changeNum();
  },[])
  
  console.log(' b = ', num)


  useEffect(()=>{
    console.log(' num = ', num)
  },[num])
  // num값이 변경되면 함수 안이 실행 

  
  const test2 = () =>{
    setNum(num+1)
    //console.log(' num = ', num)
  }







  return (
    <div>State변경함수흐름2</div>
  )
}

export default State변경함수흐름2