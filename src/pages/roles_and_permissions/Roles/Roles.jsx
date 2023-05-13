
import Breadcrumbs from 'components/Common/Breadcrumb';
import withRouter from 'components/Common/withRouter';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import {
    addRoleAction, addRoleFresh, getAllRoleAction,
    getAllRoleFresh, roleUpdateAction, roleUpdateFresh, roleDeleteAction, roleDeleteFresh, roleStatusUpdateAction, roleStatusUpdateFresh, getAllPermissionAction
} from "store/actions"
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { toast } from 'react-toastify';
import Select from "react-select";

function Roles(props) {

    document.title = "Roles | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);


    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);


    const [addInfo, setAddInfo] = useState({
        name: "",
        is_active: true
    });


    const [editInfo, setEditInfo] = useState({
        _id: "",
        name: "",
        is_active: true
    });

    const [deleteItem, setDeleteItem] = useState();

    const [newSelectedPermission, setNewSelectedPermission] = useState([]);
    const [selectedPermission, setSelectedPermission] = useState([]);

    // const [statusItem, setStatusItem] = useState({
    //     roleId: "",
    //     is_active: "",
    // });

    let allPermission = undefined;
    if (props.get_all_permission_data?.length > 0) {
        allPermission = props.get_all_permission_data?.map((item, key) => ({
            label: item.module_name, value: item._id,
        }));
    }


    let name, value, checked;
    const handleAddInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setAddInfo({ ...addInfo, [name]: value });

    }
    const handleEditInputs = (e) => {
        // console.log(e);
        name = e.target.name;
        value = e.target.value;
        setEditInfo({ ...editInfo, [name]: value });

    }

    const handleAddCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        setAddInfo({ ...addInfo, [name]: checked });
    }

    const handleEditCheckBox = (e) => {
        // console.log(e);
        name = e.target.name;
        checked = e.target.checked;
        setEditInfo({ ...editInfo, [name]: checked });
    }

    const handleSelectPermission = (e) => {
        // console.log(e)
        setSelectedPermission(e)
    }

    const handleNewSelectPermission = (e) => {
        // console.log(e)
        setNewSelectedPermission(e)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = uuidv4();

        props.addRoleAction(addInfo, newSelectedPermission);
    }

    const handleEditRole = (row) => {
        // console.log(row);

        setEditInfo(prevState => ({
            _id: row._id,
            name: row.name,
            is_active: row.is_active,
        }));
        newPerm(row.permissions);

        toggleEditModal();
    }

    const newPerm = (nn) => {
        // console.log(nn);
        // console.log(props?.get_all_branch_data);
        const common_permissions = props?.get_all_permission_data?.filter((elem) => nn?.find(({ permission_id }) => elem._id === permission_id));
        //console.log(common_restaurants);

        const permission_data_edit = common_permissions ? common_permissions.map((item, key) => {
            return { label: item.module_name, value: item._id };
        }) : "";

        setSelectedPermission(permission_data_edit);

    }



    const handleEdit = (e) => {
        e.preventDefault();
        props.roleUpdateAction(editInfo, selectedPermission);

        //toggleEditModal();

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        // console.log(deleteItem)
        props.roleDeleteAction(deleteItem);
        // toggleDel();
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);

        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(statusItem);
        props.roleStatusUpdateAction({
            ...editInfo,
            is_active: !editInfo.is_active,
        });
        // toggleDel();
    }


    const actionRef = (cell, row) =>
        <div style={{ display: "flex", gap: 10 }}>
            <Button
                color="primary"
                className="btn btn-primary waves-effect waves-light"
                onClick={() => handleEditRole(row)}
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
            dataField: "name",
            text: "Roles",
            sort: true,
        },
        {
            dataField: "",
            text: "Status",
            sort: true,
            formatter: statusRef
        },
        {
            //dataField: "he",
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

    useEffect(() => {
        if (props.get_all_permission_loading == false) {
            props.getAllPermissionAction();
        }
        if (props.get_all_role_loading == false) {
            //console.log("I am in get all permis type loading ")
            props.getAllRoleAction();
        }


        if (props.add_role_loading === "Success") {
            toast.success("Role Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                name: "",
                is_active: true
            });
            props.addRoleFresh();
        }


        if (props.add_role_loading === "Failed") {
            //console.log(props.add_role_data);
            toast.error("Something went wrong");
            props.addRoleFresh();

        }

        if (props.role_edit_loading === "Success") {
            toast.success("Role Updated");
            toggleEditModal();
            props.roleUpdateFresh();

        }

        if (props.role_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.roleUpdateFresh();

        }

        if (props.role_status_edit_loading === "Success") {
            toast.success("Role Status Updated");
            toggleStatus();
            props.roleStatusUpdateFresh();

        }

        if (props.role_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.roleStatusUpdateFresh();

        }

        if (props.role_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Role Deleted");
            toggleDel();
            props.roleDeleteFresh();

        }


    }, [props.get_all_permission_loading, props.add_role_loading, props.role_edit_loading,
    props.role_delete_loading, props.role_status_edit_loading]);

    // console.log(props.get_all_role_data);
    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle='Foodi' title='Roles & Permissions' breadcrumbItem='Roles' />
                    <Row>
                        <Col className='col-12'>
                            <Card>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Roles </CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Role
                                        </Button>
                                    </div>

                                    {props.get_all_role_data ? props.get_all_role_data.length > 0 ? <DatatableTablesWorking products={props.get_all_role_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}


                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New Role</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Role Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter role name" required name="name" onChange={handleAddInputs} value={addInfo.name} />
                            </div>


                            <div className="mb-3">
                                <label className="form-label" htmlFor="restaurants">Permissions</label>
                                <Select
                                    value={newSelectedPermission}
                                    onChange={handleNewSelectPermission}
                                    options={allPermission}
                                    isMulti={true}
                                />
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
                </Modal>
                {/* ============ create modal end=============== */}


                {/* ============ edit modal start=============== */}
                <Modal isOpen={editModal} toggle={toggleEditModal} centered={true}>
                    <ModalHeader >Edit Role</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">Role Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Enter role name" required name="name" onChange={handleEditInputs} value={editInfo.name} />
                            </div>


                            <div className="mb-3">
                                <label className="form-label" htmlFor="restaurants">Permissions</label>
                                <Select
                                    value={selectedPermission}
                                    onChange={handleSelectPermission}
                                    options={allPermission}
                                    isMulti={true}
                                />
                            </div>


                            <div style={{ display: "flex", justifyContent: "flex-end", gap: 5 }}>
                                <Button color="primary" type="submit">
                                    Submit
                                </Button>{' '}
                                <Button color="secondary" onClick={toggleEditModal}>
                                    Cancel
                                </Button>
                            </div>

                        </form>
                    </ModalBody>

                </Modal>
                {/* ============ edit modal ends=============== */}

                {/* ============ delete modal starts=============== */}
                <Modal isOpen={modalDel} toggle={toggleDel} centered>
                    <ModalHeader className="text-center" style={{ textAlign: "center", margin: "0 auto" }}>
                        <div className="icon-box">
                            <i className="fa red-circle fa-trash" style={{ color: "red", fontSize: "40px" }}></i>
                        </div>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>Do you really want to delete these records? This process cannot be undone.</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={toggleDel}>Cancel</Button>{' '}
                        <Button color="danger" onClick={handleDelete}>Delete</Button>
                    </ModalFooter>
                </Modal>
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

const mapStateToProps = state => {

    const {
        get_all_permission_data,
        get_all_permission_loading

    } = state.Permissions;

    const {
        add_role_data,
        add_role_error,
        add_role_loading,

        get_all_role_data,
        get_all_role_error,
        get_all_role_loading,

        role_edit_data,
        role_edit_loading,

        role_status_edit_data,
        role_status_edit_loading,

        role_delete_loading

    } = state.Roles;

    return {
        get_all_permission_data,
        get_all_permission_loading,

        add_role_data,
        add_role_error,
        add_role_loading,

        get_all_role_data,
        get_all_role_error,
        get_all_role_loading,

        role_edit_data,
        role_edit_loading,

        role_status_edit_data,
        role_status_edit_loading,

        role_delete_loading

    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            getAllPermissionAction,
            addRoleAction,
            addRoleFresh,
            getAllRoleAction,
            getAllRoleFresh,
            roleUpdateAction,
            roleUpdateFresh,
            roleDeleteAction,
            roleDeleteFresh,
            roleStatusUpdateAction,
            roleStatusUpdateFresh
        })(Roles)
);