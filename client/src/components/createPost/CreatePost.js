import React, { useState, useContext, useEffect } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";
import NewPostForm from "../newpostform/NewPostForm";
import { SocialContext } from "../../context/Context";

export default function CreatePost({
  staticModal,
  setStaticModal,
  data,
  toggleShow,
  addNewPost,
}) {
  const { state } = useContext(SocialContext);

  const [post, setPost] = useState({
    author: state.user._id,
    title: "",
    text: "",
    image: {},
  });
  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setPost({ ...post, image: e.currentTarget.files[0] });
      return;
    }
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    console.log("Level 1");
  };

  const createPost = () => {
    console.log(post);
    const formData = new FormData();
    formData.set("text", post.text);
    formData.set("title", post.title);
    if (post.image) formData.set("image", post.image);
    addNewPost(formData);
  };

  return (
    <>
      <MDBModal
        staticBackdrop
        tabIndex="-1"
        show={staticModal}
        setShow={setStaticModal}
      >
        <MDBModalDialog size="xl">
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>New Post</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <NewPostForm
                data={data}
                updatePost={handleInputChange}
                post={post}
              />
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleShow}>
                Cancel
              </MDBBtn>
              <MDBBtn onClick={createPost}>Create Post</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
