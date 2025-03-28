import axios from "axios";
import React, { useEffect, useState } from "react";
import { getCategoryList, insertBooks } from "../../apis/bookApi";
import ShopInput from "../../commom_component/ShopInput";
import ShopButton from "../../commom_component/ShopButton";
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

  //첨부 파일을 등록할 변수

  //메인 이미지를 저장할 변수
  const [mainImg, setMainImg] = useState(null);

  //상세 이미지를 저장할 변수
  const [subImg, setSubImg] = useState(null);

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

          <ShopInput
            name="bookName"
            value={insertBook.bookName}
            onChange={(e) => {
              chageData(e);
            }}
          />
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
            }}
          />
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
            }}
          />
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
          <p>도서 메인 이미지</p>
          <input
            type="file"
            onChange={(e) => {
              setMainImg(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <p>도서 상세 이미지</p>
          <input
            type="file"
            onChange={(e) => {
              setSubImg(e.target.files[0]);
            }}
          />
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

        <ShopButton
          title="등 록"
          size="small"
          click={(e) => {
            const regForm = new FormData();

            //도서 등록(DB insert)에 필요한 데이터 적재
            regForm.append("cateCode", insertBook.cateCode);
            regForm.append("bookName", insertBook.bookName);
            regForm.append("bookPrice", insertBook.bookPrice);
            regForm.append("publisher", insertBook.publisher);
            regForm.append("cateCode", insertBook.bookStock);
            regForm.append("bookInfo", insertBook.bookInfo);

            //첨부파일 데이터 적재
            regForm.append("mainImg", mainImg);
            regForm.append("subImg", subImg);

            // 프롭스를 통해 값을 전달한다. ItemForm은 부모 컴포넌트 이기에...
            // click 값을 ShopButton에 보내면 onClick 안에 click 실행
            insertBooks(regForm)
              //bookApi export 활용
              .then((res) => {
                alert("등록완료");
                console.log(res.data);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        />
      </div>
    </div>
  );
};

export default ItemForm;
