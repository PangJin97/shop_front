import React from "react";
import styles from './ShopInput.module.css'

//..props : 앞에서 직접 선언하지 않는 나머지 데이터를 받음
const ShopInput = ({type='text', size='', ...props}) => {
  return (
    <>
      <input type={type} className={size ==='' ? styles.input : [styles.input, styles.wide].join(' ')} {...props} />
    </>
  );
};

export default ShopInput;
