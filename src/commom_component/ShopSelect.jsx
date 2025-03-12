import React from 'react'
import styles from './ShopSelect.module.css'

const ShopSelect = ({children, ...props}) => {
  // 컴포넌트를 열고 닫는 태그를 따로 만들고 
  // 안에서 만든다 
  //컴포넌트 사이에 그린 그림을 가져 오려면 프롭스에 
  //children으로 받으면 그대로 받을 수 있다.
  return (
    <select {...props} className={styles.select}>
      {children}
    </select>
  )
}

export default ShopSelect