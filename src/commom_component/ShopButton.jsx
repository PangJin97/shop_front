import React from "react";
import styles from './ShopButton.module.css'

//쇼핑물 프로젝트에 사용할 버튼 컴포넌트
//size : small, nomarl, size

const ShopButton = ({title = '버튼', size='size_normal', click}) => {
                    //파이썬의 default값 정해주기와 똑같다  

  // class = 'btn size_nomarl' => class 두개 적용하기 
  
  // ['aa','bb'].join(' ') -> 'aa bb'
  // ['aa', 'bb', 'cc'].join('-') -> 'aa-bb-cc' 
  

  // const student ={
  //   name: 'kim',
  //   score: 80
  // }

  // const aa = 'score';

  // student.score;
  // student.aa; //undefined

  // student['score']
  // student[aa]

  return (
    <>
      <button type="button" 
        className={[styles.btn, styles[size]].join(' ')}
        // class = btn size
        // 여러가지 스타일을 적용하기 위해 배열 활용 
        onClick={click}
      >
        {title}
      </button>
    </>
  );
};

export default ShopButton;
