import React, { useEffect, useState } from "react"
// Redux
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, CardBody, Card, Container } from "reactstrap"
// import images
import logoSm from "../../assets/images/logo-sm.png"
import { connect, useSelector, useDispatch } from "react-redux"
import withRouter from "components/Common/withRouter"
import { userLogin, userLoginFresh } from "store/actions"
import { toast } from "react-toastify"

const Login = props => {
  document.title = "Login | Foodi"
  const [loginInfo, setLogInInfo] = useState({
    email: "",
    password: "",
  })
  console.log(props.login_loading)
  const navigate = useNavigate()
  let name, value
  const handleInputs = e => {
    console.log(e)
    name = e.target.name
    value = e.target.value
    setLogInInfo({ ...loginInfo, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(loginInfo)
    props.userLogin(loginInfo)
  }

  useEffect(() => {
    if (props.login_loading == "Success") {
      console.log("=====registration success====")
      toast.success("Login Successful")
      props.userLoginFresh()
      //localStorage.setItem("user", token);
      navigate("/dashboard")
    }
  }, [props.login_loading])
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
                    <h5 className="text-white font-size-20">Welcome Back !</h5>
                    <p className="text-white-50">
                      Sign in to continue to Foodi.
                    </p>
                    <Link to="/" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                    <form className="mt-4" action="#" onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="username">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="username"
                          placeholder="Enter username"
                          name="email"
                          value={loginInfo.email}
                          onChange={handleInputs}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="userpassword"
                          placeholder="Enter password"
                          name="password"
                          value={loginInfo.password}
                          onChange={handleInputs}
                          required
                        />
                      </div>

                      <div className="mb-3 row">
                        <div className="col-sm-6">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customControlInline"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customControlInline"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-6 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/password-recover-email">
                            <i className="mdi mdi-lock"></i> Forgot your
                            password?
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-5 text-center">
                {/* <p>
                  Don't have an account ?{" "}
                  <Link
                    to="/register"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p> */}
                <p className="mb-0">
                  © {new Date().getFullYear()} Foodi. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger"></i> by Foodi
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

//export default Login;

const mapStateToProps = state => {
  const { error, login_data, login_error, login_loading } = state.Login
  return {
    error,

    login_data,
    login_error,
    login_loading,
  }
}

export default withRouter(
  connect(mapStateToProps, {
    userLogin,
    userLoginFresh,
  })(Login)
)
