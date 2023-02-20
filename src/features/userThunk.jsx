import axios from "axios";
import { getPosts, currentUser, singleUser } from "./userSlice";

// After Deployment
let BACK_URL="https://social-media-back.vercel.app/"
// http://localhost:5000

// Before Deployment
// let BACK_URL="https://social-media-back.vercel.app"

export const setupUserLogin = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(
      `http://localhost:5000/api/v1/auth/${route}`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const setupUserRegister = async (data, route, thunkAPI) => {
  try {
    let props = await axios.post(
      `https://social-media-back.vercel.app/api/v1/auth/${route}`,
      data
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const postImage = async (event, thunkAPI) => {
  try {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "zkkzikta");
    let data=await axios.post("http://api.cloudinary.com/v1_1/dvaodl5k8/image/upload",formData)
    return data
  } catch (error) {
    thunkAPI.rejectWithValue(error)
  }


  // The Below is the code with the Backend
  // let token = thunkAPI.getState().store.token;

  // try {
    // const props = await axios.post(
    //   `https://social-media-back.vercel.app/api/v1/post/uploadImage`,
    //   formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //       authorization: `Bearer ${token}`,
    //     },
    //   }
    // );
    // return props.data;
  // } catch (error) {
  //   return thunkAPI.rejectWithValue(error.response.data.msg);
  // }
};

export const getAllPosts = async (_, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  try {
    let props = await axios.get(`https://social-media-back.vercel.app/api/v1/post`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getCurrentUser = async (_, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  try {
    let props = await axios.get(
      `https://social-media-back.vercel.app/api/v1/auth/getCurrentUser`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getSingleUser = async (id, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  try {
    let props = await axios.get(
      `https://social-media-back.vercel.app/api/v1/auth/getSingleUser/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUser = async (friendId, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  try {
    let props = await axios.patch(
      `https://social-media-back.vercel.app/api/v1/auth/updateUser`,
      { friendId },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(currentUser());
    thunkAPI.dispatch(singleUser(thunkAPI.getState().store.singleUserId));

    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const createComment = async (postId, comment, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  try {
    let props = await axios.post(
      `https://social-media-back.vercel.app/api/v1/comment/${postId}`,
      { comment: comment },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getPosts());
    thunkAPI.dispatch(singleUser(thunkAPI.getState().store.singleUserId));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadPost = async (title, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  let image = thunkAPI.getState().store.postImage;
  try {
    let props = await axios.post(
      `https://social-media-back.vercel.app/api/v1/post`,
      { title, image },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getPosts());
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const heartResponse = async (postId, thunkAPI) => {
  let token = thunkAPI.getState().store.token;
  try {
    let props = await axios.get(
      `https://social-media-back.vercel.app/api/v1/post/like/${postId}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    thunkAPI.dispatch(getPosts());
    thunkAPI.dispatch(singleUser(thunkAPI.getState().store.singleUserId));
    return props.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
