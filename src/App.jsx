import { useEffect, useState } from "react";
import "./App.css";
import UserLayout from './pages/common/UserLayout'
import BookList from './pages/book/BookList'
import UserLogin from "./pages/member/UserJoin";
import Login from "./pages/member/Login";
import AdminLayout from "./pages/common/AdminLayout"
import ItemForm from "./pages/book/ItemForm";
import CateMange from "./pages/book/CateMange"
import { Route, Routes } from "react-router-dom";




function App() {
  //로그인 정보를 저장할 state변수
  const [loginInfo, setLoginInfo] = useState(null);

  //Login.jsx에서 로그인을 성공하면 setLoginInfo()함수를 이용해서
  //로그인한 정보를 loginInfo변수에 저장한다

  //하지만 이 상태에서 새로고침하면 loginInfo변수에 저장된 로그인 정보가 사라진다.

  //그래서 새로고침을 하더라도 sessionStorage에 저장된 데이터로 로그인 정보를 유지시켜주기 위해

  //아래의 useEffect에서 한 번 더 로그인 정보를 가져온다

  useEffect(() => {
    //sessionStorage에 있는 loginInfo 가져오기
    //loginInfo 데이터가 없다면 로그인 안한 것. => null

    //이렇게 가져온 데이터는 JSON형태이다.
    const strLoginData = sessionStorage.getItem("loginInfo");

    //sessionStorage에 로그인 정보가 있으면
    if (strLoginData != null) {
      //sessionStorage에서 받은 json데이터를 객체로 변환한다.
      //변환된 loginInfo 객체에는 로그인한 회원의 아이디, 이름, 권한 정보가 들어있다.
      setLoginInfo(JSON.parse(strLoginData));
    }
  }, []);

  return (
    <div className="container">
      {/* <StorageTest /> */}
      {/* <UploadTest /> */}

      <Routes>
        {/* 유저가 접속하는 페이지 */}
        <Route
          path="/"
          element={
            <UserLayout loginInfo={loginInfo} setLoginInfo={setLoginInfo} />
          }
        >
          {/* login글자와 logout 글자가있는 userHeader에 보내기위해 우선
                                       UserLayout에 보냄  */}

          {/* 상품목록 페이지 */}
          <Route path="" element={<BookList />} />

          {/* 상품 상세 페이지 */}
          <Route path="detail" element={<div>상품상세페이지</div>} />

          {/* 회원가입 페이지 */}
          <Route path="join" element={<UserLogin />} />

          {/* 로그인 페이지 */}
          <Route path="login" element={<Login setLoginInfo={setLoginInfo} />} />
        </Route>

        {/* 관리자가 접속하는 페이지 */}

        <Route path="/admin" element={<AdminLayout loginInfo={loginInfo} setLoginInfo={setLoginInfo}/>}>
          {/* 상품등록 */}
          <Route path="reg-item" element={<ItemForm />} />

          {/* 회원관리 */}
          <Route path="user-manage" element={<div>회원관리</div>} />

          <Route path="cate-manage" element={<CateMange />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
