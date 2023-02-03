import axios from "axios";
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
import "./ForgotPass.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForgotPass() {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const [data, setData] = useState({
    emailOrUsername: "",
  });

  const handleSubmit = async () => {
    const response = await axios.post(baseUrl + "/users/forgotpass", data);
    console.log(" handleSubmit-forgotpass ~ response:", response);

    if (response.data.success)
      alert(
        "We have sent you an email with instructions about how to change your password"
      );
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
                className=""
                wrLoginerClass="mb-4"
                label="EmailOrUsername"
                id="form1"
                type="email"
                name="emailOrUsername"
                value={data.emailOrUsername}
                onChange={(e) =>
                  setData({ ...data, emailOrUsername: e.target.value })
                }
              />

              <MDBBtn className="mb-4 w-100" onClick={handleSubmit}>
                Submit
              </MDBBtn>

              <p className="mx-1 mt-1"> Registered? Login:</p>
              <Link to="/">
                <MDBBtn className="mb-4 w-100">Login</MDBBtn>
              </Link>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default ForgotPass;
