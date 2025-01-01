import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "saga/post";
import shortid from "shortid";
import produce from "immer";
import { faker } from "@faker-js/faker";

faker.seed(123);
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "dongil",
      },
      content: "첫 번째 게시물 #안녕 #노드버드 ",
      Images: [
        {
          id: shortid.generate(),
          src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALcAwwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAIEBQYBBwj/xAA9EAABAwIDBAYIBQQCAwEAAAACAAEDBBIFESITIUFRBjEyQmGBFCNSYnGRofAzcrHB0SSC4fFTkhU0ogf/xAAZAQADAQEBAAAAAAAAAAAAAAABAwQCAAX/xAAhEQACAgMBAAMBAQEAAAAAAAAAAQIRAxIhMRMiQQRhQv/aAAwDAQACEQMRAD8A9Arw0LK1QetWwrR0LK17WSqH+lcPQ/lfSOzJZJM6TuvPLjmS44pZpO6FhGuC5Yn5rqFhoGwLtqekhYRlqa4IrJLrOI7ghHEpmS5kus6iC0SfYpVq44o7AoiOCa4KW4Jjgu2OoiOCbYpZAmOCOwKIzgm2qS4pjijYKAOyGSMQoRMtJgaB5pLuSSIKPTK2fQsviE2tWVXKViztcZXqzO7RJ/PGmHaVduVeMqc0yhotJ1yWahtOnNMs0ElZruajNKntKs0Gw2a7mhMadcuCPzXc0xnXUDh2aWaakgcOSdNzTXdccOXHZNzXLlxwnZNdl1yXLkThrsmOyI7rscRSnbEJEXhvRRlkYmQiFWj4ZU2XbO34kygyxFEdpDat016jOyfhFtSRbVxdZ1Gpqn0LP17q9qews/Xq7L4S4SMzpIbOlcoyuwiWaHcu3IUcPYk69CuXc0KCGaUl1p0FnXVxxIadPaoUXJLJCkcTGqE7bqBkuZkhqEsmmXdoKrLyXdqSGp1lncK47KvadPGddqdZMdl2OCWU7YhuTsOppao7i0x8X5+DLUUVGIAI22xtw/lMhichWTKolXQ4HfqnK7wbq81cBRjEFo6R5NuRZ5NkFo6fq6j+kEftK+GGMUQzzSkxs8fs+aqqynE4rS/0rfO5AqI9BLM4moSMbIVhuHLckizt64/iko6LDX1OGymGkVQYlhM4Xfut3tRBClaKo0krpYm16RQzU/Dy+WCWL8QSH9EJb6twkTAhHUqaowDRdbb8OSkcGvSuOSLM0krY8HIO947925QKykKnP2h5ss0bsjuu/brkYFKdojctDheDjYJTjq6966jm6KeloqmqP1ERFn5N83WloOhVTKF1TUxxZ8GHN/4Vxh1NrER0/stNEOhVYMEZK5Eef+iUeRM9TdDMMiAdrtpS4u5ZZ+TI8vRbCiD/ANa3T1sT7leuhkSr+KC/ESfNkf8A0zGYjgdDRdmO74lyVfNhtKWm234Zq9riGWoLvfsq6aMgPT8F500tnXh6EJSpWyolwf8A4iLzUKbDp4u1H8lpYzstRDcTDV/HWsaI38jRj2glM7betXtPS0tPpKPaFu+HJSY4Ir9KdNF6rTw+qylRpysn0oiWoR0+HBTJ5NlF7Kr8LmGy3vItfaYafnwVePyyPJ7RDOoIztEi/wC37I0Yl2u18dyhg2vSOnmykxhr7JfFPQtolRPrXK0rKcvyokYWf5VT0kq/R6Qhu1PuZLyPhvGrZjqqr/qJPzJKLkkoi49cvL73IJGX5vBt7o+RfYppt73x4L0zzDtO5d4i+G5Gki9m1RQHX2tX7Kc3Y7XzyZZasPhQYpGPs/4VZDSDUdrSP6sr3FPwiG0VFoQuARHivPyKpF2N/UDQ4NFEe0Hs8GVsMIh3dX6IzBbb3kne/wDwmJC5SbGgNh/FXFIRWKBSx3qyiG1VYeEuUNkhTBoL8rozJON6pZOZ56XWRD7ToMtIOofP4bvv6K82I3/e/NNkg+/0UvxIp+VmVmp7NRD171HJ/wDTLS1sQ2EsvVGIS6fNTzjqUQlsOcu6lKd4fRCu0XDw4b0/uf6S302uAoJPR7i0283TZaqWql7Xq+T7lCqillPZj2W3vzdSqV7Q9Zq++apxx4Ll6WNONgDb9FNiEe1puUWna8PZFWMcGjVpH5J5O/RkpCAbQvLNYTH670qrIbvVh+q0HSPFLA9Hi7T8eSxxgoss7dFmGFKweaSWzSSh56/2kMx9lMoJxlAbuKmGGjTqV8JbI82a1ZXSxkYdr9VF20tP2iuHxzdTzEu7H81AnO/TKOzyWmjUehBEagLhtH78U+hisNRqeETP67uCs4RsAvaU2SCtMbGTpo5IetBkk/tHguXay8V2KMTPV2W680u7N1RPoS+2U4ZR7PeWcrekuGYUBDLINzDm7XZu3DhvbzUjCMVo8S/qKGpGWN+LEzuz8Wf6fNW41SI8nWaEJEVnVff9/opkL6E5MTQ03sMk13Q5jsMlGqauKKLaEXV/CxfTdcItVUDLKUI9rrfwbxVJWUZHqH5c1QYx0sGlrRp8Pgkq5599kebuWbZMzZfDeqKHp1UlL/V0UkEbFa79bC/i/wAUjLjcupD8UlH1mvibR8Otk+NxCX3fPrQ6Op9KAaiIu2OefNk6d+8KkKmNmitMiH+V2hi2stxdluHN0MJhM7SU7C7Qlt580/FP8FTi0WkckEXauu8Bd/0UDH8SKnp9IkJPubSrSYhiC5YjHq/02rtH8MNzeK3mnUTGGG0islMpTuIrifmhEnkhuoT0BiSSSIDUUdVPS/hFp9h+paHD8WuDvXcWWXZEjlKnMSHh9UyMmhMopm2equMR2Em/qfdl+qZU0vpAah+CrcNxYZbRK3+FbnVDslVHImiR43FlZEPo5l4eSKFReBKGcxHcUSlUNORh61TSm5S4URioxtjbrO19FXdKcRlw3BJ5qb8e3KPTnk78cvDrV+2HxF7Rf3OyfU4RSy08sc8e0GQcnz37n8XTMeN3Yuc1VHz7FTU0u3qsSKSuqTiN2kM3yaXNsmybezNv3eLbkXC8TqcDxD0qhjKCORrpKYDcmEdzdb7+t9zvzWsxnoBWUVWU2FkMsTk7tGZOzs375eO9VL9DcR9LGSf1e03EzE77m5urVJErR6L0Z6Q/+XpICLtHl4Zuzb8vn9Vton0f2rDdCcEKiAYyK6ze+Qt1/bLakVi6DvoJquEWtPte11LzrphjFTRU8tPFqLezPb1M/FbyrfWSy3STDxrYvWj3cs+OXLNIk6lY6CtUeVNPYZCREUk+bym2bFG7dWTtvydn4cWZEjmH0eWnpiKeeoNt75vlvzd3z63da6PojRnqnEte/cT5+Pn/ACrnB+jGGUEozRiUsrdTmTvk/hyTHliBY2EwrBqmiw+CGIrtDOTXPufwdTPRC7yv6ULA1dpOmhFTvFfRqy1wx1VH6PKMnk/Vk6kNNYYyKTjUFoXD/h1VRuRBqU7WrHxakguNY0VmxiK3NZ13JB6RH60SuLlkqmOslDvEtSe3oY/XiLu9cc1XDiMvukutiI96P5LGpvYm3CkovpcHvJLqDsa5kOZ0bJDIVwBtOVuoVc0lRLKGr4Mq6CnV1Tw7K0bV3aMuh8cWsR+3VvTiq9n1q2pB+2TMUeissuEyEEUhXB0LtyuXhE30gz01x9n98kKSjisK4R7Lt88v4ZWrMmFGjoDcjUFOMUXvHvdOqhsC5ShZBnfupiVKjHrKc3vUGpj0ENqtXprLiuQDEZQWJQTRuMmipjgvC0S1MplPS95AtKKot7rqwjuALiU0Yd6PlLgcRsBNLsIbSrgmmt0LorsXiviIvmqOAe0K09Q1wLPVA2SlapMq7ZVifKKDpFTDLEXtN1af3WLPQdq9FraaWoiLT/8AWSxGJ0UsUuq3yLNBeG/0hDIlcmENiY6yw2GuJJAzJdQoNnrLim7JFAVNhp7AuJALdA8Og1q32CbhcF+pT5YdCpjD6E0p/cgxQ3yq2hGwFHp4/tlLsWsUK6ZyTvg9iSQkSJNT6Ja4EaRPzUeoDRciU5XxCXNOTFtcCSHYFyy2NdJoKCotIhLmyJ09xiXCsH2kH4pkwD4O+b5/JnXh1fWVlfKUhSFIXO5aAevH0ypZQIRIR/u4qbhGIRVQeqK7mvAzKpAO0VvHUr3odjdZQYnAIyEUUhsBA+/rfLNB8CuntksY3iRcFExCps2UY9oyy3cGUsTviUCRiKt90A+uaVIZAlAOhdZ7EgSJkuRpDZHVJWN633lcm2i5VVW15pGTwdj9Kquin2RFB2lgMbqcTilLbwQ2b9d7M/m2a9JqoBOLUUkfi38rzzpbhpdrbl4O+9ibyZdCvGalf4VDYhEAevtHPjvdn+G5Fjno6jszj57lRWFFpErh4t1s/kgnGPaEbfDh5JjxQfgFORqNiP8AyD/2XVls5faL5uks/B/prc+haULzVq8Wi1Aw6n7xaVYjHtZREUvHCzskiZSRWRDaiEF6IAWhauK7XlEW3TscVifauC6ezrkkByYJ4k8WTs1x11JHWNMdCFTnYFpcCdGJV9cRU4bYRuy625sjddClfCq//QKD0/o5UiOqSMXkj472b+HdfPVRV1kUux2ZDHxfq/2vpKDFqatiLZyiWW525c81570s6GU1fVlUUNT6NnvKLrHPm3Ja2QNX4eUSTShEVtxFy5q/6AUpV+MQXRlbGV8nJsup/nkpsPRAfSCGfEKcR9wmd/k62nR2kwrA4vR6SQSlkJrjcmcjflu4IOXDSgzYAdgIFO5SmUndct3V1KgDGixLFSw2AZBGLfKe5nffllk/Vv61p4gsBKbtm6pBO4mOyMwLhRoONgTAkN4e8qyePWrUhsUSdu8lTiNgyqryIYtQj8WXmfSCUjqCunIfctZ/PNl6Zi1SUVOV0dy8uxxoKirIoh2crZ3Rvuz8WfisJdGIpTi9676ITxI6SNhoi7JJSskkdjqPoyijvBW9PCIKLh8ei5WLKjFClZJllbGuhkjOyY4prFg2T70wmTHKxZODZruajjIis644IhTR7UCEuy+5+tv0T2dIlwUzy3FhLo3jcElIJDBPVMEgOWlgdnZ/LN8/JVeNUkvppCMklr731P8AH916P0hwaLFaQo+zKxMUZ8ibqz8F5/VYjLhp+i9IqSSCUNI1FrvGbcHzbiglRbhnBtqX6Uj4aP8AcrnDG/8AGh6VbdIBM48M34Nnw35Jj4rgvaKrh8jR6Wnn6QnBHSDJFh8ZMUk7i7bTLqYc9788/gi2NlLHGLp2W3RGhlA5aqrj/qZN8nV1u+b9S1wD7KBSwiAaVLYUuKIZsSV3tLrLhMtmAZt7qiTh7KkEVv5VBqqgT09mRurxWZGolTiXrQIef3vZecY/hcsUpSdod/kvSS1nqVPjdKJxEXd/LmkUPUjy92XMlJrwGKUvpl1KOzrDQwSSSSAT6hg0gjsSSSvR579HZrjpJIgGuyYQpJIHA8k5JJcE4xJX3aRSSQOOE2hRK2igq4tnNGMkbjvYhZ2fnudJJczSKUeiWDRS7QMPhZ+BcW8W5OrUKYQC0QFJJZDYtnb/AAnikkuAJ2THJJJE4jTl7Spqhivt5fouJJcjURtqgYg/qi+/nzSSWTZ5x0gs2xPba/JupUjEkksSGx8FekkkhQT/2Q==",
        },
        {
          id: shortid.generate(),
          src: "data:image/jpeg;base64,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",
        },
        {
          id: shortid.generate(),
          src: "data:image/jpeg;base64,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",
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickName: "bia",
          },
          content: "너무 귀엽군요",
        },
        {
          id: shortid.generate(),

          User: {
            id: shortid.generate(),
            nickName: "bia22",
          },
          content: "너무 귀엽군요22",
        },
        {
          id: shortid.generate(),

          User: {
            id: shortid.generate(),
            nickName: "bia33",
          },
          content: "너무 귀엽군요33",
        },
      ],
    },
  ],
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
};

initialState.mainPosts = initialState.mainPosts.concat(
  Array(20)
    .fill()
    .map((v, i) => ({
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
    }))
);
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
