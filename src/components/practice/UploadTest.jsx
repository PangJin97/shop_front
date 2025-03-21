import axios from "axios";
import React, { useState } from "react";

const UploadTest = () => {
  //인풋 태그 타입을 파일로
  //onChange에서파일들의 모든 정보는 e.target.file로 볼 수 있다
  //내가 넣은 파일 확인하려면 e.target.file[0]

  //post의 3번째 매개변수에서 설정
  //문자로 해석하지 않고 첨부파일도 잘 해석하게 하는 명령어

  //그냥 자바로 가져가지 않고 formData는 첨부파일도
  //가져갈 수 있는 만능 박스 객체

  // =======================================

  // 먼저 첨부파일 input 태그에서 선택한 파일을 저장할 변수
  const [firstFile, setFirstFile] = useState(null);

  //일반적으로 자바로 데이터를 전달할때는 문자로 전달되는데

  //자바로 데이터를 전달할 때 문자뿐만 아니라 파일 데이터도 가져간다는 것을 설정한다.

  //post() 메서드의 세번째 매개변수로 fileConfig를 전달(이거해야 파일 첨부됨 => 약속된 문법)
  const fileConfig = { headers: { "Content-Type": "multipart/form-data" } };

  const sendFile = () => {
    //다음으로 form 데이터 객체 생성
    //첨부파일 데이터를 자바로 전달하기 위해서는
    //FormData() 객체를 사용
    //=> 첨부파일, input태그 등의 모든 데이터를 자바로
    //가져갈 수 있는 객체이다
    const form = new FormData();
 
    form.append("bookName", "hong");
    form.append("bookPrice", 20);
    //2개는 form객체 테스트용

    //form 객체는 숫자 문자도 담을 수있고
    form.append("firstFile", firstFile);
    //파일도 담을 수 있다.
    //그래서 자바로 전달하기 위해 form객체를 사용한다. 
   
    axios
      .post(
        "/api/test/upload1", //url
        form, // 전달할 데이터
        fileConfig //설정할 내용
      )
      .then()
      .catch();
  };

  //===========================================
  //선택한 여러파일을 저장할 변수
  //다중 전송 
  const [secondFiles, setSecondFiles] = useState(null);


  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          //e.target.files : 선택한 파일들의 정보
          console.log(e.target.files);
          //올린 파일들
          console.log(e.target.files[0]);
          //파일들 중 첫번째 만 선택

          //files 자료형은 기본적으로 배열이다

          //파일을 선택할때 마다 선택한 파일을 firstFile에 저장한다.
          setFirstFile(e.target.files[0]);
        }}

        //multiple //=> 이 속성을 사용하면 한번에 여러 파일 선택 가능
      />
      <button
        type="button"
        onClick={(e) => {
          sendFile();
        }}
      >
        파일전송1
      </button>
      <br />
     
      {/* 다중 파일전송 */}
      <input type="file" multiple
        onChange={(e)=>{setSecondFiles(e.target.files)}} />
      <button type="button" onClick={(e)=>{
        
        const form2 = new FormData();

        //파일 첨부를 했을 때만
        if(secondFiles != null){
          //첨부한 파일 갯수만큼 formData에 저장
          for(const eachFile of secondFiles){
            form2.append('files',eachFile)
          }
        } 
        axios.post('/api/test/upload2',form2,fileConfig).then().catch()
      }}>다중 파일 전송</button>
    </div>
  );
};

export default UploadTest;
