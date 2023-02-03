import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import "./LoginCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { SocialContext } from "../../context/Context";

function Login() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const { dispatch } = useContext(SocialContext);

  const navigate = useNavigate();

  const [data, setData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const handleLogin = async () => {
    const response = await axios.post(baseUrl + "/users/login", data, {
      withCredentials: true,
    });
    console.log("handleLogin response:", response);

    if (response.data.success) {
      dispatch({
        type: "saveProfile",
        payload: response.data.user,
      });

      navigate("/home");
    }
  };

  return (
    <MDBContainer className="my-5 login">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHNvY2lhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>
          <MDBCol md="8">
            <MDBCardBody>
              <MDBInput
                wrLoginerClass="mb-4"
                label="EmailOrUsername"
                id="form1"
                type="email"
                name="emailOrUsername"
                value={data.emailOrUsername}
                onChange={(e) =>
                  setData({ ...data, emailOrUsername: e.target.value })
                }
                className="mb-2"
              />
              <MDBInput
                wrLoginerClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <Link to="/forgotpass">
                  <MDBBtn className="m-1">Forgotpass?</MDBBtn>
                </Link>
              </div>
              <MDBBtn className="mb-4 w-100" onClick={handleLogin}>
                Log in
              </MDBBtn>

              <p className="mx-4 mt-1">New User? Sign up for a new account:</p>
              <Link to="/register">
                <MDBBtn className="mb-4 w-100">Sign Up</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}
export default Login;
