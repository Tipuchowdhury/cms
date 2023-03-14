import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap";
import { connect, useSelector, useDispatch } from "react-redux";
import withRouter from 'components/Common/withRouter'; ` `

import { uploadTokenForRegistration, uploadTokenForRegistrationFresh } from "store/register-new/actions";

// import images
import logo from "../../assets/images/logo-sm.png";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Recoverpw = (props) => {
  document.title = "Recover Password | Veltrix - React Admin & Dashboard Template";
  const [userToken, setUserToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userToken);
    props.uploadTokenForRegistration(userToken);
  }


  useEffect(() => {
    if (props.upload_token_loading == "Success") {
      console.log("=====token uploded successfully====")
      toast.success("Token Uploaded");
      props.uploadTokenForRegistrationFresh();
      navigate("/dashboard")
    }
  }, [props.upload_token_loading]);
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/dashboard" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div>
      <div className="account-pages my-5 pt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20 p-2">
                      Upload Token
                    </h5>
                    <Link to="/dashboard" className="logo logo-admin">
                      <img src={logo} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                    <div className="alert alert-warning mt-5" role="alert">
                      Please check your email and upload the token!
                    </div>

                    <Form className="mt-4" action="dashboard" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Label htmlFor="useremail">Token</Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="useremail"
                          placeholder="Enter token"
                          value={userToken ?? ""}
                          onChange={(e) => setUserToken(e.target.value)}
                        />
                      </div>

                      <div className="row mb-0">
                        <Col xs={12} className="text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Sumit
                          </button>
                        </Col>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link
                    to="/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Sign In here{" "}
                  </Link>{" "}
                </p>
                <p className="mb-0">
                  © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Foodi
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div> </React.Fragment>
  );
};

//export default Recoverpw;

const mapStateToProps = state => {

  const { error,
    upload_token_loading

  } = state.registerNew;

  return {
    error,
    upload_token_loading

  };
};

export default withRouter(
  connect(mapStateToProps,
    {
      uploadTokenForRegistration,
      uploadTokenForRegistrationFresh
    })(Recoverpw)
);
