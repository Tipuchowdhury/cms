
import Breadcrumbs from 'components/Common/Breadcrumb';
import withRouter from 'components/Common/withRouter';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody, CardTitle, Col, Container, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';
import {
    addPermissionAction, addPermissionFresh, getAllPermissionAction,
    getAllPermissionFresh, permissionUpdateAction, permissionUpdateFresh, permissionDeleteAction, permissionDeleteFresh, permissionStatusUpdateAction, permissionStatusUpdateFresh
} from "store/actions"
import DatatableTablesWorking from 'pages/Tables/DatatableTablesWorking';
import { toast } from 'react-toastify';

function Permissions(props) {

    document.title = "Permissions | Foodi"

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalDel, setModalDel] = useState(false);
    const [modalStatusUpdate, setModalStatusUpdate] = useState(false);


    const toggle = () => setModal(!modal);
    const toggleEditModal = () => setEditModal(!editModal);
    const toggleDel = () => setModalDel(!modalDel);
    const toggleStatus = () => setModalStatusUpdate(!modalStatusUpdate);


    const [addInfo, setAddInfo] = useState({
        module_name: "",
        is_create: false,
        is_read: false,
        is_update: false,
        is_delete: false,
        is_active: true
    });


    const [editInfo, setEditInfo] = useState({
        _id: "",
        module_name: "",
        is_create: false,
        is_read: false,
        is_update: false,
        is_delete: false,
        is_active: true
    });

    const [deleteItem, setDeleteItem] = useState();

    // const [statusItem, setStatusItem] = useState({
    //     permissionId: "",
    //     is_active: "",
    // });

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

    const routeTemplate = { route: "" }
    // const [route, setRoute] = useState(location.state ? location.state.preset_add_ons : [routeTemplate]);
    const [route, setRoute] = useState([routeTemplate]);
    const handleRoute = (e, index) => {
        // console.log(index);
        const updatedValue = route.map((row, i) => index === i ? Object.assign(row, { [e.target.name]: e.target.value }) : row);
        setRoute(updatedValue)

    }
    function handleAddRowNested() {
        setRoute([...route, routeTemplate]);
    }

    const handleRowDelete = (index) => {
        const filteredTime = [...route];
        if (filteredTime.length > 1) {
            filteredTime.splice(index, 1);
            setRoute(filteredTime)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const val = uuidv4();

        props.addPermissionAction(addInfo, route);
    }

    const handleEditPermission = (row) => {
        // console.log(row);

        setEditInfo(prevState => ({
            _id: row._id,
            module_name: row.module_name,
            is_create: row.is_create,
            is_read: row.is_read,
            is_update: row.is_update,
            is_delete: row.is_delete,
            is_active: row.is_active,
        }));

        toggleEditModal();

    }

    const handleEdit = (e) => {
        e.preventDefault();
        props.permissionUpdateAction(editInfo);

        //toggleEditModal();

    }

    const handleDeleteModal = (row) => {
        setDeleteItem(row._id);
        toggleDel();
    }
    const handleDelete = () => {

        // console.log(deleteItem)
        props.permissionDeleteAction(deleteItem);
        // toggleDel();
    }

    const handleStatusModal = (row) => {
        setEditInfo(row);

        toggleStatus();
    }

    const handleStatusUpdate = () => {

        // console.log(statusItem);
        props.permissionStatusUpdateAction({
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
                onClick={() => handleEditPermission(row)}
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
            dataField: "module_name",
            text: "Permissions",
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
            //console.log("I am in get all permis type loading ")
            props.getAllPermissionAction();
        }


        if (props.add_permission_loading === "Success") {
            toast.success("Permission Added Successfully");
            toggle();
            setAddInfo({
                ...addInfo,
                module_name: "",
                is_create: false,
                is_read: false,
                is_update: false,
                is_delete: false,
                is_active: true
            });
            props.addPermissionFresh();
        }


        if (props.add_permission_loading === "Failed") {
            //console.log(props.add_permission_data);
            toast.error("Something went wrong");
            props.addPermissionFresh();

        }

        if (props.permission_edit_loading === "Success") {
            toast.success("Permission Updated");
            toggleEditModal();
            props.permissionUpdateFresh();

        }

        if (props.permission_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.permissionUpdateFresh();

        }

        if (props.permission_status_edit_loading === "Success") {
            toast.success("Permission Status Updated");
            toggleStatus();
            props.permissionStatusUpdateFresh();

        }

        if (props.permission_status_edit_loading === "Failed") {
            toast.error("Something went wrong");
            // toggleEditModal();
            props.permissionStatusUpdateFresh();

        }

        if (props.permission_delete_loading === "Success") {
            // console.log("I am in the delete")
            toast.success("Permission Deleted");
            toggleDel();
            props.permissionDeleteFresh();

        }


    }, [props.add_permission_loading, props.permission_edit_loading,
    props.permission_delete_loading, props.permission_status_edit_loading]);

    // console.log(props.get_all_permission_data);
    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs maintitle='Foodi' title='Roles & Permissions' breadcrumbItem='Permissions' />
                    <Row>
                        <Col className='col-12'>
                            <Card>
                                <CardBody>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px", marginTop: "20px", backgroundColor: "#1E417D", padding: "15px" }}>
                                        <CardTitle className="h4" style={{ color: "#FFFFFF" }}>Permissions </CardTitle>
                                        <Button style={{ backgroundColor: "#DCA218", color: "#FFFFFF" }} onClick={toggle} >
                                            Add Permission
                                        </Button>
                                    </div>

                                    {props.get_all_permission_data ? props.get_all_permission_data.length > 0 ? <DatatableTablesWorking products={props.get_all_permission_data}
                                        columnData={activeData} defaultSorted={defaultSorted} /> : null : null}

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                {/* ============ create modal start=============== */}


                <Modal isOpen={modal} toggle={toggle} centered>
                    <ModalHeader toggle={toggle}>New Permission</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="module_name">Permission Name</label>
                                <input type="text" className="form-control" id="module_name" placeholder="Enter permission name" required name="module_name" onChange={handleAddInputs} value={addInfo.module_name} />
                            </div>


                            <div className="mb-3 row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_create">Create</label>
                                        <input type="checkbox" className="form-check-input" id="is_create" checked={addInfo.is_create} name="is_create" onChange={handleAddCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_read">Read</label>
                                        <input type="checkbox" className="form-check-input" id="is_read" checked={addInfo.is_read} name="is_read" onChange={handleAddCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_update">Edit</label>
                                        <input type="checkbox" className="form-check-input" id="is_update" checked={addInfo.is_update} name="is_update" onChange={handleAddCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_delete">Delete</label>
                                        <input type="checkbox" className="form-check-input" id="is_delete" checked={addInfo.is_delete} name="is_delete" onChange={handleAddCheckBox} />

                                    </div>
                                </div>
                            </div>

                            {route.map((row, idx) => (
                                <React.Fragment key={idx}>
                                    <div data-repeater-list="group-a" id={"addr" + idx}>
                                        <div data-repeater-item className="row">

                                            <div className="mb-3 col-lg-10">
                                                <label className="form-label" htmlFor="route">Route</label>
                                                <input type="text" id="route" className="form-control" name="route" placeholder="Route" value={row.route} onChange={(e) => handleRoute(e, idx)} />
                                            </div>


                                            <Col lg={2} className="align-self-center d-grid mt-3">
                                                <input data-repeater-delete type="button" className="btn btn-primary" value="Delete" onClick={() => (handleRowDelete(idx))} />
                                            </Col>
                                        </div>

                                    </div>
                                </React.Fragment>
                            ))}
                            <Button
                                onClick={() => {
                                    handleAddRowNested();
                                }}
                                color="success"
                                className="btn btn-success mt-3 mt-lg-0"
                            >
                                Add
                            </Button>


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
                    <ModalHeader >Edit Permission</ModalHeader>
                    <ModalBody>
                        <form className="mt-1" onSubmit={handleEdit} >

                            <div className="mb-3">
                                <label className="form-label" htmlFor="module_name">Permission Name</label>
                                <input type="text" className="form-control" id="module_name" placeholder="Enter permission name" required name="module_name" onChange={handleEditInputs} value={editInfo.module_name} />
                            </div>


                            <div className="mb-3 row">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_create">Create</label>
                                        <input type="checkbox" className="form-check-input" id="is_create" checked={editInfo.is_create} name="is_create" onChange={handleEditCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_read">Read</label>
                                        <input type="checkbox" className="form-check-input" id="is_read" checked={editInfo.is_read} name="is_read" onChange={handleEditCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_update">Edit</label>
                                        <input type="checkbox" className="form-check-input" id="is_update" checked={editInfo.is_update} name="is_update" onChange={handleEditCheckBox} />

                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-check">
                                        <label className="form-check-label" htmlFor="is_delete">Delete</label>
                                        <input type="checkbox" className="form-check-input" id="is_delete" checked={editInfo.is_delete} name="is_delete" onChange={handleEditCheckBox} />

                                    </div>
                                </div>
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
        add_permission_data,
        add_permission_error,
        add_permission_loading,

        get_all_permission_data,
        get_all_permission_error,
        get_all_permission_loading,

        permission_edit_data,
        permission_edit_loading,

        permission_status_edit_data,
        permission_status_edit_loading,

        permission_delete_loading

    } = state.Permissions;

    return {
        add_permission_data,
        add_permission_error,
        add_permission_loading,

        get_all_permission_data,
        get_all_permission_error,
        get_all_permission_loading,

        permission_edit_data,
        permission_edit_loading,

        permission_status_edit_data,
        permission_status_edit_loading,

        permission_delete_loading

    };
};

export default withRouter(
    connect(mapStateToProps,
        {
            addPermissionAction,
            addPermissionFresh,
            getAllPermissionAction,
            getAllPermissionFresh,
            permissionUpdateAction,
            permissionUpdateFresh,
            permissionDeleteAction,
            permissionDeleteFresh,
            permissionStatusUpdateAction,
            permissionStatusUpdateFresh
        })(Permissions)
);