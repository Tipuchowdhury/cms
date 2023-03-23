import React, { useState, useEffect } from "react"
import { Row, Col, CardBody, Card, Container } from "reactstrap"
// import images
import logoSm from "../../assets/images/logo-sm.png"
// Redux
import { Link, useNavigate } from "react-router-dom"
import { connect, useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
import { toast } from "react-toastify"
import { forgetPasswordAction, forgetPasswordFresh } from "store/actions"

const ForgetPasswordPage = props => {
  const [token, setToken] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const navigate = useNavigate()
  const handleSubmit = e => {
    e.preventDefault()
    if (password === confirmPassword) {
      props.forgetPasswordAction(token, password, confirmPassword)
    } else {
      toast.warning("Password didn't match")
    }
  }

  useEffect(() => {
    if (props.forget_password_loading == "Success") {
      console.log("=====password change success====")
      toast.success("Successful")
      props.forgetPasswordFresh()
      navigate("/login")
    }
  }, [props.forget_password_loading])
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
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
                      Forget Password
                    </h5>
                    <Link to="/index" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>
                <CardBody className="p-4">
                  <div className="p-3">
                    <div className="alert alert-success mt-5" role="alert">
                      Enter your Email and collect your token!
                    </div>
                    <form className="mt-4" action="#" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="token">
                          Token
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="token"
                          placeholder="Enter Token"
                          value={token ?? ""}
                          onChange={e => setToken(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter password"
                          value={password ?? ""}
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="confirmPassword">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          placeholder="Confirm Password"
                          value={confirmPassword ?? ""}
                          onChange={e => setConfirmPassword(e.target.value)}
                        />
                      </div>

                      <Row className="mb-0">
                        <Col className="col-12 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Remember It ?{" "}
                  <Link to="/login" className="fw-medium text-primary">
                    {" "}
                    Sign In here{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Foodi. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

//export default ForgetPasswordPage;

const mapStateToProps = state => {
  const { forget_password_loading } = state.Login
  return {
    forget_password_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    forgetPasswordAction,
    forgetPasswordFresh,
  })(ForgetPasswordPage)
)
