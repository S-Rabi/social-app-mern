import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegistrationCard.css";

function RegistrationCard() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post(baseUrl + "/users/register", data, {
        withCredentials: true,
      });
      console.log("handleRegister ~ response", response);

      if (response.data.success) {
        navigate("/");
      } else {
        if (response.data.errorId === 2)
          alert("Username must be more than 2 characters");
      }
    } catch (error) {
      console.log("🚀 ~ error", error.message);
    }
  };

  return (
    <MDBContainer fluid className="my-5 registration">
      <MDBRow className="g-0 align-items-center">
        <MDBCol className="mw-50 ">
          <MDBCard
            className="my-5 cascading-right"
            style={{
              background: "hsla(0, 0%, 100%, 0.55)",
              backdropFilter: "blur(30px)",
            }}
          >
            <MDBCardBody className="p-5 shadow-5 text-center">
              <h2 className="fw-bold mb-5">Sign up now</h2>

              <MDBInput
                wrapperClass="mb-4"
                label="username"
                id="form1"
                type="text"
                name="username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Email"
                id="form2"
                type="email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form3"
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="d-flex justify-content-center mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Subscribe to our newsletter"
                />
              </div>
              <MDBBtn className="w-100 mb-4" size="md" onClick={handleRegister}>
                sign up
              </MDBBtn>
              <div className="text-center">
                <p>or sign up with:</p>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266F1" }}
                >
                  <MDBIcon fab icon="facebook-f" size="sm" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266F1" }}
                >
                  <MDBIcon fab icon="twitter" size="sm" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266F1" }}
                >
                  <MDBIcon fab icon="google" size="sm" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  color="none"
                  className="mx-3"
                  style={{ color: "#1266F1" }}
                >
                  <MDBIcon fab icon="github" size="sm" />
                </MDBBtn>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol col="6">
          <img
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNvY2lhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            className=" mh-100 rounded-4 shadow-4 "
            alt=""
            fluid
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default RegistrationCard;
