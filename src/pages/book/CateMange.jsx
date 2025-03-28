import axios from "axios";
import styles from "./CateManage.module.css";
import React, { useEffect, useState } from "react";
import * as bookApi from "../../apis/bookApi";

const CateMange = () => {
  //오류 메세지를 저장할 변수
  const [errorMsg, setErrorMsg] = useState("");

  //카테고리 목록 재조회 실행을 위한 변수
  const [categoryTrigger, setCategoryTrigger] = useState({});

  //카테고리 목록 조회
  const [cateList, setCateList] = useState([]);

  useEffect(() => {
    bookApi
      .getCategoryList()
      //bookApi 활용
      .then((res) => {
        setCateList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [categoryTrigger]);

  //카테고리 등록
  const [newCategory, setNewCategory] = useState("");

  console.log(newCategory);

  const insertCate = (e) => {
    //카테고리명 입력 안했으면 중지

    if (newCategory === "") {
      setErrorMsg("카테고리명은 최소 한 글자 이상입니다");
      return;
    }

    //키보드 엔터를 누르면

    bookApi
      .insertCategory(newCategory)
      //bookApi 활용
      .then((res) => {
        console.log(res.data);
        //등록 여부에 따라 다른 코드 진행
        if (res.data === 1) {
          alert("등록성공");
          //카테고리 목록을 다시 조회
          setCategoryTrigger({});
          //input 태그의 값을 초기화
          setNewCategory("");
          //등록되면 에러 메세지 숨기기
          setErrorMsg("");
        } else {
          setErrorMsg("이미 등록된 카테고리 명입니다");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //카테고리 수정
  const [updateCate, setUpdateCate] = useState({
    cateName: " ",
  });

  const updateCategory = (e) => {
    setUpdateCate({
      ...updateCate,
      [e.target.name]: e.target.value,
    });
  };

  console.log(updateCate);

  return (
    <div>
      <div>
        <p>카테고리 등록</p>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => {
            setNewCategory(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              insertCate(e);
            }
          }}
        />
        <button
          type="button"
          onClick={(e) => {
            insertCate(e);
          }}
        >
          카테고리 등록
        </button>
        {
          // truty falsey
          errorMsg && <p className={styles.error_p}>{errorMsg}</p>
        }
      </div>
      <div>
        <div>카테고리 목록</div>
        <table>
          <thead>
            <tr>
              <td>No</td>
              <td>카테고리 코드</td>
              <td>카테고리명</td>
              <td>수정</td>
              <td>삭제</td>
            </tr>
          </thead>
          <tbody>
            {cateList.map((cate, i) => {
              return (
                <tr key={i}>
                  <td>{cateList.length - i}</td>
                  <td>{cate.cateCode}</td>
                  <td>
                    <input
                      name="cateName"
                      type="text"
                      defaultValue={cate.cateName}
                      onChange={(e) => {
                        updateCategory(e);
                      }}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        axios
                          .put(`/api/categories/${cate.cateCode}`, updateCate)
                          .then((res) => {
                            console.log(res.data);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      수정
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={(e) => {
                        axios
                          .delete(`/api/categories/${cate.cateCode}`)
                          .then((res) => {
                            console.log(res.data);
                          })
                          .catch((error) => {
                            console.log(error);
                          });
                      }}
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CateMange;
