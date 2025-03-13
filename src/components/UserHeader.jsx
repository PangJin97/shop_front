import React, { useEffect, useState } from "react";
import styles from "./UserHeader.module.css";
import { useNavigate } from "react-router-dom";
import UserLogin from "./UserJoin";

const UserHeader = ({loginInfo, setLoginInfo}) => {
  const nav = useNavigate();

  return (
    <div className={styles.header_container}>
      <div className={styles.login_div}>
        {loginInfo == null ? (
          <>
            <span
              onClick={(e) => {
                nav("login");
              }}
            >
              LOGIN
            </span>
            <span
              onClick={(e) => {
                nav("join");
              }}
            >
              JOIN
            </span>
          </>
        ) : (
          <>
            <p>{loginInfo.userId}님 반갑습니다</p>
            <p onClick={()=>{
              sessionStorage.removeItem('loginInfo')
              setLoginInfo(null)
              nav('login')
              alert('로그아웃 되었습니다')
            }}>Logout</p>
          </>
        )}
      </div>

      <div className={styles.banner_div}>
        <img src="/book_banner.PNG" />
        <p>BOOK STORE</p>
      </div>
      <div className={styles.menu_div}>
        <ul className={styles.menu_ul}>
          <li>전체</li>
          <li>IT/인터넷</li>
          <li>소설</li>
          <li>자기계발</li>
        </ul>
      </div>
    </div>
  );
};

export default UserHeader;
