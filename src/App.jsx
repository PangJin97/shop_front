import { Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import ItemForm from "./components/ItemForm";
import BookList from "./components/BookList";
import CateMange from "./components/CateMange";

import State변경함수흐름 from "./components/practice/State변경함수흐름";
import Axios흐름 from "./components/practice/Axios흐름";
import ShopButton from "./commom_component/ShopButton";
import ShopInput from "./commom_component/ShopInput";
import UserLogin from "./components/UserJoin";
import State변경함수흐름2 from "./components/practice/State변경함수흐름2";
import State변경함수흐름3 from "./components/practice/State변경함수흐름3";
import Login from "./components/Login";
import StorageTest from "./components/practice/StorageTest";

function App() {
  return (
    <div className="container">
      {/* <StorageTest /> */}

      <Routes>
        {/* 유저가 접속하는 페이지 */}
        <Route path="/" element={<UserLayout />}>
        
          {/* 상품목록 페이지 */}
          <Route path="" element={<BookList />} />

          {/* 상품 상세 페이지 */}
          <Route path="detail" element={<div>상품상세페이지</div>} />
          
          {/* 회원가입 페이지 */}
          <Route path="join" element={<UserLogin />} />

          {/* 로그인 페이지 */}
          <Route path="login" element={<Login />} />
       
        </Route>

        {/* 관리자가 접속하는 페이지 */}

        <Route path="/admin" element={<AdminLayout />}>
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
