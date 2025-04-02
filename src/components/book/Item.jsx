import React from "react";
import { IMAGE_PATH } from "../../constant/uploadConstant";
import styles from "./Item.module.css";

const Item = ({book}) => {
  return (
    <div className={styles.bookMain}>
      <img src={`${IMAGE_PATH}/${book.imgList[0].attachedFileName}`} />
      <p>{book.bookName}</p>
      <p>{book.bookPrice.toLocaleString()}원</p>
    </div>
  );
};

export default Item;
