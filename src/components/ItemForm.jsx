import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCategoryList, insertBooks } from "../apis/bookApi";
import ShopInput from "../commom_component/ShopInput";
import ShopButton from "../commom_component/ShopButton";
import { Form } from "react-router-dom";

//   ./ => 현제 위치
//    .. // => 상위폴더 

//상품 등록 컴포넌트
const ItemForm = () => {
  useEffect(() => {
    getCategoryList()
    //bookApi export 활용
      .then((res) => {
        setGetBookCategory(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //카테고리 목록을 저장할 변수
  const [getBookCategory, setGetBookCategory] = useState([]);

  //input 태그들에 입력한 데이터를 저장하는 변수
  const [insertBook, setInsertBook] = useState({
    bookName: "",
    bookPrice: 0,
    publisher: "",
    bookInfo: "",
    bookStock: "",
    cateCode: "",
  });

  const chageData = (e) => {
    setInsertBook({
      ...insertBook,
      [e.target.name]: e.target.value,
    });
  };

  //이미지 등록 
  const fileConfig = { headers: { "Content-Type": "multipart/form-data" } };

  const [file, setfile] = useState(null)


  return (
    <div className="item-form-container">
      <div>
        <h3>도서 등록</h3>
      </div>
      <div>
        <div>
          <p>카테고리</p>
          <select
            name="cateCode"
            value={insertBook.cateCode}
            onChange={(e) => {
              chageData(e);
            }}
          >
            <option value="">카테고리 선택</option>
            {getBookCategory.map((category, i) => {
              return (
                <option value={category.cateCode} key={i}>
                  {category.cateName}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>도서명</p>
          {/* <input
            name="bookName"
            value={insertBook.bookName}
            onChange={(e) => {
              chageData(e);
            }}
            type="text"
          /> */}
          
          <ShopInput name="bookName"
            value={insertBook.bookName}
            onChange={(e) => {
              chageData(e);
            }}/>
        
        </div>
        
        <div>
          <p>출판사</p>
          {/* <input
            name="publisher"
            value={insertBook.publisher}
            onChange={(e) => {
              chageData(e);
            }}
            type="text"
          /> */}

          <ShopInput   
            name="publisher"
            value={insertBook.publisher}
            onChange={(e) => {
              chageData(e);
            }}/>
        </div>
        
        <div>
          <p>도서가격</p>
          {/* <input
            name="bookPrice"
            value={insertBook.bookPrice}
            onChange={(e) => {
              chageData(e);
            }}
            type="text"
          /> */}
        
          <ShopInput   
            name="bookPrice"
            value={insertBook.bookPrice}
            onChange={(e) => {
              chageData(e);
            }}/>
        </div>
       
       <div>
          <p>책 소개</p>
          <textarea
            name="bookInfo"
            value={insertBook.bookInfo}
            onChange={(e) => {
              chageData(e);
            }}
          ></textarea>
        </div>
        <div>
          <p>도서재고</p>
          <input
            name="bookStock"
            value={insertBook.bookStock}
            onChange={(e) => {
              chageData(e);
            }}
            type="number"
          />
        </div>
        <div>
          <p>도서 이미지</p>
          <input type="file" onChange={(e)=>{setfile(e.target.value)}}/>
          {/* 상품목록에서 나오는 이미지 */}
          <input type="file" onChange={()=>{}}/>
          {/* 상품상세정보에 나오는 */}
        </div>
      </div>
      <div>
        {/* 등록 버튼 클릭시 도서 실행 */}
        {/* <button
          onClick={(e) => {
            insertBooks(insertBook)
            //bookApi export 활용
              .then((res) => {
                console.log(res.data);
                alert("등록완료");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          등록
        </button> */}

          <ShopButton title="등 록" size="small" click={(e) => {
            const form = new FormData();
            
            form.append('file', file)
            form.append()

            // 프롭스를 통해 값을 전달한다. ItemForm은 부모 컴포넌트 이기에...
            // click 값을 ShopButton에 보내면 onClick 안에 click 실행 
            insertBooks(form,fileConfig)
            //bookApi export 활용
              .then((res) => {
                console.log(res.data);
                alert("등록완료");
              })
              .catch((error) => {
                console.log(error);
              });
          }}/>
      </div>
    </div>
  );
};

export default ItemForm;
