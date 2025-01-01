import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../reducers/post";
const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useState("");
  const imageInput = useRef();
  const dispatch = useDispatch();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
    // setText("");// 서버에서 코멘트 작성 완료 신호가 올 때  초기화할 수 있게 만들어야 한다.
  }, [text]);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  return (
    <Form
      sytle={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          ref={imageInput}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="sumbit">
          짹짹
        </Button>
      </div>
      <div>
        {(imagePaths || []).map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
          </div>
        ))}
      </div>
    </Form>
  );
};
export default PostForm;
