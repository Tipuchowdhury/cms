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
import { toast } from 'react-toastify';
import { getForgetPasswordTokenByMail, getForgetPasswordTokenByMailFresh } from "store/register-new/actions";

// import images
import logo from "../../assets/images/logo-sm.png";
import { useEffect } from "react";

const Recoverpw = (props) => {
  document.title = "Recover Password | Veltrix - React Admin & Dashboard Template";
  const [recoverEmail, setRecoverEmail] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(recoverEmail);
    props.getForgetPasswordTokenByMail(recoverEmail);
  }

  useEffect(() => {
    if (props.password_recover_token_by_mail_loading == "Success") {
      console.log("=====token uploded successfully====")
      toast.success("Token Sent Successfully");

      props.getForgetPasswordTokenByMailFresh();
      navigate("/forgot-password")
    }
  }, [props.password_recover_token_by_mail_loading]);
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
                      Get Token
                    </h5>
                    <Link to="/dashboard" className="logo logo-admin">
                      <img src={logo} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                    <div className="alert alert-warning mt-5" role="alert">
                      Please insert your email to get token!
                    </div>

                    <Form className="mt-4" action="dashboard" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <Label htmlFor="useremail">Email</Label>
                        <Input
                          type="email"
                          className="form-control"
                          id="useremail"
                          placeholder="Enter email"
                          value={recoverEmail ?? ""}
                          onChange={(e) => setRecoverEmail(e.target.value)}
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
    password_recover_token_by_mail_loading

  } = state.registerNew;

  return {
    error,
    password_recover_token_by_mail_loading

  };
};

export default withRouter(
  connect(mapStateToProps,
    {
      getForgetPasswordTokenByMail, getForgetPasswordTokenByMailFresh
    })(Recoverpw)
);
