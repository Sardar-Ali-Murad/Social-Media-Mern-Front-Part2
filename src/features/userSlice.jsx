import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"

let initialState={
    isLoading:false,
    showAlert:false,
    alertType:"",
    alertText:"",
    user:JSON.parse(localStorage.getItem("user")) || null,
    token:JSON.parse(localStorage.getItem("token")) || "",
    postImage:"",
    Posts:[],
    singleUser:{},
    singleUserPosts:[],
    singleUserId:"",
    light:JSON.parse(localStorage.getItem("light")) || false
}
import {setupUserLogin,postImage,uploadPost,getAllPosts,createComment,heartResponse,updateUser,getCurrentUser,getSingleUser}  from "./userThunk"

export const setupUserLoginApi=createAsyncThunk("user/setupUserLogin",async(data,thunkAPI)=>{
    return setupUserLogin(data,"login",thunkAPI)
})


export const setupUserRegisternApi=createAsyncThunk("user/setupUserRegister",async(data,thunkAPI)=>{
    return setupUserLogin(data,"register",thunkAPI)
})


// This is needed if we are doing this in the backend
export const uploadImage=createAsyncThunk("user/postImage",async(event,thunkAPI)=>{
    return postImage(event,thunkAPI)
})

export const post=createAsyncThunk("user/uploadPost",async(title,thunkAPI)=>{
    return uploadPost(title,thunkAPI)
})

export const getPosts=createAsyncThunk("user/getAllPosts",getAllPosts)

export const postComment=createAsyncThunk("user/createComment",async(props,thunkAPI)=>{
  return createComment(props.postId,props.comment,thunkAPI)
})

export const like=createAsyncThunk("user/heartResponse",async(postId,thunkAPI)=>{
  return heartResponse(postId,thunkAPI)
})

export const userUpdate=createAsyncThunk("user/updateUser",async(friendId,thunkAPI)=>{
  return updateUser(friendId,thunkAPI)
})

export const currentUser=createAsyncThunk("user/getCurrentUser",getCurrentUser)


export const singleUser=createAsyncThunk("user/getSingleUser",async(id,thunkAPI)=>{
  return getSingleUser(id,thunkAPI)
})

function addLightToLocalStorage(status){
  localStorage.setItem("light",JSON.stringify(status))
}

function addUserToLocalStorage(user,token){
   localStorage.setItem("user",JSON.stringify(user))
   localStorage.setItem("token",JSON.stringify(token))
}

function addUserOnlyToLocalStorage(user){
  localStorage.setItem("user",JSON.stringify(user))
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
       removeAlert:(state)=>{
         state.isLoading=false
         state.alertText="",
         state.alertType="",
         state.showAlert=false
       },
       logoutUser:(state)=>{
        state.user=null
        state.token=""
       },
       deleteImage:(state)=>{
        state.postImage=""
       },
       getSingleUserId:(state,action)=>{
        state.singleUserId=action.payload.id
       },
       changeLight:(state)=>{
          state.light=!state.light
          addLightToLocalStorage(state.light)
       }
    },
    extraReducers:{
        [setupUserLoginApi.pending]:(state)=>{
          state.isLoading=true
        },
        [setupUserLoginApi.fulfilled]:(state,{payload})=>{
          state.user=payload.user
          state.token=payload.token
          state.isLoading=false
          state.showAlert=true
          state.alertType="success"
          state.alertText="Login Success! Redirecting"
          addUserToLocalStorage(payload.user,payload.token)
        },
        [setupUserLoginApi.rejected]:(state,{payload})=>{
          state.isLoading=false
          state.showAlert=true
          state.alertType="danger"
          state.alertText=payload
        },
        [setupUserRegisternApi.pending]:(state)=>{
          state.isLoading=true
        },
        [setupUserRegisternApi.fulfilled]:(state,{payload})=>{
          state.user=payload.user
          state.token=payload.token
          state.isLoading=false
          state.showAlert=true
          state.alertType="success"
          state.alertText="Login Success! Redirecting"
          addUserToLocalStorage(payload.user,payload.token)
        },
        [setupUserRegisternApi.rejected]:(state,{payload})=>{
          state.isLoading=false
          state.showAlert=true
          state.alertType="danger"
          state.alertText=payload
        },
        [uploadImage.fulfilled]:(state,{payload})=>{
          console.log(payload)
            state.postImage=payload.data.secure_url
            state.isLoading=false
        },
        [uploadImage.pending]:(state)=>{
          state.isLoading=true
        },
        // [uploadImage.rejected]:(state,props)=>{
        //   console.log(props)
        //   state.isLoading=false
        // },
        [getPosts.fulfilled]:(state,{payload})=>{
          state.Posts=payload.Posts
          state.isLoading=false
        },
        [getPosts.pending]:(state,{payload})=>{
            state.isLoading=true
        },
        [getPosts.rejected]:(state,props)=>{
          console.log(props)
          state.isLoading=false
        },
        [post.fulfilled]:(state)=>{
          state.postImage=""
        },
        [postComment.rejected]:(state,{payload})=>{
          
          state.showAlert=true
          state.alertText=payload
          state.alertType="danger"
        },
        [postComment.fulfilled]:(state,{payload})=>{
          state.showAlert=true
          state.alertText=payload.msg
          state.alertType="success"
        },

        [currentUser.rejected]:(state,payload)=>{
          console.log(payload)
        },
        [currentUser.fulfilled]:(state,{payload})=>{
          state.user=payload.user
          addUserOnlyToLocalStorage(payload.user)
        },

        [singleUser.rejected]:(state,payload)=>{
           console.log(payload)
        },

        [singleUser.fulfilled]:(state,{payload})=>{
          state.singleUser=payload.user
          state.singleUserPosts=payload.userPosts
        },
        [post.rejected]:(state,{payload})=>{
          state.showAlert=true
          state.alertText=payload
          state.alertType="danger"
        },
        [post.fulfilled]:(state)=>{
          state.showAlert=true
          state.alertText="The Post is added successfully"
          state.alertType="success",
          state.postImage=""
        }
        
    }
})

export const {removeAlert,logoutUser,deleteImage,getSingleUserId,changeLight} = userSlice.actions

export default userSlice.reducer