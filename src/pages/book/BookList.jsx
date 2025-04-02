import React, { useEffect, useState } from "react";
import Item from "../../components/book/item";
import { getBookList } from "../../apis/bookApi";
import styles from './BookList.module.css';

const BookList = () => {
  //도서 목록 데이터를 저장할 변수
  const [bookList, setBookList] = useState([]);

  //마운트 시 도서 목록 조회
  useEffect(() => {
    getBookList()
      .then((res) => {
        setBookList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.books}>
      {bookList.map((book, i) => {
        return (<Item key={i} book={book} />);
      })}
    </div>
  );
};

export default BookList;
