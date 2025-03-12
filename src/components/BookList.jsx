import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from './BookList.module.css'

const BookList = () => {

  const[bookList,setBookList] = useState([])

  useEffect(()=>{
    axios.get('/api/books')
         .then((res)=>{
            setBookList(res.data)
         })
         .catch((error)=>{
            console.log(error)
         })
  },[])

  return (
    <div className={styles.books}>
      {
        bookList.map((book, i)=>{
          return(
            <div key={i}>
              <div>이미지</div>
              <div>{book.bookName}</div>
              <div>{book.bookPrice.toLocaleString()}원</div>
            </div>
          )
        })
      }
    </div>
  );
};

export default BookList;
