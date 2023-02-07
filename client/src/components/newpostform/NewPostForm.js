import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { handleImageChange } from "../../utilities/handleImageChange";

export default function NewPostForm({ data, updatePost, post }) {
  const [fileData, setFileData] = useState({
    url: "",
    file: null,
  });

  const onChange = (e) => {
    if (e.currentTarget.files[0]) {
      handleImageChange(e, setFileData);
    }
    updatePost(e);
  };

  return (
    <Card className="mb-2">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {` ${data.user.name[0]}${data.user.name[5]}`}
          </Avatar>
        }
        title="Social-App"
        subheader={Date()}
      />

      <MDBInput
        tag="h5"
        label="title"
        id="title"
        type="text"
        className="text-center mb-1 text-black"
        name="title"
        value={post.title}
        onChange={updatePost}
      />

      <CardMedia
        component="img"
        height="194"
        image={
          fileData.url ||
          "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNvY2lhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        }
        alt="Post image new"
      />
      <label className="m-2 btn btn-sm">
        Add image
        <input name="image" type="file" className="d-none" onInput={onChange} />
      </label>

      <CardContent>
        <Typography variant="body2" color="text.secondary" className="">
          <MDBTextArea
            label="Write a comment"
            id="textAreaExample"
            rows={4}
            name="text"
            value={post.text}
            onChange={updatePost}
            className="  text-black"
          />
        </Typography>
      </CardContent>
    </Card>
  );
}
