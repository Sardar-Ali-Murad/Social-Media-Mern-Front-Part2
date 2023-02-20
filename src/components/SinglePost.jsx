import React from "react";
import Card from "@mui/material/Card";
import moment from "moment";
import { BsPeople } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import { postComment } from "../features/userSlice";
import Alert from "./Alert";
import { removeAlert } from "../features/userSlice";
import { like } from "../features/userSlice";
import { AiFillHeart } from "react-icons/ai";
import { userUpdate } from "../features/userSlice";
import { FaPeopleArrows } from "react-icons/fa";
import { Link } from "react-router-dom";

const SinglePost = ({ post }) => {
  let dispatch = useDispatch();
  let [comment, setComment] = React.useState(true);
  let [commentMessage, setCommentMessage] = React.useState("");
  let { user, showAlert, alertType, alertText, light } = useSelector(
    (state) => state.store
  );
  let [alert, setAlert] = React.useState(false);
  function submit(e) {
    e.preventDefault();
    setAlert(true);
    dispatch(postComment({ postId: post._id, comment: commentMessage }));
    setTimeout(() => {
      dispatch(removeAlert());
      setAlert(false);
    }, 3000);
  }

  const date = new Date(post.createdAt)
const formattedDate = date.toLocaleDateString("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric"
})



  return (
    <Card
      className="post singleCard"
      style={{
        background: !light ? "black" : "",
        color: !light ? "white" : "",
        border: !light ? "2px solid white" : "",
      }}
    >
      <div className="postFront">
        <div className="flexBox">
          <Link to={`/user/${post.user._id}`}>
            <Avatar
              sx={{ bgcolor: deepOrange[500] }}
              style={{ cursor: "pointer" }}
            >
              {post.user.firstName.slice(0, 1)[0]}
            </Avatar>
          </Link>
          <div>
            <h4>{post.user.firstName}</h4>
            <p className="date">{formattedDate}</p>
          </div>
          {!user.friends.find(
            (singleFriend) => singleFriend._id === post.user._id
          ) ? (
            <BsPeople
              className="peopleIcon icons"
              onClick={() => dispatch(userUpdate(post.user._id))}
            />
          ) : (
            <FaPeopleArrows
              className="peopleIcon icons"
              onClick={() => dispatch(userUpdate(post.user._id))}
            />
          )}
        </div>
      </div>

      <div className="postImage">
        <p>{post.title}</p>
        <img src={post.image} />
      </div>

      <div className="flexBox">
        <div>
          {post.likes.includes(user._id) ? (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <AiFillHeart
                onClick={() => dispatch(like(post?._id))}
                className="icons"
              />
              <p>{post.likes.length}</p>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <AiOutlineHeart
                onClick={() => dispatch(like(post?._id))}
                className="icons"
              />
              <p>{post.likes.length}</p>
            </div>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <BiCommentDetail
            onClick={() => setComment((pre) => !pre)}
            className="icons"
          />
          <p>{post?.comments.length}</p>
        </div>
      </div>

      {comment && (
        <div>
          <div className="myComment">
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {user.firstName.slice(0, 1)[0]}
            </Avatar>
            <form onSubmit={submit}>
              {/* <TextField value={commentMessage} <InputField
        name="title"
        value={data.title}id="standard-basic" label="Type A Comment" variant="standard" focused={!light?true:false}/> */}
              <input value={commentMessage} onChange={(e)=>setCommentMessage(e.target.value)} placeholder="Write A Comment" style={{padding:"5px",outline:"none"}}/>
            </form>
            <button className="btn" onClick={submit}>
              Submit
            </button>
          </div>
          {showAlert && alert && <Alert />}
          <div className="allComments">
            {post?.comments?.map((comment) => {
              return (
                <div className="commentBox">
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {comment.user.firstName.slice(0, 1)[0]}
                  </Avatar>
                  <p>{comment.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export default SinglePost;
