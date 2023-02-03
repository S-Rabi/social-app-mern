import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

function ChangePass() {
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const { token } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    password: "",
    retypepassword: "",
  });

  const handleSubmit = async () => {
    if (!data.password || data.password !== data.retypepassword)
      return alert("Passwords do not match");

    const response = await axios.post(baseUrl + "/users/changepassword", {
      token,
      password: data.password,
    });

    console.log("getData changepass~ response", response);

    if (response.data.success) {
      alert("Password changed successfully");
      navigate("/");
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
                label="Password"
                id="form2"
                type="password"
                name="password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                className="mb-2"
              />
              <MDBInput
                wrLoginerClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                name="password"
                value={data.retypepassword}
                onChange={(e) =>
                  setData({ ...data, retypepassword: e.target.value })
                }
                className="mb-2"
              />

              <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>
                Submit
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ChangePass;
