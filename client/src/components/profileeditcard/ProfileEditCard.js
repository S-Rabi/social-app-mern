import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
  MDBInput,
  MDBTextArea,
} from "mdb-react-ui-kit";

import { Button } from "semantic-ui-react";

import "./profileEditCard.css";
import axios from "axios";
import { useContext, useState } from "react";
import { SocialContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import ChipMultipleSelect from "../chipmultipleselect/ChipMultipleSelect";
import { useEffect } from "react";

export default function PersonalProfile() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const { state, dispatch } = useContext(SocialContext);

  useEffect(() => {
    if (!state.user._id) navigate("/");
  }, []);

  const [fileData, setFiledata] = useState({
    url:
      state?.user?.image ||
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp",
    file: null,
  });

  const [data, setData] = useState({
    name: state?.user?.name,
    title: state?.user?.title,
    email: state?.user?.email,
    phone: state?.user?.phone,
    about: state?.user?.about,
    likes: state?.user?.likes || [],
    facebook: state?.user?.facebook,
    twitter: state?.user?.twitter,
    instagram: state?.user?.instagram,
    username: state?.user?.username,
  });

  const handleSave = async () => {
    const formdata = new FormData();

    formdata.set("name", data.name);
    formdata.set("title", data.title);
    formdata.set("email", data.email);
    formdata.set("phone", data.phone);
    formdata.set("about", data.about);
    formdata.set("likes", JSON.stringify(likes));
    formdata.set("facebook", data.facebook);
    formdata.set("twitter", data.twitter);
    formdata.set("instagram", data.instagram);

    formdata.set("username", data.username);

    if (fileData.file) formdata.set("image", fileData.file, "profileImage");

    const config = {
      Headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    };

    const response = await axios.post(
      baseUrl + "/users/profile",
      formdata,
      config
    );
    console.log("handleSave ~ response:", response);

    if (response.data.success)
      dispatch({
        type: "saveProfile",
        payload: response.data.user,
      });
    navigate("/viewprofile/myprofile");
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageChange = (e) => {
    console.log(" handleImageChange ~ e", e.currentTarget.files[0]);

    setFiledata({
      url: URL.createObjectURL(e.currentTarget.files[0]),
      file: e.currentTarget.files[0],
    });
  };
  const [likes, setLikes] = useState(state?.user?.likes || []);

  // const setLikes = (e) => {
  //   setData({
  //     ...data,
  //     hobbies: e.target.value,
  //   });
  // };

  return (
    <section className="vh-100" style={{ backgroundColor: "#F4F5F7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                  style={{
                    borderTopLeftRadius: ".5rem",
                    borderBottomLeftRadius: ".5rem",
                  }}
                >
                  <label className="">
                    <MDBCardImage
                      src={fileData.url}
                      alt="Avatar"
                      className="my-5  rounded-circle hover-opacity-75 cursor-pointer"
                      style={{
                        width: "120px",
                        height: "120px",
                      }}
                      fluid
                    />
                    <MDBInput
                      type="file"
                      className="d-none"
                      onChange={handleImageChange}
                    />
                  </label>
                  <MDBTypography tag="h5">{data.name}</MDBTypography>
                  <MDBTypography tag="h5" className="m-auto w-75 ">
                    <MDBInput
                      tag="h5"
                      label="name"
                      id="name"
                      type="text"
                      className="text-center "
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </MDBTypography>
                  <MDBCardText>{data.title}</MDBCardText>
                  <MDBTypography tag="h5" className="m-auto w-75 ">
                    <MDBInput
                      tag="h5"
                      label="title"
                      id="title"
                      type="text"
                      className="text-center w-75"
                      name="title"
                      value={data.title}
                      onChange={handleChange}
                    />
                  </MDBTypography>
                  <MDBIcon
                    far
                    icon="save mb-5"
                    className="mt-3 hover-opacity-75"
                    style={{ cursor: "pointer" }}
                    onClick={handleSave}
                  />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information</MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.email}
                        </MDBCardText>
                        <MDBInput
                          label="Email input"
                          id="typeURL"
                          type="url"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone</MDBTypography>
                        <MDBCardText className="text-muted">
                          {data.phone}
                        </MDBCardText>
                        <MDBInput
                          label="Phone number input"
                          id="typeURL"
                          type="url"
                          name="phone"
                          value={data.phone}
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBTypography tag="h6">About Me</MDBTypography>

                    <MDBRow className="pt-1">
                      <MDBCol className="mb-3">
                        <MDBTextArea
                          label="Write something about yourself"
                          id="textAreaExample"
                          rows={4}
                          name="about"
                          value={data.about}
                          onChange={handleChange}
                        />
                      </MDBCol>
                    </MDBRow>
                    <ChipMultipleSelect setLikes={setLikes} likes={likes} />

                    <div className="mb-5 d-flex flex-column gap-2">
                      <MDBIcon
                        fab
                        icon="facebook me-3"
                        size="lg"
                        className="m-2"
                      />

                      <MDBInput
                        label="Facebook URL"
                        id="typeURL"
                        type="url"
                        name="facebook"
                        value={data.facebook}
                        onChange={handleChange}
                      />

                      <MDBIcon
                        fab
                        icon="twitter me-3"
                        size="lg"
                        className="m-2"
                      />

                      <MDBInput
                        label="Twitter URL"
                        id="typeURL"
                        type="url"
                        name="twitter"
                        value={data.twitter}
                        onChange={handleChange}
                      />

                      <MDBIcon
                        fab
                        icon="instagram me-3"
                        size="lg"
                        className="m-2"
                      />

                      <MDBInput
                        label="Instragram URL"
                        id="typeURL"
                        type="url"
                        name="instagram"
                        value={data.instagram}
                        onChange={handleChange}
                      />
                    </div>
                    <Button className="ms-auto w-50" onClick={handleSave}>
                      Save
                    </Button>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
