import React from "react";
import "./Post.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { BiImage } from "react-icons/bi";
import { CiMedicalClipboard } from "react-icons/ci";
import { AiOutlinePaperClip } from "react-icons/ai";
import { AiOutlineAudio } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage, getPosts } from "../features/userSlice";
import { FcDeleteColumn } from "react-icons/fc";
import { deleteImage, post } from "../features/userSlice";
import { removeAlert } from "../features/userSlice";
import Alert from "./Alert";

const Post = ({ user }) => {
  let dispatch = useDispatch();
  let props = useSelector((data) => data.store);
  function handleimage(event) {
    setAlert(true);
    dispatch(uploadImage(event));
    setTimeout(() => {}, 3000);
  }

  React.useEffect(() => {
    if (props.postImage !== "") {
      setAlert(true);
    }
  }, [props.postImage]);

  let [title, setTitle] = React.useState("");
  let [alert, setAlert] = React.useState(false);

  function postFun(e) {
    e.preventDefault()
    setAlert(true);
    dispatch(post(title));
    setTimeout(() => {
      dispatch(removeAlert());
      setAlert(false);
    }, 3000);
  }
  let ImageRef=React.useRef()

  function del(){
    dispatch(deleteImage())
    ImageRef.current.value=""
  }

  console.log(props?.postImage)
  return (
    <div>
      {props.showAlert && alert && <Alert />}
      <Card className="postMain singleCard"  style={{background:!props.light?"black":"",color:!props.light?"white":"",border:!props.light?"2px solid white":""}}>
        <div className="postStart">
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user.firstName.slice(0, 1)[0]}
          </Avatar>
          <form onSubmit={postFun} style={{width:'100%'}}>
            <input
              placeholder="What is in your mind"
              className="mind"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </div>
        <div className="lines"></div>
        <div className="postItems">
          <div className="flexBoxPost">
            {/* <BiImage/> */}
            {props.isLoading && (
              <div
                className="loading"
                style={{ height: "30px", width: "30px" }}
              ></div>
            )}
            <input
              type="file"
              className="form-font"
              id="image"
              accept="image/*"
              onChange={handleimage}
              ref={ImageRef}
            />
          </div>

          <div className="flexBoxPost">
            <AiOutlinePaperClip />
            <p>Attatments</p>
          </div>
          <div className="flexBoxPost">
            <AiOutlineAudio />
            <p>Audio</p>
          </div>
          <button className="postBtn" onClick={postFun}>
            Post
          </button>
        </div>
      </Card>
      {props.postImage && (
        <Card className="imageCard singleCard">
          <div className="imageBox">
            <img src={props?.postImage} className="image" />
            <FcDeleteColumn
              className="delIcon"
              onClick={del}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default Post;
