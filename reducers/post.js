import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "saga/post";
import shortid from "shortid";
import produce from "immer";
import { faker } from "@faker-js/faker";

faker.seed(123);
export const initialState = {
  mainPosts: [],
  imagesPaths: [],
  addPostLoading: false, //게시글 추가 로딩
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false, //게시글 추가 로딩
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false, //게시글 추가 로딩
  removePostDone: false,
  removePostError: null,
  loadPostLoading: false, //게시글 추가 로딩
  loadPostDone: false,
  loadPostError: null,
  hasMorePost: true,
};

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickName: faker.person.fullName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.url(),
        },
      ],
      Comments: [
        {
          User: {
            id: shortid.generate(),
            nickName: faker.person.fullName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

// initialState.mainPosts = initialState.mainPosts.concat(generateDummyPost(10));
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummy_post = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickName: "dongil",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: "더미 데이터입니다",
  User: {
    id: 1,
    nickName: "dongil",
  },
});

//리덕스는 이전 상태를 액션을 통해 다음 상태로 만들어내는 함수
const post = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummy_post(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        // const postIndex = state.mainPosts.findIndex(
        //   (v) => v.id === action.data.postId
        // ); //postid찾기
        // const post = { ...state.mainPosts[postIndex] }; //post내용 얕은 복사
        // post.Comments = [dummyComment(action.data.comment), ...post.Comments]; //해당글의 댓글에 더미 데이터 넣기
        // const mainPosts = [...state.mainPosts]; //mainPosts얕은 복사
        // mainPosts[postIndex] = post; //mainPosts의 포스트번호에 더미데이터를 넣은 댓글 넣기
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default post;
