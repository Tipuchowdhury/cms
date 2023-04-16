import React, { useEffect, useState } from 'react'
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, Input, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import Breadcrumbs from 'components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import withRouter from 'components/Common/withRouter'; ` `
import { connect, useSelector } from "react-redux";
import {
    getAllAdminUsersAction, getAllUsersRolesAction, userUpdateAction, userUpdateFresh, userStatusUpdateAction, userStatusUpdateFresh
} from 'store/register-new/actions';
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { Link } from 'react-router-dom';


function ManageUsers(props) {
    const user_update_state = useSelector(state => state.registerNew.user_update_loading);
    // console.log(user_update_state);
    const [modal, setModal] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);

    const toggle = () => setModal(!modal);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);
    const handleEditUser = (row) => {
        console.log(row);
        toggle()
        setRegisterInfo(prevState => ({
            first_name: row.first_name,
            last_name: row.last_name,
            present_address: row.present_address,
            permanent_address: row.permanent_address,
            mobileNumber: row.mobile_number,
            email: row.email,
            id: row._id,
            is_active: row.is_active,
        }));
    }
    const [registerInfo, setRegisterInfo] = useState({
        first_name: "",
        last_name: "",
        present_address: "",
        permanent_address: "",
        mobileNumber: "",
        email: "",
        id: null,
        is_active: true,
    })


    const [file, setFile] = useState()

    function handleChange(event) {
        // console.log(event.target.files[0])
        setFile(event.target.files[0])

    }

    const [statusItem, setStatusItem] = useState(false);

    const [role, setRole] = useState();
    const [passwordStatus, setPasswordStatus] = useState(false);
    let name, value;
    const handleInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setRegisterInfo({ ...registerInfo, [name]: value })

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        toggle();
        console.log(registerInfo);
        // console.log(role);
        if (role) {
            props.userUpdateAction(registerInfo, role);
        } else {
            toast.warning("Please select role");
        }


    }

    const handleStatusModal = (row) => {
        //  console.log(row);
        setStatusItem(row);

        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(statusItem);
        props.userStatusUpdateAction({
            ...statusItem,
            is_active: !statusItem.is_active,
        })

        // props.userStatusUpdateAction(registerInfo);
        // toggleDel();
    }
    let userData = undefined;
    if (props.get_all_user_roles_data?.length > 0) {
        userData = props.get_all_user_roles_data?.map((item, key) => (
            <option key={item._id} value={item._id}>
                {item.name}
            </option>
        ));
    }

    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={() => handleEditUser(row)}
            >
                Edit
            </Button>{" "}
            <Button
                color="danger"
                className="btn btn-danger waves-effect waves-light"
                onClick={() => handleDeleteModal(row)}
            >
                Delete
            </Button>{" "}
        </div>



    // const statusRef = (cell, row) => <Badge color={row.is_active ? "success" : "secondary"} style={{ padding: "12px" }}>{row.is_active ? "Active" : "Deactivate"}</Badge>

    const statusRef = (cell, row) => <Button color={row.is_active ? "success" : "secondary"}
        className="btn waves-effect waves-light" onClick={() => handleStatusModal(row)}>{row.is_active ? "Active" : "Deactivate"}</Button>

    const activeData = [
        {
            dataField: "first_name",
            text: "User",
            sort: true,
        },
        {
            dataField: "mobile_number",
            text: "Mobile Number",
            sort: true,
            //formatter: statusRef
        },
        // {
        //     dataField: "role_name",
        //     text: "User Type",
        //     sort: true,
        //     //formatter: actionRef,
        // },

        {
            dataField: "Status",
            text: "Status",
            sort: true,
            formatter: statusRef,
        },

        {
            dataField: "",
            text: "Action",
            sort: true,
            formatter: actionRef,
        },

    ];
    const defaultSorted = [
        {
            dataField: "name",
            order: "desc"
        }
    ];
    // console.log(props.get_all_user_data);
    // console.log(props.get_all_user_roles_data,);
    useEffect(() => {
        if (props.get_all_user_loading === false) {
            props.getAllAdminUsersAction();
        }

        if (props.get_all_user_roles_loading === false) {
            props.getAllUsersRolesAction();
        }

        if (props.user_update_loading === "Success") {
            toast.success("User Updated");
            props.userUpdateFresh();
        }

        if (props.user_status_update_loading === "Success") {
            toast.success("User Status Updated");
            toggleStatus();
            props.userStatusUpdateFresh();
        }
        if (props.user_status_update_loading === "Failed") {
            toast.error("Something went wrong");
            props.userStatusUpdateFresh();
        }
    }, [props.get_all_user_loading, props.get_all_user_roles_loading, props.user_update_loading, props.user_status_update_loading]);

    return (
        <React.Fragment>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle="Foodi" title="Users" breadcrumbItem="Manage Users" />

                    <Row>
                        <Col className="col-12">
                            <Card style={{ border: "none" }}>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Users </CardTitle>
                                        <Link to="/register">
                                            <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle}>
                                                Add User
                                            </Button>
                                        </Link>
                                    </div>

                                    {props.get_all_user_data ? props.get_all_user_data.length > 0 ? <DatatableTablesWorking products={props.get_all_user_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                {/* <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <form className="mt-1" onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="username">City Name</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter city name" required value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>{' '}
                        <Button color="primary" type='submit'>
                            Submit
                        </Button>

                    </div>

                </form>
            </ModalBody>
        </Modal> */}

                {/* ============ edit modal start=============== */}
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Edit User</ModalHeader>
                    <ModalBody>

                        <div>
                            <form className="mt-1" onSubmit={handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="first_name">First Name</label>
                                    <input type="text" className="form-control" id="first_name" placeholder="Enter username" name="first_name" onChange={handleInputs} value={registerInfo.first_name} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="last_name">Last Name</label>
                                    <input type="text" className="form-control" id="last_name" placeholder="Enter username" name="last_name" onChange={handleInputs} value={registerInfo.last_name} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="resume" >Image</label>{" "}
                                    <input type="file" className="form-control" id="resume" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="present_address">Present Address</label>
                                    <input type="text" className="form-control" id="present_address" placeholder="Enter username" name="present_address" onChange={handleInputs} value={registerInfo.present_address} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="permanent_address">Permanent Address</label>
                                    <input type="text" className="form-control" id="permanent_address" placeholder="Enter username" name="permanent_address" onChange={handleInputs} value={registerInfo.permanent_address} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="mobileNumber">Mobile Number</label>
                                    <input type="number" className="form-control" id="mobileNumber" placeholder="Enter mobile number" name="mobileNumber" onChange={handleInputs} value={registerInfo.mobileNumber} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="useremail">Email</label>
                                    <input type="email" className="form-control" id="useremail" placeholder="Enter email" name="email" value={registerInfo.email} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="Role">Role</label>
                                    {/* <Input type="select" name="role" id="exampleSelect" onChange={(e) => getRole(e)}>
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                          <option value="Super User">Super User</option>
                          <option value="Zonal Admin">Zonal Admin</option>
                          <option value="Central Admin">Central Admin</option>

                        </Input> */}
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

                                {/* <div className="mb-3">
                                    <label className="form-label" htmlFor="userpassword">Password</label>
                                    <input type="password" className="form-control" id="userpassword" placeholder="Enter password" name="password" onChange={handleInputs} required />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" htmlFor="userpassword">Confirm Password</label>
                                    <input type="password" className="form-control" id="userconfirmpassword" placeholder="Enter password" name="confirmPassword" onChange={handleInputs} required />
                                </div> */}

                                <div className="mb-3 row">
                                    <div className="col-12 text-end">
                                        <button className="btn btn-primary w-md waves-effect waves-light" type="submit">Update</button>
                                    </div>
                                </div>



                            </form>
                        </div>

                    </ModalBody>
                </Modal>
                {/* ============ edit modal ends=============== */}

                {/* ============ delete modal starts=============== */}
                {/* <Modal isOpen={modalDel} toggle={toggleDel} centered>
            <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }}>
                <div className="icon-box">
                    <i className="fa red-circle fa-trash" style={{ color: "red", fontSize: "40px" }}></i>
                </div>
                <h2>Are you sure?</h2>
            </ModalHeader>
            <ModalBody>Do you really want to delete these records? This process cannot be undone.</ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggleDel}>Cancel</Button>{' '}
                <Button color="danger" onClick={handleDelete}>Delete</Button>
            </ModalFooter>
        </Modal> */}
                {/* ============ delete modal ends=============== */}

                {/* ============ status update modal starts=============== */}
                <Modal isOpen={modalStatusUpdate} toggle={toggleStatus} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }}>
                        <div className="icon-box">
                            <i className="fa fa-exclamation-circle" style={{ color: "#DCA218", fontSize: "40px" }}></i>
                        </div>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>Do you really want to update status these records? </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleStatus}>Cancel</Button>{' '}
                        <Button color="primary" onClick={handleStatusUpdate}>Update</Button>
                    </ModalFooter>
                </Modal>
                {/* ============ status update modal ends=============== */}
            </div>
        </React.Fragment>
    )
}

//export default ManageUsers

const mapStateToProps = state => {

    const {
        get_all_user_data,
        get_all_user_error,
        get_all_user_loading,
        get_all_user_roles_data,
        get_all_user_roles_loading,

        user_update_data,
        user_update_error,
        user_update_loading,

        user_status_update_data,
        user_status_update_error,
        user_status_update_loading,

    } = state.registerNew;

    return {
        get_all_user_data,
        get_all_user_error,
        get_all_user_loading,
        get_all_user_roles_data,
        get_all_user_roles_loading,

        user_update_data,
        user_update_error,
        user_update_loading,

        user_status_update_data,
        user_status_update_error,
        user_status_update_loading,

    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            getAllAdminUsersAction,
            getAllUsersRolesAction,
            userUpdateAction,
            userUpdateFresh,
            userStatusUpdateAction,
            userStatusUpdateFresh
        })(ManageUsers)
);
