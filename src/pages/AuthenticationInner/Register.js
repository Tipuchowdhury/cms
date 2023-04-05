import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, CardBody, Card, Container, Alert, Input, CardTitle } from "reactstrap";

// import images
import logoSm from "../../assets/images/logo-sm.png";
//redux
import { connect, useSelector, useDispatch } from "react-redux";
import withRouter from 'components/Common/withRouter'; ` `
//import { userRegistration, dataForTesting } from "store/actions";
import { userRegistrationNew, userRegistrationFresh, getAllUsersRolesAction } from "store/register-new/actions";
// import toastr from "toastr";
// import "toastr/build/toastr.min.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from 'components/Common/Breadcrumb';
import Select from "react-select";

const Register = (props) => {
  document.title = "Register | Foodi";

  const [registerInfo, setRegisterInfo] = useState({
    first_name: "",
    last_name: "",
    present_address: "",
    permanent_address: "",
    mobileNumber: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  })
  const [file, setFile] = useState()

  function handleChange(event) {
    console.log(event.target.files[0])
    console.log("nooooooooooooooo")
    setFile(event.target.files[0])

  }

  const [role, setRole] = useState();
  const [passwordStatus, setPasswordStatus] = useState(false);
  const navigate = useNavigate();
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setRegisterInfo({ ...registerInfo, [name]: value })

  }
  // const getRole = (e) => {
  //   console.log(e.target.value)
  //   setRole(e.target.value)
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registerInfo);
    console.log(role);
    if (registerInfo.password === registerInfo.confirmPassword) {

      console.log(registerInfo)
      console.log(file)
      console.log(role)

      props.userRegistrationNew(registerInfo, file, role);
      //props.dataForTesting();
    } else {
      setPasswordStatus(true);
      setTimeout(() => {
        setPasswordStatus(false);
      }, "3000")

    }
    setRole();

  }
  let userData = undefined;
  if (props.get_all_user_roles_data?.length > 0) {
    userData = props.get_all_user_roles_data?.map((item, key) => (
      <option key={item._id} value={item._id}>
        {item.name}
      </option>
    ));
  }

  console.log(props.get_all_user_roles_data);
  console.log(userData);
  useEffect(() => {
    if (props.registration_loading == "Success") {
      console.log("=====registration success====")

      toast.success("Submitted");
      props.userRegistrationFresh();
      navigate("/upload-token")

    }

    if (props.registration_loading == "Failed") {
      console.log("=====registration failed====")
      toast.error("Registration Failed");
      props.userRegistrationFresh();

    }

    if (props.get_all_user_roles_loading === false) {
      props.getAllUsersRolesAction();
    }
  }, [props.registration_loading, props.registration_data]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs maintitle="Foodi" title="Users" breadcrumbItem="Add New User" />

          <Row>
            <Col className="col-12">
              <Card style={{ border: "none" }}>
                <CardBody>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                    <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Add a New User </CardTitle>

                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Row>
        <Col className="col-10 mx-auto">
          <form className="mb-4" onSubmit={handleSubmit}>
            {passwordStatus ? <Alert color="warning">
              <strong>Warning!</strong> Password didn't match. Please check.
            </Alert> : ""}

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                First Name
              </label>
              <div className="col-md-10">
                <input type="text" className="form-control" id="first_name" placeholder="Enter username" name="first_name" onChange={handleInputs} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Last Name
              </label>
              <div className="col-md-10">
                <input type="text" className="form-control" id="last_name" placeholder="Enter username" name="last_name" onChange={handleInputs} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Image
              </label>
              <div className="col-md-10">
                <input type="file" className="form-control" id="resume" onChange={handleChange} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Present Address
              </label>
              <div className="col-md-10">
                <input type="text" className="form-control" id="present_address" placeholder="Enter username" name="present_address" onChange={handleInputs} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Permanent Address
              </label>
              <div className="col-md-10">
                <input type="text" className="form-control" id="permanent_address" placeholder="Enter username" name="permanent_address" onChange={handleInputs} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Mobile Number
              </label>
              <div className="col-md-10">
                <input type="number" className="form-control" id="mobileNumber" placeholder="Enter mobile number" name="mobileNumber" onChange={handleInputs} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Email
              </label>
              <div className="col-md-10">
                <input type="email" className="form-control" id="useremail" placeholder="Enter email" name="email" onChange={handleInputs} />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Role
              </label>
              <div className="col-md-10">
                <Input
                  id="exampleSelect"
                  name="manager"
                  value={role}
                  required={true}
                  onChange={e => setRole(e.target.value)}
                  type="select"
                >
                  <option>Choose...</option>
                  {userData}
                </Input>
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Password
              </label>
              <div className="col-md-10">
                <input type="password" className="form-control" id="userpassword" placeholder="Enter password" name="password" onChange={handleInputs} required />
              </div>
            </Row>

            <Row className="mb-3">
              <label
                htmlFor="example-text-input"
                className="col-md-2 col-form-label"
              >
                Confirm Password
              </label>
              <div className="col-md-10">
                <input type="password" className="form-control" id="userconfirmpassword" placeholder="Enter password" name="confirmPassword" onChange={handleInputs} required />
              </div>
            </Row>

            <div className="mb-3 row">
              <div className="col-12 text-end">
                <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
              </div>
            </div>

            <div className="mt-2 mb-0 row">
              <div className="col-12 mt-4">
                <p className="mb-0">By registering you agree to the Foodi <Link to="#" className="text-primary">Terms of Use</Link></p>
              </div>
            </div>

          </form>
        </Col>
      </Row>
      {/* <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={7} >
              <Card className="overflow-hidden">
                <CardBody className="p-4">
                  <div className="p-3">
                    <form className="mt-4" onSubmit={handleSubmit}>
                      {passwordStatus ? <Alert color="warning">
                        <strong>Warning!</strong> Password didn't match. Please check.
                      </Alert> : ""}
                      <div className="mb-3">
                        <label className="form-label" htmlFor="first_name">First Name</label>
                        <input type="text" className="form-control" id="first_name" placeholder="Enter username" name="first_name" onChange={handleInputs} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="last_name">Last Name</label>
                        <input type="text" className="form-control" id="last_name" placeholder="Enter username" name="last_name" onChange={handleInputs} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="resume" >Image</label>{" "}
                        <input type="file" className="form-control" id="resume" onChange={handleChange} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="present_address">Present Address</label>
                        <input type="text" className="form-control" id="present_address" placeholder="Enter username" name="present_address" onChange={handleInputs} />
                      </div>
                      <div className="mb-3">
                        <label className="form-label" htmlFor="permanent_address">Permanent Address</label>
                        <input type="text" className="form-control" id="permanent_address" placeholder="Enter username" name="permanent_address" onChange={handleInputs} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
                        <input type="number" className="form-control" id="mobileNumber" placeholder="Enter mobile number" name="mobileNumber" onChange={handleInputs} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="useremail">Email</label>
                        <input type="email" className="form-control" id="useremail" placeholder="Enter email" name="email" onChange={handleInputs} />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="Role">Role</label>

                        <Input
                          id="exampleSelect"
                          name="manager"
                          value={role}
                          required={true}
                          onChange={e => setRole(e.target.value)}
                          type="select"
                        >
                          <option>Choose...</option>
                          {userData}
                        </Input>

                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">Password</label>
                        <input type="password" className="form-control" id="userpassword" placeholder="Enter password" name="password" onChange={handleInputs} required />
                      </div>

                      <div className="mb-3">
                        <label className="form-label" htmlFor="userpassword">Confirm Password</label>
                        <input type="password" className="form-control" id="userconfirmpassword" placeholder="Enter password" name="confirmPassword" onChange={handleInputs} required />
                      </div>

                      <div className="mb-3 row">
                        <div className="col-12 text-end">
                          <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</button>
                        </div>
                      </div>

                      <div className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <p className="mb-0">By registering you agree to the Foodi <Link to="#" className="text-primary">Terms of Use</Link></p>
                        </div>
                      </div>

                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Foodi. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Foodi
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div> */}
    </React.Fragment>
  );
};

const mapStateToProps = state => {

  const { error,
    registration_data,
    registration_error,
    registration_loading,

    get_all_user_roles_data,
    get_all_user_roles_loading,

  } = state.registerNew;

  return {
    error,
    registration_data,
    registration_error,
    registration_loading,

    get_all_user_roles_data,
    get_all_user_roles_loading,

  };
};

export default withRouter(
  connect(mapStateToProps,
    {
      userRegistrationNew,
      userRegistrationFresh,
      getAllUsersRolesAction
    })(Register)
);

