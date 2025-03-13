import React, { useEffect, useState } from "react";

/**
 * 
 * sessionStorage, localStorage 
 * => 웹 상에 데이터를 저장할 수 있는 공간이다. 
 * 
 * localStorage와 sessionStroge는 새로고침해도 데이터 살아있다.
 * localStorge는 탭 간에도 데이터 공유한다.
 * 웹브러우저가 완전히 종료되도 데이터가 살아있다
 * 컴퓨터 껏다 켜도 영구 보존(직접적으로 지우지 않는 한 살아있음)
 *
 * sessionStroge는 탭 간에 데이터 공유하지 않는다.
 * 웹브라우저가 종료되면 데이터가 지워진다. 
 * 
 *   => 개발자모드 application탬에서 확인 가능. 
     => 이 두 곳에는 객체 데이터 저장 불가! 하지만 다른 방법으로 객체 사용 가능. 
 * 
 * 
 * 새로고침하면 초기화되어서 일반적인 데이터는 날아감
 * 리랜더링 할때만 마지막값 저장
 * 
 * 스토리지는 새로고침해도 데이터가 사라지지않음
 * 데이터를 저장할 수 있는 공간 
 * 
 * 
 */
const StorageTest = () => {
  // const[num, setNum] = useState(0);

  // useEffect(()=>{
  //   setNum(5)
  // },[])

  //새로고침하면 처음부터 시작해서 setNum은 0값을 지님

  // localStoragy에 데이터를 저장하는 법

  useEffect(() => {
    localStorage.setItem("name", "hong");
    localStorage.setItem("age", "20");
    //새로고침해도 키값이 중복이라 데이터가 쌓이지 않음
    //마지막 데이터로 바뀜

    sessionStorage.setItem("name", "tenka");
  }, []);

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("loginInfo");
            sessionStorage.removeItem("addr");
          }}
        >
          데이터 삭제 버튼
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            const age = localStorage.getItem('age');
            const name = localStorage.getItem('name')
            alert(`age=${age}, name=${name}`)
          }}
        >
         데이터 확인 버튼
        </button>
      </div>
    </>
  );
};

export default StorageTest;
