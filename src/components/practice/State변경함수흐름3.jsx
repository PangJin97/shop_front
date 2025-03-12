import React, { useEffect, useState } from 'react'

const State변경함수흐름3 = () => {


  const[student,setStudent] = useState({
    name : 'hong',
    age : 20,
    score : 90
  }); 

  const changeData = () => {
    setStudent({
      ...student,
      name : 'kim'
    }) 

    setStudent({
      ...student,
      age : 30
    })
    
    //비동기에 의해 2개가 거의 동시에 실행되는데(일괄처리)
    //age만 바뀌고 kim은 안바뀜
    //거의 동시에 진행되지만 실은 나이 바뀌는게 조금 더 느려서 그게 반영된다
    // 영점 몇초 차이? 


    // => 비동기 해제 
   //2개 이상의 state함수가 있는 비동기 해제 => updater 

    setStudent((state)=>{
      return {...state, 
        name : 'kim',
      }
    })


    setStudent((state)=>{
      //2개 이상의 state함수가 있는 비동기 해제 => updater 
      return {...state, 
        age : 30,
      }
    })

    console.log('함수 안')
    console.log(student)
  }


  useEffect(()=>{
    changeData();
  },[])

  console.log('함수 밖')
  console.log(student)


  return (
    <div>State변경함수흐름3</div>
  )
}

export default State변경함수흐름3