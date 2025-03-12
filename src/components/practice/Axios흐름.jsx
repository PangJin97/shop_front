import axios from "axios";
import React, { useEffect, useState } from "react";

const Axios흐름 = () => {
  const [num, setNum] = useState(0);

  useEffect(() => {
    axios.get(`/api/replies/${num}`).then().catch();
  }, [num]);

  //비동기 방식으로 진행
  useEffect(() => {
    axios
      .get("api/test/1")
      .then((res) => setNum(res.data))
      .catch((error) => {
        console.log(error);
      });
    console.log("통신 후");
  }, []);

  return (
    <>
      <div>Axios흐름</div>
    </>
  );
};

export default Axios흐름;
